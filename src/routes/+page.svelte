<script lang="ts">
	import { Button, List, AddCount } from '$lib/components';
	import store from '$lib/counter.store';
</script>

<main class="container max-w-[480px]">
	<div class="p-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
		<h1 class="sr-only">Counter App</h1>
		<div class="flex justify-end">
			{#if $store.length > 0}
				<Button variant="ghost">Edit</Button>
			{/if}
		</div>
		<List />
		<div class="m-3">
			<AddCount />
		</div>
	</div>
</main>

<style lang="postcss">
</style>
