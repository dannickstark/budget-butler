import type { SubmitFunction } from '@sveltejs/kit';

//==============================================[ Enhencement ]==============================================
type SuccessData<T> =
	T extends Record<string, unknown> ? (T extends { invalid: boolean } ? never : T) : never;
type InvalidData<T> =
	T extends Record<string, unknown> ? (T extends { invalid: boolean } ? T : never) : never;
export type TypedSubmitFunction<T> = SubmitFunction<SuccessData<T>, InvalidData<T>>;

export type ResponseData = {
	success: boolean;
	message: string;
	info: { [k: string]: any };
	errors?: Object;
};
