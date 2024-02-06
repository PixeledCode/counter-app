<script lang="ts">
	import { Calendar } from '$lib/components/ui/calendar';
	import { parseDate } from '@internationalized/date';
	import { ChevronLeft } from 'lucide-svelte';
	import Button from '../button/button.svelte';
	export let activeCounter: {
		name: string;
		count: number;
		meta: {
			activity: {
				[key: string]: string;
			};
			last_update: any;
		};
	} | null;

	const selectedDates = Object.keys(activeCounter?.meta.activity || {})
		.map((item: string) => {
			if (!Number.isNaN(Number(item))) {
				return;
			}
			if (Number(activeCounter?.meta.activity[item]) !== 0) return parseDate(item);
			return;
		})
		.filter(Boolean);

	console.log(activeCounter?.meta);
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

	<Calendar value={selectedDates || []} class="border rounded-md w-[300px] mx-auto" />
</div>
