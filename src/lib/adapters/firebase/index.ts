import { connectWallet } from '$lib/services'
import { chats, type Chat, type Message, type DraftChat } from '$lib/stores/chat'
import { personas, type DraftPersona, type Persona } from '$lib/stores/persona'
import { profile } from '$lib/stores/profile'
import type { Signer } from 'ethers'
import { create } from 'ipfs-http-client'
import {
	CREATE_PERSONA_GO_PRICE,
	NEW_POST_GO_PRICE,
	NEW_POST_REP_PRICE,
	VOTE_GO_PRICE,
} from '$lib/constants'
import { tokens } from '$lib/stores/tokens'
import { posts, type Post, type PostPending } from '$lib/stores/post'
import { transaction, type TransactionRecord } from '$lib/stores/transaction'
import type { Adapter } from '..'
import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	doc,
	setDoc,
	collection,
	addDoc,
	onSnapshot,
	query,
	updateDoc,
	arrayUnion,
	where,
	arrayRemove,
} from 'firebase/firestore'
import { get } from 'svelte/store'
import { subscribeAccountChanged, subscribeChainChanged } from '../utils'
import {
	chatFromDB,
	chatToDB,
	personaFromDB,
	personaToDB,
	postFromDB,
	postPendingFromDB,
} from './db-adapter'
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_IPFS_AUTH,
	PUBLIC_IPFS_GATEWAY,
	PUBLIC_IPFS_HOST,
} from '$env/static/public'

const IPFS_AUTH = PUBLIC_IPFS_AUTH
const IPFS_GATEWAY = PUBLIC_IPFS_GATEWAY
const IPFS_HOST = PUBLIC_IPFS_HOST

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

function epochCounter(): () => unknown {
	const interval = setInterval(() => {
		tokens.update(({ epochDuration, ...rest }) => {
			const newTimeToEpoch = epochDuration - (Date.now() % epochDuration)

			return { ...rest, epochDuration, timeToEpoch: newTimeToEpoch }
		})
	}, 1000)

	return () => {
		clearInterval(interval)
	}
}

export class Firebase implements Adapter {
	private ipfs = create({
		host: IPFS_HOST,
		port: 5001,
		protocol: 'https',
		headers: {
			authorization: IPFS_AUTH,
		},
	})
	private subscriptions: Array<() => unknown> = []
	private userSubscriptions: Array<() => unknown> = []
	private votes = new Map<string, { promote: string[]; demote: string[] }>()
	private participants = new Map<string, string[]>()
	private postIdParticipant = new Map<string, string>()

