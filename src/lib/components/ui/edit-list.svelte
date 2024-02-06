<script lang="ts">
	import { Minus, Plus, CandyOff } from 'lucide-svelte';
	import { Button, Input } from '$lib/components';
	import store from '$lib/counter.store';
	$: list = [...$store];
	export let editMode: boolean;

	function updateCount(name: string, type: 'add' | 'reduce' | 'change', newCount?: number) {
		const date = new Date().toISOString().split('T')[0];

		// when the user changes the count manually
		if (type === 'change') {
			const newArr = list.map((item) => {
				if (item.name === name && Number(newCount) !== item.count) {
					if (Number(newCount) < 0) return item;

					return {
						...item,
						meta: {
							...item.meta,
							last_update: date,
							activity: {
								...item.meta.activity,
								[date]: (item.meta.activity[date] || 0) + (Number(newCount) < item.count ? -1 : 1)
							}
						},
						count: Number(newCount)
					};
				}
				return item;
			});
			list = newArr;
			return;
		}

		// when the user clicks on the add or reduce button
		const newArr = list.map((item) => {
			if (item.name === name) {
				if (type === 'reduce' && item.count === 0) return item;
				return {
					...item,
					count: type === 'reduce' ? item.count - 1 : item.count + 1,
					meta: {
						...item.meta,
						last_update: date,
						activity: {
							...item.meta.activity,
							[date]: (item.meta.activity[date] || 0) + (type === 'reduce' ? -1 : 1)
						}
					}
				};
			}
			return item;
		});
		list = newArr;
	}

	function deleteItem(name: string) {
		const newArr = list.filter((item) => item.name !== name);
		list = newArr;
	}

	function onInput(e: any) {
		const { value } = e.target;
		if (Number(value) < 0) return Math.abs(value);

		return value;
	}
</script>

{#if list.length === 0}
	<section class="flex flex-col justify-center gap-6 mt-4">
		<CandyOff class=" mx-auto" size={64} />
		<h2 class="text-xl font-semibold tracking-tight text-center">All items removed</h2>
	</section>
{:else}
	<section class="flex flex-col gap-6 mt-4">
		{#each list as { name, count }}
			<article class="flex flex-col gap-1">
				<div class="flex items-center justify-between gap-2 flex-wrap">
					<h2 class="text-xl font-semibold tracking-tight">{name}</h2>
					<button on:click={() => deleteItem(name)}>
						<p class="text-sm text-red-500">Delete</p>
					</button>
				</div>

				<div class="flex justify-between items-center gap-2">
					<Button variant="outline" size="icon" on:click={() => updateCount(name, 'reduce')}>
						<Minus />
					</Button>

					<Input
						type="number"
						class="text-center w-max font-semibold max-w-20"
						value={count}
						min="0"
						placeholder="0"
						on:input={(e) => {
							count = onInput(e);
						}}
						on:change={() => {
							updateCount(name, 'change', Number(count));
						}}
					/>

					<Button variant="outline" size="icon" on:click={() => updateCount(name, 'add')}>
						<Plus />
					</Button>
				</div>
			</article>
		{/each}
	</section>
{/if}
<Button
	on:click={() => {
		store.editList(list);
		editMode = false;
	}}
	class="w-full mx-auto">Save</Button
>
