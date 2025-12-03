import ProcessEnv = NodeJS.ProcessEnv;

const _env: ProcessEnv = process.env
const SapioConfig = {
    SAPIO_WIDGET_API_KEY: _env.NEXT_PUBLIC_WIDGET_API_KEY!,
    SAPIO_RECAPTCHA_SITE_KEY: _env.NEXT_PUBLIC_WIDGET_RECAPTCHA_KEY!,
    SAPIO_API_URL: _env.NEXT_PUBLIC_SAPIO_ASSISTANT_URL!,
    PUBLIC_SITE: _env.NEXT_PUBLIC_SITE_URL!,
    ENV: _env.NODE_ENV,


    isLocal(): boolean {
        return this.ENV === "development"
    }
};

export default SapioConfig


