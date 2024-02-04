<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MenuIcon } from 'lucide-svelte';
	import Logs from './activity.svelte';

	export let onClick: (e: CustomEvent<string>) => void;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="inline-flex items-center justify-center rounded-md text-sm font-medium 
    whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 active:bg-accent active:text-accent-foreground 
    h-10 w-10"
	>
		<MenuIcon />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => onClick(new CustomEvent('click', { detail: 'Edit' }))}>
			Edit
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => onClick(new CustomEvent('click', { detail: 'Logs' }))}>
			Logs
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
