import {ConsoleMessage, ConsoleRequest} from "@/types/chat";
import SapioConfig from "@/config/sapioConfig";


async function prepareFetch() {

    if (SapioConfig.isLocal()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return async (_message: string, _conversationId: string, _recaptchaToken: string) => {
            const mockResponse: ConsoleMessage = {
                id: "mock_id",
                role: "assistant",
                content: "Mock content for development",
                tone: "system"
            };

            return new Response(JSON.stringify(mockResponse), {
                status: 200,
                headers: {"Content-Type": "application/json"}
            });
        };
    }

    const endpoint = SapioConfig.SAPIO_API_URL
    const key = SapioConfig.SAPIO_WIDGET_API_KEY

    return async (message: string, conversationId: string, recaptchaToken: string) =>
        await fetch(`${endpoint}/widget/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                message: message,
                conversation_id: conversationId,
                recaptcha_token: recaptchaToken,
            } as ConsoleRequest),
        });
}

export default prepareFetch