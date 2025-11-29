export const ERROR_MESSAGE = {
    RECAPTCHA_NOT_READY: "Security verification not ready yet. Please wait.",
    FAILED_RECAPTCHA_VALIDATION: "Failed to verify you are human. Please refresh the page and try again.",
    SAPIO_API_ERROR: "Sapio API error:"
} as const;

export type ErrorMessage = typeof ERROR_MESSAGE;

export default ERROR_MESSAGE;
