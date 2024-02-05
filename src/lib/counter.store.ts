import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Props = {
	name: string;
	count: number;
	meta: {
		creation_date: string;
		last_update: string;
		activity: {
			[isoDate: string]: number;
		};
	};
}[];

const storedList = (browser && localStorage.getItem('count_list')) || null;
const parsedList: Props = storedList ? JSON.parse(storedList) : [];

function createCount() {
	let newList: Props = parsedList;

	// migration from old version. TODO: remove in future
	if (parsedList.length > 0 && !parsedList[0].meta) {
		newList = parsedList.map((item) => {
			if (item.meta) {
				return item;
			}

			const date = new Date();
			return {
				...item,
				meta: {
					creation_date: date.toISOString().split('T')[0],
					last_update: date.toISOString().split('T')[0],
					activity: {}
				}
			};
		});
	}

	const { subscribe, set } = writable<Props>(newList);

	return {
		subscribe,
		editList: (list: Props) => {
			set(list);
			localStorage.setItem('count_list', JSON.stringify(list));
		}
	};
}

const countStore = createCount();

export default countStore;
