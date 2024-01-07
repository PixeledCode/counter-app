<script lang="ts">
	import { AddCount, Button } from '$lib/components';
	import store from '$lib/counter.store';
	import { CandyOff, Minus, Plus } from 'lucide-svelte';

	function changeCount(name: string, type: 'add' | 'reduce') {
		const newArr = [...$store].map((item) => {
			if (item.name === name) {
				return {
					...item,
					count: type === 'reduce' ? Number(item.count) - 1 : Number(item.count) + 1
				};
			}
			return item;
		});
		store.editList(newArr);
	}
</script>

{#if $store.length === 0}
	<section class="flex flex-col justify-center gap-6 mt-4">
		<CandyOff class=" mx-auto" size={64} />
		<h2 class="text-xl font-semibold tracking-tight text-center">No items found</h2>
		<p class="text-center">Add a new item to get started</p>
	</section>
{:else}
	<section class="flex flex-col gap-6 mt-4">
		{#each $store as { name, count }}
			<article class="flex flex-col gap-1">
				<h2 class="text-xl font-semibold tracking-tight">{name}</h2>
				<div class="flex justify-between items-center gap-2">
					<Button variant="outline" size="icon" on:click={() => changeCount(name, 'reduce')}
						><Minus /></Button
					>
					<span class="text-xl font-semibold"> {count} </span>
					<Button variant="outline" size="icon" on:click={() => changeCount(name, 'add')}
						><Plus /></Button
					>
				</div>
			</article>
		{/each}
	</section>
{/if}
<div class="m-3">
	<AddCount />
</div>
