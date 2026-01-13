import { useRecaptchaV3 } from "@/hooks/GoogleRecaptchaV3";
import SapioConfig from "@/config/sapioConfig";
import { ConsoleResponse } from "@/types/chat";
import createId from "@/lib/IdGenerator";
import ERROR_MESSAGE from "@/lib/errorMessage";
import prepareFetch, { PreloadedFetch } from "@/service/preloadedFetch";
import catchError from "@/lib/catchError";
import { useEffect, useRef } from "react";


interface UseSendMessageParams { onSuccess: (data: ConsoleResponse) => void, onError: (message: string) => void }
interface UseSendMessageResponse { sendMessage: (text: string,  id? :string) => Promise<void>; }

export function useSendMessage({ onSuccess, onError }: UseSendMessageParams): UseSendMessageResponse {

    const { executeRecaptcha, isLoaded } = useRecaptchaV3(SapioConfig.SAPIO_RECAPTCHA_SITE_KEY);
    const fetchRef = useRef<PreloadedFetch | null>(null);

    useEffect(() => {
        prepareFetch().then((fn) => {
            fetchRef.current = fn;
        });
    }, []);

    const sendMessage = async (text: string, id?: string) => {
        const prepared = await validateAndPrepareRequest(text);
        if (!prepared) return;
        const { payload, recaptchaToken } = prepared;

        return fetchRef.current!(payload, id, recaptchaToken!)
            .then(async response => {
                if (!response.ok) {
                    onError(`${ERROR_MESSAGE.SAPIO_API_ERROR} ${response.status}`)
                    return
                }
                const data = await response.json();
                onSuccess(data);
            })
            .catch(err => {
                onError(err instanceof Error ? err.message : String(err))
            });
    };

    return { sendMessage };


    async function validateAndPrepareRequest(text: string) {
        if (!fetchRef.current) {
            onError("Chat service is not ready yet.");
            return null;
        }

        if (!text || !text.trim()) {
            return null;
        }

        if (!isLoaded) {
            onError(ERROR_MESSAGE.RECAPTCHA_NOT_READY);
            return null;
        }

        const [error, recaptchaToken] = await catchError(
            executeRecaptcha("sapio_console_chat")
        );

        if (error || !recaptchaToken) {
            onError(ERROR_MESSAGE.FAILED_RECAPTCHA_VALIDATION);
            return null;
        }

        return {
            payload: text.trim(),
            recaptchaToken,
        };
    }
}
