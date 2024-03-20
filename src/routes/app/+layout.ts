
import type { LayoutLoad } from '../$types';
import Cookies from 'js-cookie'

export const load: LayoutLoad = async ({}) => {
	const layoutCookie = Cookies.get("PaneForge:layout");
	const collapsedCookie = Cookies.get("PaneForge:collapsed");

	let layout: number[] | undefined = undefined;
	let collapsed: boolean | undefined = undefined;

	layoutCookie && (layout = layoutCookie.split(',').map(i => parseFloat(i)));
	collapsedCookie && (collapsed = JSON.parse(collapsedCookie));

	return { layout, collapsed };
};