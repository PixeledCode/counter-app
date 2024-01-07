<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.pcss';

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<Toaster />
<slot />
