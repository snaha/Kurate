<script lang="ts">
</script>

<div class="grid">
	<slot />
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 100%;
		grid-auto-rows: auto;
		grid-auto-columns: auto;
		align-items: end;
		margin-inline: auto;

		@media (min-width: 688px) {
			grid-template-columns: repeat(2, 1fr);
			transition: padding 0.2s;
			padding: 0 var(--spacing-24) var(--spacing-24);
			max-width: 996px;
		}

		@media (min-width: 1242px) {
			grid-template-columns: repeat(3, 1fr);
			max-width: 1494px;
		}

		@media (min-width: 1640px) {
			grid-template-columns: repeat(4, 1fr);
			max-width: 1992px;
		}

		@media (min-width: 2038px) {
			grid-template-columns: repeat(5, 1fr);
			max-width: 2490px;
		}
	}
</style>
