import { useState, useRef, RefObject } from "react";
import { useRecaptchaV3 } from "@/hooks/GoogleRecaptchaV3";
import SapioConfig from "@/config/sapioConfig";
import { ConsoleMessage, ConsoleResponse } from "@/types/chat";
import createId from "@/lib/IdGenerator";
import ERROR_MESSAGE from "@/lib/errorMessage";
import prepareFetch from "@/service/preloadedFetch";
import catchError from "@/lib/catchError";


interface UseSendMessageParams {
    conversationId: string | undefined;
    setConversationId: (id: string | undefined) => void;
    t: (key: string) => string;
    setMessages: React.Dispatch<React.SetStateAction<ConsoleMessage[]>>;
    setPendingAnimationId: (id: string | null) => void;
}

interface UseSendMessageResponse {
    sendMessage: (text: string) => Promise<void>;
    isThinking: boolean;
    inputRef: RefObject<HTMLInputElement | null>;
}

export function useSendMessage({
                                   conversationId,
                                   setConversationId,
                                   t,
                                   setMessages,
                                   setPendingAnimationId,
                               }: UseSendMessageParams): UseSendMessageResponse {

    const onSuccess = (data: ConsoleResponse) => {
        const assistantMessage: ConsoleMessage = {
            id: createId(),
            role: "assistant",
            content: data.response,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversation_id);
        setPendingAnimationId(assistantMessage.id);
    }
    const onError = (message?: string) => {
        const errorMessage: ConsoleMessage = {
            id: createId(),
            role: "assistant",
            content: t("home.sapioConsole.errorMessage"),
            tone: "error",
        };

        setMessages(prev => [...prev, errorMessage]);
        setPendingAnimationId(errorMessage.id);
    }


    const [isThinking, setIsThinking] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const {executeRecaptcha, isLoaded: isRecaptchaLoaded} = useRecaptchaV3(SapioConfig.SAPIO_RECAPTCHA_SITE_KEY);


    const sendMessage = async (text: string) => {
        const preloadedFetch = await prepareFetch()

        if (!text.trim() || isThinking) return;

        setIsThinking(true);

        const trimmed = text.trim();

        const userMessage: ConsoleMessage = {
            id: createId(),
            role: "user",
            content: trimmed,
        };
        setMessages(prev => [...prev, userMessage]);


        if (!isRecaptchaLoaded) {
            onError(ERROR_MESSAGE.RECAPTCHA_NOT_READY)
            return
        }

        const [error, recaptchaToken] = await catchError(executeRecaptcha("sapio_console_chat"))
        if (error) {
            onError(ERROR_MESSAGE.FAILED_RECAPTCHA_VALIDATION)
            return
        }

        return preloadedFetch(trimmed, conversationId!, recaptchaToken!)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`${ERROR_MESSAGE.SAPIO_API_ERROR} ${response.status}`);
                }
                const data = await response.json();
                onSuccess(data);
            })
            .catch(err => {
                onError(err instanceof Error ? err.message : String(err))
            })
            .finally(() => {
                setIsThinking(false);
                inputRef.current?.focus();
            });
    };

    return {
        sendMessage,
        isThinking,
        inputRef,
    };
}
