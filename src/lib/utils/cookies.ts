import Cookies from 'js-cookie';

export function getIntroShowed() {
	const introductionShowed = Cookies.get('introduction:showed');
	let introShowed: boolean = false;
	introductionShowed && (introShowed = JSON.parse(introductionShowed));
	return introShowed;
}
