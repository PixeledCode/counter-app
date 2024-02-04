<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import ActivityCalendar from './activity-calendar.svelte';
	export let logMode = false;
	import ActivityList from './activity-list.svelte';
	let activeCounter: any = null;

	export let handleMenuChange: (e: { detail: string }, status?: boolean) => void;
</script>

<Drawer.Root
	open={logMode}
	onOpenChange={() => {
		handleMenuChange({ detail: 'Logs' }, false);
		activeCounter = null;
	}}
>
	<Drawer.Content class="h-[90dvh]">
		<Drawer.Header class="flex items-center justify-between gap-2 px-6">
			<Drawer.Title>Activity</Drawer.Title>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Header>

		{#if activeCounter === null}
			<ActivityList bind:activeCounter />
		{:else}
			<ActivityCalendar bind:activeCounter />
		{/if}
	</Drawer.Content>
</Drawer.Root>
