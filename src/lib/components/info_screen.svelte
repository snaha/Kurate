<script lang="ts">
	import Header from '$lib/components/header.svelte'

	let cls: string | undefined = undefined
	let y: number
	export { cls as class }
	export let title: string
	export let onBack: (() => unknown) | undefined = undefined
	export let onClose: (() => unknown) | undefined = undefined
</script>

<svelte:window bind:scrollY={y} />

<Header {title} {onBack} {onClose} />

<div class={`info-screen ${y > 0 ? 'scrolled' : ''} ${cls}`}>
	<slot />

	<div class="btns">
		<slot name="buttons" />
	</div>
</div>

<style lang="scss">
	.info-screen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		gap: var(--spacing-48);
		margin-inline: auto;
		padding: var(--spacing-24);
		max-width: 498px;
		min-height: calc(100dvh - 92px);
		min-height: calc(100vh - 92px);

		.btns {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: var(--spacing-12);
		}

		:global(.small) {
			font-size: var(--font-size-sm);
		}

		@media (min-width: 688px) {
			min-height: calc(100vh - 140px);
		}
		&.scrolled {
			min-height: calc(100vh - 68px);
		}
	}
</style>
