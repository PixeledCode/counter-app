<script lang="ts">
	import { AddCount, Button } from '$lib/components';
	import store from '$lib/counter.store';
	import { CandyOff, Minus, Plus } from 'lucide-svelte';
	import gsap from 'gsap';

	function changeCount(name: string, type: 'add' | 'reduce') {
		const newArr = [...$store].map((item, i) => {
			if (item.name === name) {
				let newCount;
				if (type === 'reduce') {
					prevTransition(i);
					newCount = Number(item.count) - 1;
				} else {
					nextTransition(i);
					newCount = Number(item.count) + 1;
				}

				return {
					...item,
					count: newCount
				};
			}
			return item;
		});
		store.editList(newArr);
	}

	let temp = [...$store];

	function getNodes(index: number) {
		let prevNode = document.querySelector(`#prev-count-${index}`) as HTMLElement;
		let currentNode = document.querySelector(`#current-count-${index}`) as HTMLElement;
		let nextNode = document.querySelector(`#next-count-${index}`) as HTMLElement;

		return { prevNode, currentNode, nextNode };
	}

	function prevTransition(index: number) {
		const { prevNode, currentNode, nextNode } = getNodes(index);
		gsap.to([prevNode, currentNode], {
			duration: 0.3,
			y: -28,
			ease: 'power4.out',
			onComplete: () => {
				nextNode.innerHTML = currentNode.innerHTML;
				currentNode.innerHTML = prevNode.innerHTML;
				gsap.set([prevNode, currentNode], { y: 0 });
				prevNode.innerHTML = String(Number(prevNode.innerHTML) - 1);
			}
		});
	}

	function nextTransition(index: number) {
		const { prevNode, currentNode, nextNode } = getNodes(index);
		gsap.to([nextNode, currentNode], {
			duration: 0.3,
			y: 28,
			ease: 'power4.out',
			onComplete: () => {
				prevNode.innerHTML = currentNode.innerHTML;
				currentNode.innerHTML = nextNode.innerHTML;
				gsap.set([nextNode, currentNode], { y: 0 });
				nextNode.innerHTML = String(Number(nextNode.innerHTML) + 1);
			}
		});
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
		{#each $store as { name, count }, i}
			<article class="flex flex-col gap-1">
				<h2 class="text-xl font-semibold tracking-tight">{name}</h2>
				<div class="flex justify-between items-center gap-2">
					<Button variant="outline" size="icon" on:click={() => changeCount(name, 'reduce')}
						><Minus /></Button
					>
					<div>
						<div class="flex flex-col items-center justify-center h-10 overflow-clip">
							<span class="text-xl font-semibold" id={`next-count-${i}`}>{temp[i].count + 1}</span>
							<span class="text-xl font-semibold" id={`current-count-${i}`}>{temp[i].count}</span>
							<span class="text-xl font-semibold" id={`prev-count-${i}`}>{temp[i].count - 1} </span>
						</div>
						<span class="text-xl font-semibold sr-only"> {count} </span>
					</div>
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
