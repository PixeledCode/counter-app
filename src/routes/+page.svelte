<script lang="ts">
	import { Button, List, AddCount } from '$lib/components';
	import store from '$lib/counter.store';

	export let editMode = false;
</script>

<main class="container max-w-[480px]">
	<div class="p-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
		<h1 class="sr-only">Counter App</h1>
		<div class="flex justify-end">
			{#if $store.length > 0}
				<Button variant="ghost" on:click={() => (editMode = !editMode)}>
					{#if editMode}
						Cancel
					{:else}
						Edit
					{/if}
				</Button>
			{/if}
		</div>
		<List bind:editMode />
		<div class="m-3">
			{#if editMode}
				<Button class="w-full mx-auto">Save</Button>
			{:else}
				<AddCount />
			{/if}
		</div>
	</div>
</main>

<style lang="postcss">
</style>
