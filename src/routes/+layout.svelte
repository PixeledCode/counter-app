<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				/**
				 * @param {any} r
				 */
				onRegistered(r) {
					r &&
						setInterval(
							() => {
								console.log('Checking for sw update');
								r.update();
							},
							1000 * 60 * 60
						); // check for update every hour
					console.log(`SW Registered: ${r}`);
				},
				/**
				 * @param {any} error
				 */
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<Toaster />
<main>
	<slot />
</main>
