import { ConsoleRequest, ConsoleResponse } from "@/types/chat";
import SapioConfig from "@/config/sapioConfig";

export type PreloadedFetch = (_message: string, _conversationId?: string, _recaptchaToken?: string) => Promise<Response>;
async function prepareFetch(): Promise<PreloadedFetch> {

    if (SapioConfig.isLocal()) {
        return async (_message: string, _conversationId?: string, _recaptchaToken?: string) => {
            const mockResponse: ConsoleResponse = {
                conversation_id: _conversationId!,
                response: "Mock content for development.",
            };

            return new Response(JSON.stringify(mockResponse), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        };
    }


    return async (message: string, conversationId?: string, recaptchaToken?: string) =>
        await fetch("api/v1/cht", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                m: message,
                c: conversationId,
                r: recaptchaToken,
            }),
        });
}

export default prepareFetch