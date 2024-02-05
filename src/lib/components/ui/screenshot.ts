import { domToPng } from 'modern-screenshot';

export const shareScreenshot = async (element: HTMLElement) => {
	domToPng(element, {
		scale: 3,
		style: {
			borderRadius: '14px'
		}
	}).then(async (dataUrl) => {
		const blob = await fetch(dataUrl).then((res) => res.blob());
		const file = new File([blob], 'counter.png', { type: blob.type });
		const files = [file];

		const shareData = {
			files
		};
		if (navigator.canShare(shareData)) {
			navigator.share(shareData);
		}
	});
};
