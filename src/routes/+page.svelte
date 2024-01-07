<script lang="ts">
	import { Button, List, EditList } from '$lib/components';
	import store from '$lib/counter.store';

	$: editMode = false;
</script>

<div class="container max-w-[480px]">
	<div class="p-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
		<h1 class="sr-only">Counter App</h1>
		<div class="flex justify-end">
			{#if $store.length > 0 || editMode}
				<Button variant="ghost" on:click={() => (editMode = !editMode)}>
					{#if editMode}
						Cancels
					{:else}
						Edit
					{/if}
				</Button>
			{/if}
		</div>
		{#if editMode}
			<EditList bind:editMode />
		{:else}
			<List />
		{/if}
	</div>
</div>
