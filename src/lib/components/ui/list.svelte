<script lang="ts">
	import { Minus, Plus, CandyOff } from 'lucide-svelte';
	import { Button } from '$lib/components';

	export let list: { name: string; count: number }[];
</script>

{#if list.length === 0}
	<section class="flex flex-col justify-center gap-6 mt-4">
		<CandyOff class=" mx-auto" size={64} />
		<h2 class="text-xl font-semibold tracking-tight text-center">No items found</h2>
		<p class="text-center">Add a new item to get started</p>
	</section>
{:else}
	<section class="flex flex-col gap-6 mt-4">
		{#each list as { name, count }}
			<article class="flex flex-col gap-1">
				<h2 class="text-xl font-semibold tracking-tight">{name}</h2>
				<div class="flex justify-between items-center gap-2">
					<Button variant="outline" size="icon"><Minus /></Button>
					<span class="text-xl font-semibold"> {count} </span>
					<Button variant="outline" size="icon"><Plus /></Button>
				</div>
			</article>
		{/each}
	</section>
{/if}
