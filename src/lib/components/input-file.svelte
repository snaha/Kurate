<script lang="ts">
	import type { ComponentConstructor, IconProps } from '$lib/types'

	let cls: string | undefined = undefined
	export { cls as class }
	export let files: FileList | undefined = undefined
	export let disabled: boolean | undefined = undefined
	export let label: string | undefined = undefined
	export let icon: ComponentConstructor<IconProps> | undefined = undefined
	export let variant: 'secondary' | 'primary' | 'overlay' = 'secondary'
	export let multiple = false
</script>

<label class={`root ${variant} ${cls}`}>
	{#if icon !== undefined}
		<div class="wrapper">
			<svelte:component this={icon} />
		</div>
	{/if}
	{#if label !== undefined}
		{label}
	{/if}
	<!-- svelte-ignore a11y-missing-attribute -->
	<input type="file" {disabled} bind:files hidden {multiple} />
</label>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-6);
		transition:
			border-color 0.2s,
			background-color 0.2s,
			color 0.2s;
		cursor: pointer;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-radius: 50px;
		padding-right: var(--spacing-12);
		padding-left: var(--spacing-12);
		height: 44px;
		font-weight: 600;
		font-size: var(--font-size-normal);
		font-family: var(--font-body);

		&:disabled {
			cursor: not-allowed;
		}
	}
	.icon-only {
		width: 44px;

		.wrapper {
			margin-right: 0px;
		}
	}
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
	.primary {
		border-color: var(--color-body-text);
		background-color: var(--color-body-text);
		color: var(--color-body-bg);

		& :global(svg) {
			fill: var(--color-body-bg);
		}

		&:disabled {
			border-color: var(--grey-200);
			background-color: var(--grey-200);
			color: var(--color-body-bg);
		}

		&:active:not(:disabled),
		&:hover:not(:disabled) {
			transition:
				border-color 0.2s,
				background-color 0.2s;
			border-color: var(--color-black);
			background-color: var(--color-black);
		}

		// @media (prefers-color-scheme: dark) {
		// 	&:disabled {
		// 		background-color: var(--grey-200);
		// 		color: var(--color-body-bg);

		// 		& :global(svg) {
		// 			fill: var(--color-body-bg);
		// 		}
		// 	}

		// 	&:active:not(:disabled),
		// 	&:hover:not(:disabled) {
		// 		transition: border-color 0.2s, background-color 0.2s;
		// 	}
		// }
	}
	.secondary {
		border-color: var(--grey-200);
		background-color: var(--color-body-bg);
		color: var(--color-body-text);

		& :global(svg) {
			fill: var(--color-body-text);
		}

		&:disabled {
			color: var(--grey-200);

			& :global(svg) {
				fill: var(--grey-200);
			}
		}

		&:active:not(:disabled),
		&:hover:not(:disabled) {
			transition:
				border-color 0.2s,
				background-color 0.2s;
			background-color: var(--grey-150);
		}

		// @media (prefers-color-scheme: dark) {
		// 	background-color: var(--color-body-bg);
		// 	border-color: var(--color-body-text);
		// 	color: var(--color-body-text);

		// 	& :global(svg) {
		// 		fill: var(--color-body-text);
		// 	}

		// 	&:disabled {
		// 		background-color: var(--color-body-bg);
		// 		color: var(--grey-500);

		// 		& :global(svg) {
		// 			fill: var(--grey-500);
		// 		}
		// 	}

		// 	&:active:not(:disabled),
		// 	&:hover:not(:disabled) {
		// 		transition: border-color 0.2s, background-color 0.2s;
		// 	}
		// }
	}
	.overlay {
		backdrop-filter: blur(var(--blur));
		border-color: transparent;
		background-color: rgba(var(--color-black-rgb), 0.5);
		color: var(--color-body-bg);

		& :global(svg) {
			fill: var(--color-body-bg);
		}
		&:disabled {
			color: var(--grey-300);

			& :global(svg) {
				fill: var(--grey-300);
			}
		}

		&:active:not(:disabled),
		&:hover:not(:disabled) {
			transition: background-color 0.2s;
			background-color: var(--color-black);
		}
	}
</style>
