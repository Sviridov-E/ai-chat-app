import { PATHS, refreshToken } from "@/shared/api";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatActions } from "./slice";
import { makeUrl } from "@/shared/utils";
import { chatAbortManager } from "./chat-abort-manager";

type RequestType = "code" | "table";

const urls = {
	code: PATHS.CHAT_CODE,
	table: PATHS.CHAT_TABLE,
};

export const fetchChatStream = createAsyncThunk<
	void,
	{ type: RequestType },
	{ state: RootState }
>(
	"chat/fetchStream",
	async ({ type }, { dispatch, getState, rejectWithValue }) => {
		const url = urls[type];

		const accessToken = getState().auth.accessToken;

		const id = crypto.randomUUID();

		dispatch(chatActions.startStreaming());

		try {
			const ctrl = new AbortController();
			chatAbortManager.set(ctrl);

			await fetchEventSource(makeUrl(url), {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				signal: ctrl.signal,

				onmessage(msg) {
					const json = JSON.parse(msg.data);
					const content = json.content || "";
					dispatch(chatActions.pushContent({ id, content }));
				},

				async onopen(response) {
					if (response.ok) return;

					if (response.status === 400) {
						// Если токен протух, останавливаем и делаем рефреш
						// когда токен обновится из редакса - соединение восстановится
						refreshToken();
						throw { type: "authRefresh" };
					}

					const errorMsg = `Ошибка сервера: ${response.status}`;

					throw new Error(errorMsg);
				},

				onerror(err) {
					throw err;
				},
			});
		} catch (error) {
			if (!!error && typeof error === "object") {
				if ("name" in error && error.name === "AbortError") {
					return;
				}

				if ("type" in error && error.type === "authRefresh") {
					return rejectWithValue({ reason: error.type });
				}

				if (error instanceof Error) {
					return rejectWithValue({
						reason: "serverError",
						message: error.message || "",
					});
				}
			}
			throw error;
		} finally {
			dispatch(chatActions.finishStreaming());
		}
	},
);
