<script lang="ts">
	import CaretDown from './icons/caret-down.svelte'

	let cls: string | undefined = undefined
	export { cls as class }
	export let label: string
	export let value: string
	export let disabled: boolean | undefined = undefined
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={`root ${cls} ${disabled ? 'disabled' : ''}`} on:click>
	<div class="label">
		{label}
	</div>
	<div class="value">
		<div>{value}</div>
		<CaretDown />
	</div>
</div>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		cursor: pointer;
		box-sizing: border-box;
		margin: var(--spacing-24) calc(var(--spacing-24) * -1) var(--spacing-12);
		padding: var(--spacing-24);
		color: var(--color-body-text);
		font-weight: 600;
		font-size: var(--font-size-normal);
		font-family: var(--font-body);
		white-space: nowrap;

		.label {
			margin-bottom: var(--spacing-4);
			color: var(--grey-500);
			font-size: var(--font-size-sm);
		}

		.value {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			font-family: var(--font-serif);
		}

		& :global(svg) {
			fill: var(--color-body-text);
		}

		&:disabled {
			cursor: not-allowed;
			color: var(--grey-200);

			& :global(svg) {
				fill: var(--grey-200);
			}
		}

		&:active:not(:disabled),
		&:hover:not(:disabled) {
			transition: background-color 0.2s;
			background-color: var(--grey-150);
		}

		// @media (prefers-color-scheme: dark) {
		// 	background-color: var(--color-body-bg);
		// 	color: var(--color-body-text);

		// 	& :global(svg) {
		// 		fill: var(--color-body-text);
		// 	}

		// 	&:disabled {
		// 		color: var(--grey-500);

		// 		& :global(svg) {
		// 			fill: var(--grey-500);
		// 		}
		// 	}

		// 	&:active:not(:disabled),
		// 	&:hover:not(:disabled) {
		// 		transition: background-color 0.2s;
		// 	}
		// }
	}
</style>
