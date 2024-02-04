import domtoimage from 'dom-to-image';

// take screenshot of the element and share via native share
export const shareScreenshot = async (element: HTMLElement) => {
	console.log(element);

	const dataUrl = await domtoimage.toJpeg(element);
	const blob = await fetch(dataUrl).then((res) => res.blob());
	const file = new File([blob], 'counter.png', { type: blob.type });
	const files = [file];

	const shareData = {
		files
	};
	if (navigator.canShare(shareData)) {
		navigator.share(shareData);
	}
};
