<script lang="ts">
	import { AddCount } from '$lib/components';
	import store from '$lib/counter.store';
	import { CandyOff } from 'lucide-svelte';
	import Count from './count.svelte';
</script>

{#if $store.length === 0}
	<section class="flex flex-col justify-center gap-6 mt-4">
		<CandyOff class=" mx-auto" size={64} />
		<h2 class="text-xl font-semibold tracking-tight text-center">No items found</h2>
		<p class="text-center">Add a new item to get started</p>
	</section>
{:else}
	<section class="flex flex-col gap-6 mt-4 p-4 list-container bg-background">
		{#each $store as { name, count }}
			<Count {name} {count} />
		{/each}
	</section>
{/if}
<div class="m-3">
	<AddCount />
</div>
