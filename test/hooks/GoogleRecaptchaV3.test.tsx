import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useRecaptchaV3 } from "../../src/hooks/GoogleRecaptchaV3";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void;
            execute: (key: string, opts: { action: string }) => Promise<string>;
        };
    }
}

describe("useRecaptchaV3", () => {
    let originalGrecaptcha: any;
    let appendSpy: any;

    beforeEach(() => {
        originalGrecaptcha = window.grecaptcha;
        window.grecaptcha = undefined;

        // Mock script append
        appendSpy = vi.spyOn(document.head, "appendChild");
    });

    afterEach(() => {
        window.grecaptcha = originalGrecaptcha;
        appendSpy.mockRestore();
        vi.restoreAllMocks();
    });

    // ----------------------------------------------------------
    // SSR edge case: window undefined
    // ----------------------------------------------------------
    it("does nothing when running on SSR (window undefined)", () => {
        const originalWindow = global.window;
        // @ts-ignore
        delete global.window;

        const { result } = renderHook(() => useRecaptchaV3("SITE_KEY_123"));
        expect(result.current.isLoaded).toBe(false);

        global.window = originalWindow;
    });

    // // ----------------------------------------------------------
    // // Edge: no siteKey provided
    // // ----------------------------------------------------------
    // it("does not append script if siteKey is empty", () => {
    //     renderHook(() => useRecaptchaV3(""));
    //     expect(appendSpy).not.toHaveBeenCalled();
    // });
    //
    // // ----------------------------------------------------------
    // // Edge: script should append once even with re-renders
    // // ----------------------------------------------------------
    // it("appends script only once even on re-renders", () => {
    //     const { rerender } = renderHook(({ key }) => useRecaptchaV3(key), {
    //         initialProps: { key: "ABC" }
    //     });
    //
    //     expect(appendSpy).toHaveBeenCalledTimes(1);
    //
    //     rerender({ key: "ABC" });
    //     expect(appendSpy).toHaveBeenCalledTimes(1);
    // });
    //
    // // ----------------------------------------------------------
    // // If grecaptcha already exists on window, script is NOT appended
    // // ----------------------------------------------------------
    // it("does not append script if grecaptcha already exists", () => {
    //     window.grecaptcha = {
    //         ready: vi.fn((cb) => cb()),
    //         execute: vi.fn()
    //     };
    //
    //     renderHook(() => useRecaptchaV3("ABCDE"));
    //
    //     expect(appendSpy).not.toHaveBeenCalled();
    // });
    //
    // // ----------------------------------------------------------
    // // When script loads, hook sets isLoaded=true
    // // ----------------------------------------------------------
    // it("sets isLoaded to true once grecaptcha.ready fires", async () => {
    //     let readyCallback: (() => void) | null = null;
    //
    //     window.grecaptcha = {
    //         ready: vi.fn((cb) => {
    //             readyCallback = cb;
    //         }),
    //         execute: vi.fn()
    //     };
    //
    //     const { result } = renderHook(() => useRecaptchaV3("SITE_KEY"));
    //
    //     expect(result.current.isLoaded).toBe(false);
    //
    //     act(() => {
    //         readyCallback?.();
    //     });
    //
    //     expect(result.current.isLoaded).toBe(true);
    // });
    //
    // // ----------------------------------------------------------
    // // executeRecaptcha throws if no siteKey
    // // ----------------------------------------------------------
    // it("executeRecaptcha throws if siteKey is missing", async () => {
    //     const { result } = renderHook(() => useRecaptchaV3(""));
    //
    //     await expect(result.current.executeRecaptcha("test"))
    //         .rejects.toThrow("Missing reCAPTCHA site key");
    // });
    //
    // // ----------------------------------------------------------
    // // executeRecaptcha throws if grecaptcha is not initialized
    // // ----------------------------------------------------------
    // it("executeRecaptcha throws if grecaptcha is missing", async () => {
    //     const { result } = renderHook(() => useRecaptchaV3("SITE_KEY"));
    //
    //     await expect(result.current.executeRecaptcha("login"))
    //         .rejects.toThrow("reCAPTCHA not initialized");
    // });
    //
    // // ----------------------------------------------------------
    // // executeRecaptcha returns token from grecaptcha.execute
    // // ----------------------------------------------------------
    // it("executeRecaptcha returns token when initialized", async () => {
    //     window.grecaptcha = {
    //         ready: (cb) => cb(),
    //         execute: vi.fn().mockResolvedValue("TOKEN_ABC")
    //     };
    //
    //     const { result } = renderHook(() => useRecaptchaV3("SITE_KEY"));
    //
    //     const token = await result.current.executeRecaptcha("submit");
    //
    //     expect(token).toBe("TOKEN_ABC");
    //     expect(window.grecaptcha.execute).toHaveBeenCalledWith("SITE_KEY", {
    //         action: "submit"
    //     });
    // });
    //
    // // ----------------------------------------------------------
    // // Multiple calls to executeRecaptcha should always use the same callback
    // // ----------------------------------------------------------
    // it("executeRecaptcha is stable across renders (memoized)", async () => {
    //     window.grecaptcha = {
    //         ready: (cb) => cb(),
    //         execute: vi.fn().mockResolvedValue("TOKEN")
    //     };
    //
    //     const { result, rerender } = renderHook(
    //         ({ key }) => useRecaptchaV3(key),
    //         { initialProps: { key: "KEY123" } }
    //     );
    //
    //     const firstFn = result.current.executeRecaptcha;
    //
    //     rerender({ key: "KEY123" });
    //
    //     expect(result.current.executeRecaptcha).toBe(firstFn);
    // });
});
