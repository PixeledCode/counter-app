<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	export let logMode = false;
	import store from '$lib/counter.store';
	import { ArrowRightCircleIcon } from 'lucide-svelte';

	export let handleMenuChange: (e: { detail: string }, status?: boolean) => void;
</script>

<Drawer.Root
	open={logMode}
	onOpenChange={() => {
		handleMenuChange({ detail: 'Logs' }, false);
	}}
>
	<Drawer.Content class="h-[100dvh]">
		<Drawer.Header class="flex items-center justify-between gap-2 px-6">
			<Drawer.Title>Activity</Drawer.Title>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Header>

		<section class="overflow-auto pb-6">
			{#if $store.length === 0}
				<div class="flex flex-col gap-6 mt-4 px-6">
					<h2 class="text-xl font-semibold tracking-tight text-center">No items found</h2>
					<p class="text-center">Add a new item to get started</p>
				</div>
			{:else}
				<div class="flex flex-col gap-4 mt-4 px-6">
					{#each $store as { name, meta }}
						<button
							class="text-start flex items-center justify-between gap-2 border border-solid border-slate-400 rounded-lg p-2 px-4"
							on:click={() => console.log(meta)}
						>
							<div class="flex flex-col gap-1">
								<p class="font-semibold">{name}</p>
								<p class="text-sm text-slate-600">
									<span>Last Updated:</span>
									{new Date(meta.last_update).toDateString()}
								</p>
							</div>
							<ArrowRightCircleIcon />
						</button>
					{/each}
				</div>
			{/if}
		</section>
	</Drawer.Content>
</Drawer.Root>
