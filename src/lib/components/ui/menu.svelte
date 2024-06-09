<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MenuIcon } from 'lucide-svelte';
	import { shareScreenshot } from './screenshot';
	import { toast } from 'svelte-sonner';
	export let onClick: (e: { detail: string }, b?: boolean) => void;

	let canShare = 'share' in navigator;

	function handleShare() {
		shareScreenshot(document.querySelector('.list-container') as HTMLElement);
	}

	function downloadData() {
		const data = localStorage.getItem('count_list');

		if (data) {
			const blob = new Blob([data], { type: 'text/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'count_list_old.json';
			a.click();
			URL.revokeObjectURL(url);
			toast.success('Data downloaded successfully');
		} else {
			toast.error('No data to download');
		}
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
		<DropdownMenu.Item on:click={() => onClick({ detail: 'Edit' })}>Edit</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => onClick({ detail: 'Logs' }, true)}>Logs</DropdownMenu.Item>
		{#if canShare}
			<DropdownMenu.Item on:click={handleShare}>Share</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Item on:click={downloadData}>Download</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
