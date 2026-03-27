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

	// 	setIsLoading(true);

	// 	try {
	// 		await fetchEventSource(url, {
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 			signal: ctrl.signal,

	// 			onmessage(msg) {
	// 				const json = JSON.parse(msg.data);
	// 				setContent((prev) => prev + (json.content || ""));
	// 			},

	// 			onclose() {
	// 				setIsLoading(false);
	// 				abortControllerRef.current = null;
	// 			},

	// 			async onopen(response) {
	// 				if (response.ok) return;

	// 				if (response.status === 400) {
	// 					// Если токен протух, останавливаем и делаем рефреш
	// 					// когда токен обновится из редакса - соединение восстановится
	// 					ctrl.abort();
	// 					wasInterruptedRef.current = true;
	// 					refreshToken();
	// 					return;
	// 				}

	// 				const errorMsg = `Ошибка сервера: ${response.status}`;
	// 				options.showError(errorMsg); // Вызываем колбэк наружу
	// 				throw new Error(errorMsg);
	// 			},

	// 			onerror(err) {
	// 				if (!(err instanceof Error && err.name === "AbortError")) {
	// 					options.showError(
	// 						err instanceof Error ? err.message : "Ошибка сети",
	// 					);
	// 				}
	// 				throw err;
	// 			},
	// 		});
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	useEffect(() => {
		if (accessToken && wasInterruptedRef.current && lastTypeRef.current) {
			wasInterruptedRef.current = false;
			(() => startStream(lastTypeRef.current))();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	return { messages, startStream, isLoading };
};
