
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({}) => {
    // TODO : Read from cookies
	//const layoutCookie = cookies.get("PaneForge:layout");
	//const collapsedCookie = cookies.get("PaneForge:collapsed");
	const layoutCookie = "[]";
	const collapsedCookie = "true";

	let layout: number[] | undefined = undefined;
	let collapsed: boolean | undefined = undefined;

	layoutCookie && (layout = JSON.parse(layoutCookie));
	collapsedCookie && (collapsed = JSON.parse(collapsedCookie));

	return { layout, collapsed };
};