	async start() {
		const personasQuery = query(collection(db, 'personas'))
		const unsubscribePersonas = onSnapshot(personasQuery, (data) => {
			personas.update((state) => {
				const all = new Map<string, Persona>()
				data.docs.forEach((e) => {
					const dbPersona = e.data() as DBPersona
					const persona = personaFromDB(dbPersona, e.id)
					this.participants.set(e.id, dbPersona.participants)
					all.set(e.id, persona)
				})

				return { ...state, all, loading: false }
			})
		})
		this.subscriptions.push(unsubscribePersonas)

		const unsubscribeUser = profile.subscribe(async (p) => {
			if (p.signer && this.userSubscriptions.length === 0) {
				const userSnapshot = doc(db, `users/${p.address}`)
				const subscribeTokens = onSnapshot(userSnapshot, (res) => {
					type UserRes = {
						go: number
						repStaked: number
						repTotal: number
						favorite?: string[]
						draft?: DraftPersona[]
					}
					const { go, repStaked, repTotal, favorite, draft } = res.data() as UserRes
					tokens.update((state) => ({
						...state,
						go: go ?? 5000, // FIXME: this should be DEFAULT_GO_AMOUNT
						repStaked: repStaked ?? 0,
						repTotal: repTotal ?? 5000, // FIXME: this should be 0
					}))
					personas.update((state) => ({ ...state, favorite: favorite ?? [], draft: draft ?? [] }))
				})
				this.userSubscriptions.push(subscribeTokens)
				const transactionSnapshot = collection(db, `users/${p.address}/transactions`)
				const subscribeTransactions = onSnapshot(transactionSnapshot, (res) => {
					const trns: TransactionRecord[] = []
					res.docs.forEach((d) => {
						const transactionsDb = d.data() as DBTransaction
						trns.push(transactionsDb)
					})
					transaction.set({ transactions: trns })
				})
				this.userSubscriptions.push(subscribeTransactions)

				const chatsSnapshot = query(
					collection(db, `chats`),
					where('users', 'array-contains', p.address),
				)
				const subscribeChats = onSnapshot(chatsSnapshot, (res) => {
					const newChats = new Map<string, Chat>()
					const personasTemp = get(personas)
					res.docs.forEach((d) => {
						const data = d.data() as DBChat
						const persona = personasTemp.all.get(data.personaId)
						if (!persona) return
						const chat = chatFromDB(data, persona, d.id)
						newChats.set(d.id, chat)
					})
					chats.update((state) => ({ ...state, chats: newChats, loading: false }))
				})
				this.userSubscriptions.push(subscribeChats)
			}
			if (!p.signer && this.userSubscriptions.length !== 0) {
				this.userSubscriptions.forEach((s) => s())
				this.userSubscriptions = []
			}
		})
		this.subscriptions.push(unsubscribeUser)
		this.subscriptions.push(epochCounter())
		this.subscriptions.push(subscribeAccountChanged())
		this.subscriptions.push(subscribeChainChanged())
	}
	stop() {
		this.subscriptions.forEach((s) => s())
		this.userSubscriptions.forEach((s) => s())
	}
	async addPersonaToFavorite(groupId: string): Promise<void> {
		const { address } = get(profile)
		if (!address) return
		const userDoc = doc(db, `users/${address}`)
		await updateDoc(userDoc, { favorite: arrayUnion(groupId) })
	}
	async removePersonaFromFavorite(groupId: string): Promise<void> {
		const { address } = get(profile)
		if (!address) return
		const userDoc = doc(db, `users/${address}`)
		await updateDoc(userDoc, { favorite: arrayRemove(groupId) })
	}
	addPersonaDraft(draftPersona: DraftPersona): Promise<number> {
		return new Promise((resolve) =>
			personas.update(({ draft, ...state }) => {
				const newDraft = [...draft, draftPersona]
				const { address } = get(profile)

				if (address) {
					const userDoc = doc(db, `users/${address}`)
					updateDoc(userDoc, { draft: newDraft })
				}

				resolve(newDraft.length - 1)

				return { ...state, draft: newDraft }
			}),
		)
	}
	updatePersonaDraft(index: number, draftPersona: DraftPersona): Promise<void> {
		return new Promise((resolve) =>
			personas.update(({ draft, ...state }) => {
				draft[index] = draftPersona
				const { address } = get(profile)

				if (address) {
					const userDoc = doc(db, `users/${address}`)
					updateDoc(userDoc, { draft: draft })
				}

				resolve()

				return { ...state, draft }
			}),
		)
	}

	deleteDraftPersona(index: number): Promise<void> {
		return new Promise((resolve) =>
			personas.update(({ draft, ...state }) => {
				const newDraft = draft.filter((_, i) => i !== index)
				const { address } = get(profile)

				if (address) {
					const userDoc = doc(db, `users/${address}`)
					updateDoc(userDoc, { draft: newDraft })
				}

				resolve()

				return { ...state, draft: newDraft }
			}),
		)
	}

