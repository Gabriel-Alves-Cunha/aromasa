// import { setCookie, parseCookies } from "nookies";

export const appName = "aromasa";
export const generic_key = "@" + appName + ":";
export const userInfo_key = generic_key + "user";

// export function storeUserData(userInfo: User) {
// 	setCookie(undefined, userInfo_key, JSON.stringify(userInfo), {
// 		maxAge: 60 * 60 * 1, // 1 hour
// 	});
// }

// export function getStoredUserData() {
// 	const cookies = parseCookies();
// 	const user: User = JSON.parse(cookies[userInfo_key]);

// 	return user;
// }
