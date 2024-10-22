<script lang="ts">
	let cls: string | undefined = undefined
	export { cls as class }
</script>

<div class={`info-box ${cls}`}>
	<div class="content">
		<slot />
	</div>
	{#if $$slots.buttons}
		<div class="buttons">
			<slot name="buttons" />
		</div>
	{/if}
</div>

<style lang="scss">
	.info-box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: var(--spacing-48);
		padding-bottom: var(--spacing-24);

		@media (min-width: 688px) {
			padding-bottom: var(--spacing-48);
		}
		.content {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-6);
			text-align: center;

			:global(.icon) {
				margin-bottom: var(--spacing-6);
			}
		}
		.buttons:not(:empty) {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: var(--spacing-12);
		}
	}
</style>
