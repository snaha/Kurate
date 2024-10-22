<script>
	export let progress = 0
</script>

<div class="container" style="width: 100%">
	<div class="bar-bg">
		<div class="bar-progress" style="width: {progress * 100}%" />
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 12px;
	}

	.bar-bg {
		flex-grow: 1;
		border-radius: 6px;
		background-color: #ececec;
		height: 100%;
	}

	.bar-progress {
		transition: width 0.5s ease;
		border-radius: 6px;
		background-color: #181818;
		height: 100%;
	}
</style>