	async publishPersona(draftPersona: DraftPersona, signer: Signer): Promise<string> {
		await signer.signMessage('This "transaction" publishes persona')
		const address = await signer.getAddress()
		const personasCollection = collection(db, 'personas')
		const { posts } = draftPersona
		const personaDoc = await addDoc(personasCollection, personaToDB(draftPersona, [address]))

		const postCollection = collection(db, `personas/${personaDoc.id}/posts`)
		posts.forEach((p) => {
			const dbPost: DBPost = {
				...p,
				address,
			}
			addDoc(postCollection, dbPost)
		})

		const profileCollection = collection(db, `users/${address}/transactions`)
		const transaction: DBTransaction = {
			timestamp: Date.now(),
			goChange: -CREATE_PERSONA_GO_PRICE,
			repChange: 0,
			personaId: personaDoc.id,
			type: 'publish persona',
		}
		await addDoc(profileCollection, transaction)

		const { go, repTotal, repStaked } = get(tokens)
		const user = doc(db, `users/${address}`)
		setDoc(
			user,
			{ address, go: go - CREATE_PERSONA_GO_PRICE, repTotal, repStaked },
			{ merge: true },
		)

		personas.update(({ draft, ...state }) => {
			const newDraft = draft.filter((d) => d !== draftPersona)
			const userDoc = doc(db, `users/${address}`)
			updateDoc(userDoc, { draft: newDraft })

			return { ...state, draft: newDraft }
		})

		return personaDoc.id
	}

	async signIn(): Promise<void> {
		const signer = await connectWallet()
		const address = await signer.getAddress()
		const userDoc = doc(db, `users/${address}`)

		setDoc(userDoc, { address, lastSignIn: Date.now() }, { merge: true })
		profile.update((state) => ({ ...state, signer, address }))
	}

	async uploadPicture(picture: string): Promise<string> {
		const blob = await (await fetch(picture)).blob()
		const res = await this.ipfs.add(blob)

		return res.cid.toString()
	}

	getPicture(cid: string): string {
		return `${IPFS_GATEWAY}/${cid}`
	}

	async publishPost(
		groupId: string,
		text: string,
		images: string[],
		signer: Signer,
	): Promise<string> {
		const address = await signer.getAddress()
		const isMemberOfGroup = this.participants.get(groupId)?.includes(address)

		const post: DBPostPending = {
			timestamp: Date.now(),
			text,
			images,
			promote: [],
			demote: [],
			address,
		}

		if (!isMemberOfGroup) {
			await signer.signMessage('This "transaction" joins the persona')
			const personaDoc = doc(db, `personas/${groupId}`)
			updateDoc(personaDoc, { participants: arrayUnion(address) })
		}

		await signer.signMessage('This "transaction" publishes a post to pending')

		// Store post to pending
		const pendingPosts = collection(db, `personas/${groupId}/pending`)
		const postDoc = await addDoc(pendingPosts, post)

		const profileCollection = collection(db, `users/${address}/transactions`)

		const transaction: DBTransaction = {
			timestamp: Date.now(),
			goChange: -NEW_POST_GO_PRICE,
			repChange: -NEW_POST_REP_PRICE,
			personaId: groupId,
			type: 'publish post',
		}
		await addDoc(profileCollection, transaction)

		const { go, repTotal, repStaked } = get(tokens)
		const user = doc(db, `users/${address}`)
		setDoc(
			user,
			{ address, go: go - NEW_POST_GO_PRICE, repTotal, repStaked: repStaked + NEW_POST_REP_PRICE },
			{ merge: true },
		)

		return postDoc.id
	}

