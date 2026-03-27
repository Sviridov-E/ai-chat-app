import { fetchChatStream, messagesSelector } from "@/entities/chat";
import { useAppDispatch, useAppSelector } from "@/shared/redux";
import { useCallback, useEffect, useRef } from "react";

export const useChatStream = (options: {
	showError: (text: string) => void;
}) => {
	const isLoading = useAppSelector((store) => store.chat.isStreaming);
	const messages = useAppSelector(messagesSelector);

	const accessToken = useAppSelector((store) => store.auth.accessToken);

	const wasInterruptedRef = useRef(false);
	const lastTypeRef = useRef<"code" | "table" | null>(null);

	const dispatch = useAppDispatch();

	const startStream = useCallback(
		async (type: "code" | "table") => {
			wasInterruptedRef.current = false;
			lastTypeRef.current = null;
			try {
				await dispatch(fetchChatStream({ type })).unwrap();
			} catch (error) {
				console.log(error);
				if (
					!!error &&
					typeof error === "object" &&
					"reason" in error &&
					error.reason === "authRefresh"
				) {
					wasInterruptedRef.current = true;
					lastTypeRef.current = type;
				} else if (error instanceof Error) {
					return options.showError(error.message || "Произошла ошибка");
				}
			}
		},
		[dispatch, options],
	);

	useEffect(() => {
		if (accessToken && wasInterruptedRef.current && lastTypeRef.current) {
			wasInterruptedRef.current = false;
			(() => startStream(lastTypeRef.current))();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	return { messages, startStream, isLoading };
};
