import ChatBox from "@/components/ChatBox";

export default function ChatbotPage() {
	return (
		<div className="mx-auto max-w-[900px] px-6 py-16">
			<h1 className="text-3xl font-semibold mb-6">Sapio Chatbot</h1>
			<ChatBox heightClass="h-[70vh] min-h-[520px]" />
		</div>
	);
}