	async subscribePersonaPosts(groupId: string): Promise<() => unknown> {
		// Sets loading to true if the data is not yet retrieved
		posts.update(({ data }) => {
			const personaPostData = data.get(groupId)
			if (!personaPostData) {
				data.set(groupId, { approved: [], pending: [], loading: true, error: undefined })
			}

			return { data }
		})

		const pendingCollection = collection(db, `personas/${groupId}/pending`)
		const postsCollection = collection(db, `personas/${groupId}/posts`)

		const subscribePending = onSnapshot(pendingCollection, (res) => {
			const newPending: PostPending[] = []

			res.docs.forEach((d) => {
				const postDb = d.data() as DBPostPending
				const { address } = get(profile)
				this.votes.set(d.id, { promote: postDb.promote, demote: postDb.demote })
				this.postIdParticipant.set(d.id, postDb.address)
				newPending.push(postPendingFromDB(postDb, d.id, address))
			})

			posts.update(({ data }) => {
				const personaPostData = data.get(groupId)
				const pending = newPending
				const approved = personaPostData?.approved ?? []
				data.set(groupId, { loading: false, approved, pending })

				return { data }
			})
		})

		// Ensures that votuse and whether the post is yours is updated after user logs in
		const subscribeProfileChangePending = profile.subscribe(({ address }) => {
			if (address) {
				posts.update(({ data }) => {
					const personaPostData = data.get(groupId)
					if (!personaPostData) return { data }

					const pending = personaPostData.pending.map((p) => {
						if (p.postId === undefined) return p
						const vt = this.votes.get(p.postId)
						if (vt === undefined) return p
						let yourVote: '+' | '-' | undefined = undefined
						if (vt.promote.includes(address)) yourVote = '+'
						if (vt.demote.includes(address)) yourVote = '-'

						const postSender = this.postIdParticipant.get(p.postId)

						return { ...p, myPost: postSender === address, yourVote }
					})
					data.set(groupId, { ...personaPostData, pending })

					return { data }
				})
			}
		})

		const subscribePosts = onSnapshot(postsCollection, (res) => {
			const newPostst: Post[] = []

			res.docs.forEach((d) => {
				const postDb = d.data() as DBPost
				const { address } = get(profile)
				this.postIdParticipant.set(d.id, postDb.address)
				newPostst.push(postFromDB(postDb, d.id, address))
			})

			posts.update(({ data }) => {
				const personaPostData = data.get(groupId)
				const pending = personaPostData?.pending ?? []
				const approved = newPostst
				data.set(groupId, { loading: false, approved, pending })

				return { data }
			})
		})

		return () => {
			subscribeProfileChangePending()
			subscribePending()
			subscribePosts()
		}
	}

	async voteOnPost(groupId: string, postId: string, vote: '+' | '-', signer: Signer) {
		const promoteDemote: 'promote' | 'demote' = vote === '+' ? 'promote' : 'demote'
		await signer.signMessage(
			`By confirming this "transaction" you are casting ${promoteDemote} vote on the post`,
		)
		const address = await signer.getAddress()

		const postData = get(posts)
			.data.get(groupId)
			?.pending.find((p) => p.postId === postId)
		if (!postData) return

		const postDoc = doc(db, `personas/${groupId}/pending/${postData.postId}`)
		updateDoc(postDoc, {
			[promoteDemote]: arrayUnion(address),
		})

		const { go } = get(tokens)
		const user = doc(db, `users/${address}`)
		setDoc(user, { address, go: go - VOTE_GO_PRICE }, { merge: true })

		const profileCollection = collection(db, `users/${address}/transactions`)

		const transaction: DBTransaction = {
			timestamp: Date.now(),
			goChange: -VOTE_GO_PRICE,
			repChange: 0,
			type: promoteDemote,
			personaId: groupId,
		}

		await addDoc(profileCollection, transaction)
	}

	async startChat(chat: DraftChat): Promise<string> {
		const { address } = get(profile)
		const postSender = this.postIdParticipant.get(chat.post.postId)

		if (!address) throw new Error('You need to be logged in to start a chat')
		if (!postSender) throw new Error('Info about original poster is missing')
		if (!chat.post.postId) throw new Error('PostId is missing')
		if (!chat.persona.personaId) throw new Error('PersonaId is missing')

		const dbChat = chatToDB(chat, address, postSender)

		const chatCollection = collection(db, `/chats`)
		const chatDoc = await addDoc(chatCollection, dbChat)

		return chatDoc.id
	}

	async sendChatMessage(chatId: string, text: string): Promise<void> {
		const address = get(profile).address

		if (!address) throw new Error('ChatId or address is missing')

		const message: Message = {
			timestamp: Date.now(),
			text,
			address,
		}

		const chatDoc = doc(db, `chats/${chatId}`)
		updateDoc(chatDoc, { messages: arrayUnion(message), lastMessage: text })
	}
}
