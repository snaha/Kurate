import { ethers, providers, Signer } from 'ethers'

import { browser } from '$app/environment'
import { PROVIDER } from '../constants'

type WindowWithEthereum = Window &
	typeof globalThis & { ethereum: providers.ExternalProvider | providers.JsonRpcFetchFunc }

export async function connectWallet(network?: providers.Networkish): Promise<Signer> {
	const provider = new providers.Web3Provider((window as WindowWithEthereum).ethereum, network)
	await provider.send('eth_requestAccounts', [])
	return provider.getSigner()
}

export function canConnectWallet() {
	return browser && Boolean((window as WindowWithEthereum)?.ethereum)
}

export function getProvider() {
	return new ethers.providers.JsonRpcProvider(PROVIDER)
}
