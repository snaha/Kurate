<script lang="ts">
	import Header from '$lib/components/header.svelte'

	let cls: string | undefined = undefined
	let y: number
	export { cls as class }
	export let title: string | undefined = undefined
	export let fullPage: boolean | undefined = undefined
	export let onBack: (() => unknown) | undefined = undefined
	export let onClose: (() => unknown) | undefined = undefined
</script>

<svelte:window bind:scrollY={y} />

{#if title}
	<Header {title} {onBack} {onClose} />
{/if}

<div class={`loading-screen ${y > 0 ? 'scrolled' : ''} ${fullPage ? 'full-page' : ''} ${cls}`}>
	<div class="loading">
		<div class="circle" />
		<div class="circle" />
		<div class="circle" />
	</div>
	<div class="title">
		<slot name="title" />
	</div>
	<div class="description">
		<slot name="description" />
	</div>
	<div class="btns">
		<slot name="buttons" />
	</div>
</div>

<style lang="scss">
	.loading-screen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		gap: var(--spacing-6);
		margin-inline: auto;
		padding: var(--spacing-24);
		max-width: 498px;
		text-align: center;

		&.full-page {
			min-height: calc(100dvh - 92px);
			min-height: calc(100vh - 92px);

			@media (min-width: 688px) {
				min-height: calc(100vh - 140px);
			}
			&.scrolled {
				min-height: calc(100vh - 68px);
			}
		}

		.loading {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: var(--spacing-6);
			margin-bottom: var(--spacing-12);
			height: 32px;

			@keyframes loading-circle {
				0% {
					background-color: var(--color-body-text);
					width: var(--spacing-6);
					height: var(--spacing-6);
				}
				50% {
					background-color: transparent;
					width: var(--spacing-3);
					height: var(--spacing-3);
				}
				100% {
					background-color: var(--color-body-text);
					width: var(--spacing-6);
					height: var(--spacing-6);
				}
			}

			.circle {
				position: relative;
				width: var(--spacing-6);

				&::before {
					position: absolute;
					transform: translate(-50%, -50%);
					animation-duration: 2.1s;
					animation-iteration-count: infinite;
					animation-name: loading-circle;
					inset: 50%;
					border-radius: 50%;
					content: '';
				}

				&:nth-child(2)::before {
					animation-delay: 0.7s;
				}

				&:nth-child(3)::before {
					animation-delay: 1.4s;
				}
			}
		}

		.title {
			font-weight: var(--font-weight-sb);
			font-size: var(--font-size-lg);
		}

		.btns {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: var(--spacing-12);
			margin-top: var(--spacing-48);
		}

		:global(.small) {
			font-size: var(--font-size-sm);
		}
	}
</style>
