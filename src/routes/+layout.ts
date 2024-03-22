export const prerender = true;
export const ssr = false;

import type { LayoutLoad } from './$types';
import { getIntroShowed } from '@/utils/cookies';

export const load: LayoutLoad = async ({}) => {
	let introShowed = getIntroShowed()

	return { introShowed };
};
