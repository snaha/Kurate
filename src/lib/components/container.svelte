<script lang="ts">
	let cls: string | undefined = undefined
	export { cls as class }
</script>

<div class={`container ${cls}`}>
	<slot />
</div>

<style lang="scss">
	.container {
		transition: padding 0.2s;
		margin-inline: auto;
		padding: 0 var(--spacing-24);
		max-width: 498px;

		@media (min-width: 688px) {
			padding: 0 var(--spacing-48);
			max-width: 996px;
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
	}
</style>
