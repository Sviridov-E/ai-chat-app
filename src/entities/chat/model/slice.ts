import {
	createSelector,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

interface Message {
	id: string;
	content: string;
}

interface ChatState {
	messages: Record<string, Message>;
	messagesOrder: string[];
	isStreaming: boolean;
}

const initialState: ChatState = {
	messages: {},
	messagesOrder: [],
	isStreaming: false,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		clearChat: (state) => {
			state.messages = {};
			state.messagesOrder = [];
		},
		pushContent: (
			state,
			action: PayloadAction<{ content: string; id: string }>,
		) => {
			const {
				payload: { content, id },
			} = action;

			if (state.messages[id]) {
				state.messages[id].content += content;
			} else {
				state.messages[id] = { content, id };
				state.messagesOrder.push(id);
			}
		},
		startStreaming: (state) => {
			state.isStreaming = true;
		},
		finishStreaming: (state) => {
			state.isStreaming = false;
		},
	},
});

export const messagesSelector = createSelector(
	[
		(state: RootState) => state.chat.messagesOrder,
		(state: RootState) => state.chat.messages,
	],
	(order, messages) => {
		return order.map((id) => messages[id]).filter((message) => message != null);
	},
);

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
