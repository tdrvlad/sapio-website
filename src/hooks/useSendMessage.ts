import {useState, useRef} from "react";
import {useRecaptchaV3} from "@/hooks/GoogleRecaptchaV3";
import SapioConfig from "@/lib/sapioConfig";
import {ConsoleMessage, ConsoleRequest} from "@/types/chat";
import createId from "@/lib/IdGenerator";
import ERROR_MESSAGE, {ErrorMessage} from "@/lib/Errors";
import prepareFetch from "@/service/preloadedFetch";


interface UseSendMessageParams {
    conversationId: string | undefined;
    setConversationId: (id: string | undefined) => void;
    t: (key: string) => string;
    setMessages: React.Dispatch<React.SetStateAction<ConsoleMessage[]>>;
    setPendingAnimationId: (id: string | null) => void;
}


export function useSendMessage({
                                   conversationId,
                                   setConversationId,
                                   t,
                                   setMessages,
                                   setPendingAnimationId,
                               }: UseSendMessageParams) {

    const onSuccess = (data:ConsoleMessage) => {
        const assistantMessage: ConsoleMessage = {
            id: createId(),
            role: "assistant",
            content: data.content,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.id);
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

        let recaptchaToken: string;
        try {
            recaptchaToken = await executeRecaptcha("sapio_console_chat");
        } catch {
            onError(ERROR_MESSAGE.FAILED_RECAPTCHA_VALIDATION)
            return
        }


        //todo fix me radu remove !
        return preloadedFetch(trimmed, conversationId!, recaptchaToken)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`${ERROR_MESSAGE.SAPIO_API_ERROR} ${response.status}`);
                }
                const data = await response.json();
                onSuccess(data);
            })
            .catch(err => {
                onError(err instanceof Error ? err.message : String(err));
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
