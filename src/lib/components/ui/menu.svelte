<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MenuIcon } from 'lucide-svelte';
	import { shareScreenshot } from './screenshot';
	export let onClick: (e: CustomEvent<string>) => void;

	let canShare = 'share' in navigator;

	function handleShare() {
		shareScreenshot(document.querySelector('.list-container') as HTMLElement);
	}
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
		{#if canShare}
			<DropdownMenu.Item on:click={handleShare}>Share</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
