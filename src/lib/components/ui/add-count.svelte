<script lang="ts">
	import { Button, Input, Label } from '$lib/components';
	import * as Drawer from '$lib/components/ui/drawer';
	import { toast } from 'svelte-sonner';
	import store from '$lib/counter.store';
	export const editStore = store.editList;

	let name = '';
	let count = '';

	let drawerOpen = false;
</script>

<Drawer.Root
	open={drawerOpen}
	onOpenChange={(e) => {
		drawerOpen = e;
		name = '';
		count = '';
	}}
>
	<Drawer.Trigger asChild let:builder>
		<Button class="w-full mx-auto" builders={[builder]}>Add new count</Button>
	</Drawer.Trigger>

	<Drawer.Content>
		<Drawer.Header class="flex items-center justify-between gap-2">
			<Drawer.Title>Add new count</Drawer.Title>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Header>

		<div class="px-4 flex flex-col gap-4">
			<div class="flex flex-col w-full gap-1.5">
				<Label for="name">Name</Label>
				<Input
					type="text"
					id="name"
					value={name}
					on:input={(e) => {
						// @ts-ignore
						name = e.target.value;
					}}
				/>
			</div>
			<div class="flex flex-col w-full gap-1.5">
				<Label for="count">Start Count</Label>
				<Input
					type="number"
					id="count"
					value={count}
					placeholder="0"
					on:input={(e) => {
						// @ts-ignore
						count = e.target.value;
					}}
				/>
			</div>
		</div>

		<Drawer.Footer>
			<Button
				on:click={() => {
					if (name) {
						const alreadyExists = $store.find((item) => item.name === name);
						if (alreadyExists) {
							toast.error('Name already exists', {
								action: {
									label: 'Dismiss',
									onClick: () => {}
								}
							});
							return;
						}
						editStore([...$store, { name, count: Number(count) }]);
						name = '';
						count = '';
						drawerOpen = false;
					} else {
						toast.error('Name is required', {
							action: {
								label: 'Dismiss',
								onClick: () => {}
							}
						});
					}
				}}>Save</Button
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
