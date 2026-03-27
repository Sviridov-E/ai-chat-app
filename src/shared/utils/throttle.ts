export const throttle = <Args extends unknown[]>(
	func: (...args: Args) => void,
	ms: number,
) => {
	let inThrottle = false;

	return (...args: Args): void => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, ms);
		}
	};
};
