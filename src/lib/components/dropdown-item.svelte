<script lang="ts">
	import Checkmark from '$lib/components/icons/checkmark.svelte'

	export let disabled = false
	export let danger = false
	export let active = false
	export let onClick: () => unknown
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class={`${$$props.class} ${disabled ? 'disabled' : ''} ${danger ? 'danger' : ''}`}
	on:click={() => !disabled && onClick()}
>
	<slot />
	{#if active}
		<span class="selected">
			<Checkmark size={16} />
		</span>
	{/if}
</li>

<style lang="scss">
	li {
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-24);
		cursor: pointer;
		padding: var(--spacing-12);
		font-size: var(--font-size-lg);
		font-family: var(--font-serif);
		list-style: none;

		&.danger {
			color: var(--color-red);
		}

		&:hover {
			background-color: var(--grey-150);
		}

		&.disabled {
			cursor: not-allowed;
			color: var(--grey-200);
		}

		&:not(:last-child) {
			border-bottom: 1px solid var(--grey-200);

			// @media (prefers-color-scheme: dark) {
			// 	background-color: var(--grey-500);
			// }
		}

		.selected {
			display: flex;
			align-items: center;
		}
	}
</style>
