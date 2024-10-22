<script lang="ts">
	import type { ComponentConstructor, IconProps } from '$lib/types'
	export let variant: 'info' | 'danger' = 'info'
	export let icon: ComponentConstructor<IconProps> | undefined = undefined
</script>

<div class={`info-banner ${variant}`}>
	<div class="wrapper">
		<svelte:component this={icon} />
	</div>
	<slot />
</div>

<style lang="scss">
	.info-banner {
		display: flex;
		position: sticky;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-6);
		z-index: 100;
		inset: 0 0 auto;
		padding: var(--spacing-12);
		font-weight: var(--font-weight-sb);
		font-size: 14px;

		.wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
		}

		&.info {
			background-color: rgba(var(--grey-200-rgb), 0.95);
			color: (--color-body-text);
		}

		&.danger {
			background-color: rgba(var(--color-danger-rgb), 0.95);
			color: var(--color-red);

			:global(svg) {
				fill: var(--color-red);
			}
		}
	}
</style>
