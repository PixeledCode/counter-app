<script lang="ts">
	import { Button, List, EditList } from '$lib/components';
	import Activity from '$lib/components/ui/activity/activity.svelte';
	import Menu from '$lib/components/ui/menu.svelte';
	import store from '$lib/counter.store';

	$: editMode = false;
	$: logMode = false;

	function handleEdit() {
		editMode = !editMode;
	}

	function handleLogs(status: boolean) {
		logMode = status;
	}

	function handleMenuChange(e: { detail: string }, status = false) {
		if (e.detail === 'Edit') {
			handleEdit();
			return;
		}
		if (e.detail === 'Logs') {
			handleLogs(status);
			return;
		}
	}
</script>

<div class="container max-w-[480px]">
	<div class="p-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
		<h1 class="sr-only">Counter App</h1>
		<div class="flex justify-end">
			{#if $store.length > 0 || editMode}
				{#if editMode}
					<Button variant="ghost" on:click={handleEdit}>Cancel</Button>
				{:else}
					<Menu onClick={handleMenuChange} />
				{/if}
			{/if}
		</div>
		{#if editMode}
			<EditList bind:editMode />
		{:else}
			<List />
		{/if}
	</div>
	<Activity {logMode} {handleMenuChange} />
</div>
