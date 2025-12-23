import { useRecaptchaV3 } from "@/hooks/GoogleRecaptchaV3";
import SapioConfig from "@/config/sapioConfig";
import { ConsoleResponse } from "@/types/chat";
import createId from "@/lib/IdGenerator";
import ERROR_MESSAGE from "@/lib/errorMessage";
import prepareFetch, { PreloadedFetch } from "@/service/preloadedFetch";
import catchError from "@/lib/catchError";
import { useEffect, useMemo, useRef } from "react";


interface UseSendMessageParams { onSuccess: (data: ConsoleResponse) => void, onError: (message: string) => void }
interface UseSendMessageResponse { sendMessage: (text: string) => Promise<void>; }

export function useSendMessage({ onSuccess, onError }: UseSendMessageParams): UseSendMessageResponse {

    const { executeRecaptcha, isLoaded } = useRecaptchaV3(SapioConfig.SAPIO_RECAPTCHA_SITE_KEY);
    const fetchRef = useRef<PreloadedFetch | null>(null);

    useEffect(() => {
        prepareFetch().then((fn) => {
            fetchRef.current = fn;
        });
    }, []);

    const sendMessage = async (text: string) => {

        if (!fetchRef.current) {
            onError("Chat service is not ready yet.");
            return;
        }

        if (!text || !text.trim()) return;
        const payload = text.trim()

        if (!isLoaded) {
            onError(ERROR_MESSAGE.RECAPTCHA_NOT_READY)
            return
        }

        const [error, recaptchaToken] = await catchError(executeRecaptcha("sapio_console_chat"))
        if (error) {
            onError(ERROR_MESSAGE.FAILED_RECAPTCHA_VALIDATION)
            return
        }

        return fetchRef.current(payload, createId(), recaptchaToken!)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`${ERROR_MESSAGE.SAPIO_API_ERROR} ${response.status}`);
                }
                const data = await response.json();
                onSuccess(data);
            })
            .catch(err => {
                onError(err instanceof Error ? err.message : String(err))
            });
    };

    return { sendMessage };
}
