import { ChatResponse } from "@/entities/chat";
import { Button } from "@/shared/ui/button";
import toast from "react-hot-toast";
import { useChatStream } from "../lib/use-chat-stream";
import { chatAbortManager } from "@/entities/chat/model/chat-abort-manager";
import { memo } from "react";

const options = {
	showError: (text: string) => toast.error(text),
};

export const ChatPage = () => {
	const { messages, isLoading, startStream } = useChatStream(options);

	return (
		<div>
			<div>
				{messages.map(({ id, content }) => (
					<MemoChatResponse content={content} key={id} />
				))}
				{isLoading && <span>...AI печатает</span>}
			</div>
			<div style={{ display: "flex", gap: "8px" }}>
				<Button onClick={() => startStream("code")}>Старт код</Button>
				<Button onClick={() => startStream("table")}>Старт таблица</Button>
				<Button onClick={() => chatAbortManager.abort()}>Стоп</Button>
			</div>
		</div>
	);
};

const MemoChatResponse = memo(ChatResponse);
