import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedList = (browser && localStorage.getItem('count_list')) || null;
const parsedList: { name: string; count: number }[] = storedList ? JSON.parse(storedList) : [];

function createCount() {
	const { subscribe, set } = writable<{ name: string; count: number }[]>(parsedList);

	return {
		subscribe,
		editList: (list: { name: string; count: number }[]) => {
			set(list);
			localStorage.setItem('count_list', JSON.stringify(list));
		}
	};
}

const countStore = createCount();

export default countStore;
