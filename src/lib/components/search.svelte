<script lang="ts">
	import Search from '$lib/components/icons/search.svelte'
	import Cancel from '$lib/components/icons/close.svelte'

	let isFocused = false

	export let filterQuery = ''
	export let placeholder: string | undefined = 'Search...'
</script>

<div class="search-field">
	<div class="search-icon">
		<Search />
	</div>
	<input
		bind:value={filterQuery}
		{placeholder}
		on:focus={() => {
			isFocused = true
		}}
		on:blur={() => {
			isFocused = false
		}}
	/>
	{#if isFocused}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="cancel-wrapper" on:click|stopPropagation|preventDefault={() => (filterQuery = '')}>
			<Cancel />
		</div>
	{/if}
</div>

<style lang="scss">
	.search-field {
		display: flex;
		position: relative;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: var(--spacing-6);
		transition:
			padding 0.2s,
			width 0.2s;
		margin-inline: -24px;
		padding-inline: var(--spacing-24);
		width: calc(100% + 48px);

		.search-icon {
			flex-shrink: 0;
		}

		input {
			position: relative;
			transition: padding 0.2s;
			outline: none;
			border: none;
			background-color: transparent;
			padding-block: var(--spacing-12);
			width: 100%;
			font-size: 18px;
			font-family: var(--font-serif);

			&:disabled {
				opacity: 0.15;
				cursor: not-allowed;
			}

			&::placeholder {
				color: var(--grey-300);
				font-family: var(--font-serif);
			}

			&:focus,
			&:active {
				transition: padding 0.2s;
				padding-block: var(--spacing-24);
			}
		}

		&:focus-within {
			background-color: var(--grey-150);

			&::after {
				position: absolute;
				inset: 24px 24px auto auto;
				content: url(icons/close.svelte);
			}
		}

		.cancel-wrapper {
			cursor: pointer;
		}
	}
</style>
