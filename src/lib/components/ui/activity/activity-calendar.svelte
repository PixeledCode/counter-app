<script lang="ts">
	import { Calendar } from '$lib/components/ui/calendar';
	import { parseDate } from '@internationalized/date';
	import { ChevronLeft } from 'lucide-svelte';
	import Button from '../button/button.svelte';
	export let activeCounter: {
		name: string;
		count: number;
		meta: {
			activity: Date[];
			last_update: any;
		};
	} | null;

	const selectedDates = activeCounter?.meta.activity.map((item: Date) => {
		return parseDate(new Date(item).toISOString().split('T')[0]);
	});
</script>

<div class="px-4 mt-4 w-full">
	<Button variant="outline" size="sm" class="gap-2 pr-4" on:click={() => (activeCounter = null)}
		><ChevronLeft size={18} /> Go back</Button
	>
	{#if activeCounter}
		<div class="my-2">
			<h2 class="text-xl font-semibold text-center">
				{activeCounter.name} <span class="text-sm text-slate-600">({activeCounter.count})</span>
			</h2>
		</div>
	{/if}

	<Calendar value={selectedDates || []} class="border rounded-md w-[276px] mx-auto" />
</div>
