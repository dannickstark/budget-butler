import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({}) => {
    let logged = true

    if(logged){
        redirect(303, '/app');
    } else {
        redirect(303, '/login');
    }
};