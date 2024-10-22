<script lang="ts">
	import Image from '$lib/components/icons/image.svelte'
	import Renew from '$lib/components/icons/renew.svelte'
	import Undo from '$lib/components/icons/undo.svelte'
	import UserMultiple from './icons/user-multiple.svelte'
	import Forum from './icons/forum.svelte'
	import Profile from '$lib/components/profile-default.svelte'
	import Button from '$lib/components/button.svelte'
	import InputFile from '$lib/components/input-file.svelte'
	import Container from '$lib/components/container.svelte'

	import { clipAndResize } from '$lib/utils/image'
	import { MAX_DIMENSIONS } from '$lib/constants'
	import adapter from '$lib/adapters'
	import type { ReputationOptions } from '$lib/types'

	export let name: string
	export let pitch: string
	export let description: string
	export let onBack: () => unknown = () => history.back()
	export let picture: string | undefined
	export let cover: string | undefined
	export let canEditPictures = false
	export let postsCount: number
	export let participantsCount: number
	export let minReputation: ReputationOptions

	let coverFiles: FileList | undefined = undefined
	let pictureFiles: FileList | undefined = undefined

	async function resizePersonaPicture(p?: File) {
		try {
			picture = p
				? await adapter.uploadPicture(
						await clipAndResize(
							p,
							MAX_DIMENSIONS.PERSONA_PICTURE.width,
							MAX_DIMENSIONS.PERSONA_PICTURE.height,
						),
					)
				: picture
		} catch (error) {
			console.error(error)
		}
	}

	async function resizePersonaCover(c?: File) {
		try {
			cover = c
				? await adapter.uploadPicture(
						await clipAndResize(
							c,
							MAX_DIMENSIONS.PERSONA_COVER.width,
							MAX_DIMENSIONS.PERSONA_COVER.height,
						),
					)
				: cover
		} catch (error) {
			console.error(error)
		}
	}
	$: canEditPictures && resizePersonaPicture(pictureFiles && pictureFiles[0])
	$: canEditPictures && resizePersonaCover(coverFiles && coverFiles[0])
</script>

<div class="top">
	{#if cover}
		<div class="img">
			<img src={adapter.getPicture(cover)} alt="profile" />
		</div>
	{/if}
</div>
<div class="buttons">
	<Button icon={Undo} variant="overlay" on:click={onBack} />
	{#if canEditPictures}
		<InputFile
			icon={cover ? Renew : Image}
			variant="overlay"
			label={cover ? 'Change cover' : 'Add cover'}
			bind:files={coverFiles}
		/>
	{:else}
		<slot name="button_top" />
	{/if}
</div>
<div class="avatar">
	{#if picture}
		<div class="img">
			<img src={adapter.getPicture(picture)} alt="profile" />
			{#if canEditPictures}
				<div class="change">
					<InputFile icon={Renew} variant="overlay" bind:files={pictureFiles} />
				</div>
			{/if}
		</div>
	{:else if canEditPictures}
		<div class="no-img">
			<div class="empty">
				<InputFile icon={Image} variant="overlay" label="Add profile" bind:files={pictureFiles} />
			</div>
			<div class="profile-default">
				<Profile />
			</div>
		</div>
	{/if}
</div>

<Container>
	<div class="persona-info">
		<h1 class="name">{name}</h1>
		<div class="pitch">{pitch}</div>
		<div class="description">{description}</div>
		<div class="post-count">
			<div class="rep">
				REP {minReputation}+
			</div>
			<div>
				<UserMultiple size={18} />
				{participantsCount}
			</div>
			<div>
				<Forum size={18} />
				{postsCount}
			</div>
		</div>
	</div>
</Container>

<div class="buttons-bottom">
	<slot name="button_primary" />
	<slot name="button_other" />
</div>

<slot />

<style lang="scss">
	.top {
		position: absolute;
		z-index: -1;
		background-color: #666666;
		aspect-ratio: 16/9;
		width: 100vw;
		max-height: 342px;
		overflow: hidden;

		@media (min-width: 608px) {
			aspect-ratio: none;
			height: 342px;
		}

		.img {
			display: flex;
			position: absolute;
			justify-content: center;
			align-items: center;
			inset: 0 0 0 0;

			img {
				width: 100%;
				object-fit: cover;
			}
		}
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: padding 0.2s;
		padding: var(--spacing-24);

		@media (min-width: 688px) {
			transition: padding 0.2s;
			padding: var(--spacing-48);
		}
	}

	.avatar {
		position: relative;
		margin-bottom: var(--spacing-12);
		width: 100vw;

		.no-img,
		.img {
			display: flex;
			position: relative;
			justify-content: center;
			align-items: center;
			margin-inline: auto;
			background-color: #c9c9c9;
			aspect-ratio: 1;
			height: calc(calc(100vw / 1.777) - 68px);

			@media (min-width: 608px) {
				height: 274px;
			}

			@media (min-width: 688px) {
				height: 250px;
			}
			img {
				aspect-ratio: 1;
				object-fit: cover;
			}
		}

		.empty,
		.change {
			display: flex;
			position: absolute;
			justify-content: center;
			align-items: center;
			transform: none;
			z-index: 10;
			inset: auto var(--spacing-12) var(--spacing-12) auto;
			width: max-content;
			height: fit-content;
		}

		.profile-default {
			position: relative;
			width: 100%;
			height: 100%;

			:global(svg) {
				fill: var(--grey-300);
				position: absolute;
				inset: auto;
			}
			// :global(svg path) {
			// 	width: 100%;
			// 	height: 100%;
			// }
		}
	}

	.persona-info {
		margin-inline: auto;
		max-width: 738px;
		text-align: center;
		.name,
		.pitch,
		.description {
			margin-bottom: var(--spacing-12);
			margin-inline: auto;
			max-width: 498px;
		}

		.description {
			font-family: var(--font-serif);
		}
	}

	.post-count {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-12);
		font-size: 12px;

		> div {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			gap: var(--spacing-3);
		}

		.rep {
			border-radius: 9px;
			background-color: var(--grey-200);
			padding-top: 1px;
			padding-right: var(--spacing-4);
			padding-left: var(--spacing-6);
			font-weight: var(--font-weight-sb);
			font-size: var(--font-size-sm);
		}
	}

	.buttons-bottom {
		display: flex;
		position: relative;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-12);
		padding: var(--spacing-24);

		@media (min-width: 688px) {
			padding: var(--spacing-48);
		}
	}

	// @media (prefers-color-scheme: dark) {
	// 	.buttons-bottom {
	// 		border-bottom: 1px solid var(--grey-500);
	// 	}
	// }
</style>
