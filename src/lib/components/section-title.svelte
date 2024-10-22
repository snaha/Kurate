<script lang="ts">
	export let title: string
	import Divider from '$lib/components/divider.svelte'
	export let noDivider: boolean | undefined = undefined
	export let noPad: boolean | undefined = undefined
</script>

<div class="root">
	{#if !noDivider}
		<Divider visible="desktop" />
	{/if}
	<div class={`wrapper ${noPad ? '' : 'pad'}`}>
		<div class="row">
			<div class="title">{title}</div>
			<div class="buttons">
				<slot name="buttons" />
			</div>
		</div>

		<slot />
	</div>
	<Divider visible="mobile" />
</div>

<style lang="scss">
	.wrapper {
		transition: padding 0.2s;
		margin-inline: auto;
		padding-block: var(--spacing-24);
		max-width: 498px;

		&.pad {
			padding-inline: var(--spacing-24);
		}

		@media (min-width: 688px) {
			padding-bottom: var(--spacing-12);
			max-width: 996px;

			&.pad {
				padding-inline: var(--spacing-48);
			}
		}

		@media (min-width: 1242px) {
			max-width: 1494px;
		}

		@media (min-width: 1640px) {
			max-width: 1992px;
		}

		@media (min-width: 2038px) {
			max-width: 2490px;
		}

		.row {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			gap: var(--spacing-12);
			margin-bottom: var(--spacing-12);

			.title {
				transition: padding 0.2s;
				border-bottom: none;
				max-width: 498px;
				font-weight: var(--font-weight-sb);
				font-size: var(--font-size-lg);
			}

			@media (min-width: 688px) {
				margin-bottom: var(--spacing-24);
			}

			.buttons {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				gap: var(--spacing-12);
			}
		}
	}
</style>
