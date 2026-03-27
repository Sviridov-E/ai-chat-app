import { ChatResponse } from "@/entities/chat";
import { chatAbortManager } from "@/entities/chat/model/chat-abort-manager";
import { Button } from "@/shared/ui/button";
import { throttle } from "@/shared/utils";
import { CircleStop } from "lucide-react";
import { memo, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useChatStream } from "../lib/use-chat-stream";
import "./chat-page.scss";

const options = {
	showError: (text: string) => toast.error(text),
};

export const ChatPage = () => {
	const { messages, isLoading, startStream } = useChatStream(options);

	const scrollToBottom = useMemo(
		() =>
			throttle(() => {
				const container = document.documentElement;

				// Проверяем, находится ли юзер близко к низу (запас 100px)
				const isAtBottom =
					container.scrollHeight - container.scrollTop <=
					container.clientHeight + 100;

				if (isAtBottom) {
					container.scrollTo({
						top: container.scrollHeight,
						behavior: "smooth",
					});
				}
			}, 150),
		[],
	);

	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	return (
		<div className="chat-page__wrapper">
			<div className="chat-page__response-wrapper">
				{messages.map(({ id, content }) => (
					<MemoChatResponse content={content} key={id} />
				))}
			</div>

			<div
				className="chat-page__controllers"
				style={{ display: "flex", gap: "8px" }}
			>
				<div>
					<Button onClick={() => startStream("code")} disabled={isLoading}>
						Код
					</Button>
					<Button onClick={() => startStream("table")} disabled={isLoading}>
						Таблица
					</Button>
				</div>
				{isLoading && (
					<Button
						onClick={() => chatAbortManager.abort()}
						className="chat-page__stop-button"
					>
						<CircleStop />
					</Button>
				)}
			</div>
		</div>
	);
};

const MemoChatResponse = memo(ChatResponse);
