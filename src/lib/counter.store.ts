import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Props = {
	name: string;
	count: number;
	meta: {
		creation_date: Date;
		last_update: Date;
		activity: Date[];
	};
}[];

const storedList = (browser && localStorage.getItem('count_list')) || null;
const parsedList: Props = storedList ? JSON.parse(storedList) : [];

function createCount() {
	// migration from old version. TODO: remove in future
	let newList: Props = parsedList;
	if (parsedList.length > 0 && !parsedList[0].meta) {
		newList = parsedList.map((item) => {
			if (item.meta) {
				return item;
			}

			return {
				...item,
				meta: {
					creation_date: new Date(),
					last_update: new Date(),
					activity: []
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
