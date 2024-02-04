<script lang="ts">
	import { Minus, Plus } from 'lucide-svelte';
	import Button from './button/button.svelte';
	import { spring } from 'svelte/motion';
	import store from '$lib/counter.store';

	export let count = 0;
	export let name = '';

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	function changeCount(name: string, type: 'add' | 'reduce') {
		if (type === 'reduce') {
			count -= 1;
		} else {
			count += 1;
		}

		const newArr = [...$store].map((item) => {
			if (item.name === name) {
				const date = new Date();
				const lastActivity = item.meta.activity[item.meta.activity.length - 1];
				return {
					...item,
					count: count,
					meta: {
						...item.meta,
						last_update: date,
						activity:
							new Date(lastActivity).toLocaleDateString() === date.toLocaleDateString()
								? [...item.meta.activity.slice(0, -1), date]
								: [...item.meta.activity, date]
					}
				};
			}
			return item;
		});
		store.editList(newArr);
	}
</script>

<article class="flex flex-col gap-1">
	<h2 class="text-xl font-semibold tracking-tight">{name}</h2>
	<div class="flex justify-between items-center gap-2">
		<Button variant="outline" size="icon" on:click={() => changeCount(name, 'reduce')}
			><Minus /></Button
		>
		<div class="overflow-hidden text-center relative w-32 h-6">
			<div
				class="absolute w-full h-full flex items-center justify-center"
				style="transform: translate(0, {100 * offset}%)"
			>
				<strong class="select-none top-[-24px]" aria-hidden="true"
					>{Math.floor($displayed_count + 1)}</strong
				>
				<strong>{Math.floor($displayed_count)}</strong>
			</div>
			<span class="text-xl font-semibold sr-only"> {count} </span>
		</div>
		<Button variant="outline" size="icon" on:click={() => changeCount(name, 'add')}><Plus /></Button
		>
	</div>
</article>

<style>
	strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
