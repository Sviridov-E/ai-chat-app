// Чтобы не нарушать архитектурные принципы, определять необходимые функции через инъекцию

type TokenGetter = () => string | null;
type TokenSetter = (token: string) => void;

export let getAccessToken: TokenGetter = () => null;
export let getRefreshToken: TokenGetter = () => null;
export let setAccessToken: TokenSetter = () => {};
export let resetTokens: VoidFunction = () => {};

export const injectTokens = (fns: {
	getAccessToken: TokenGetter;
	getRefreshToken: TokenGetter;
	setAccessToken: TokenSetter;
	resetTokens: VoidFunction;
}) => {
	getAccessToken = fns.getAccessToken;
	getRefreshToken = fns.getRefreshToken;
	setAccessToken = fns.setAccessToken;
	resetTokens = fns.resetTokens;
};
