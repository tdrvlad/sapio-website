import { useState, useRef, useEffect } from "react";
import { useRecaptchaV3 } from "@/components/GoogleRecaptchaV3";
import SapioConfig from "@/lib/sapioConfig";
import { ConsoleMessage } from "@/types/chat";
import createId from "@/lib/IdGenerator";


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
    const [isThinking, setIsThinking] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // recaptcha hook
    const { executeRecaptcha, isLoaded: isRecaptchaLoaded } = useRecaptchaV3(SapioConfig.SAPIO_RECAPTCHA_SITE_KEY);

    const sendMessage = async (text: string) => {

        if (!text.trim() || isThinking) return;

        setIsThinking(true);

        const trimmed = text.trim();

        // Push user message
        const userMessage: ConsoleMessage = {
            id: createId(),
            role: "user",
            content: trimmed,
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            if (!isRecaptchaLoaded) {
                throw new Error("Security verification not ready yet. Please wait.");
            }

            let recaptchaToken: string;
            try {
                recaptchaToken = await executeRecaptcha("sapio_console_chat");
            } catch {
                throw new Error("Failed to verify you are human. Please refresh the page and try again.");
            }

            const response = await fetch(`${SapioConfig.SAPIO_API_URL}/widget/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${SapioConfig.SAPIO_WIDGET_API_KEY}`,
                },
                body: JSON.stringify({
                    message: trimmed,
                    conversation_id: conversationId,
                    recaptcha_token: recaptchaToken,
                }),
            });

            if (!response.ok) {
                throw new Error(`Sapio API error: ${response.status}`);
            }

            const data = await response.json();

            const assistantMessage: ConsoleMessage = {
                id: createId(),
                role: "assistant",
                content: data.response,
            };

            setMessages(prev => [...prev, assistantMessage]);
            setConversationId(data.conversation_id);
            setPendingAnimationId(assistantMessage.id);
        } catch (err) {
            console.error(err);
            const errorMessage: ConsoleMessage = {
                id: createId(),
                role: "assistant",
                content: t("home.sapioConsole.errorMessage"),
                tone: "error",
            };
            setMessages(prev => [...prev, errorMessage]);
            setPendingAnimationId(errorMessage.id);
        } finally {
            setIsThinking(false);
            inputRef.current?.focus();
        }
    };

    return {
        sendMessage,
        isThinking,
        inputRef,
    };
}
