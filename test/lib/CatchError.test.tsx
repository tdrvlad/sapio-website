import { describe, it, expect } from "@jest/globals";
import catchError from "../../src/lib/catchError";

class TestError extends Error {}
class AnotherError extends Error {}

describe("catchError (table-driven)", () => {
    it.each([
        {
            name: "returns [undefined, data] on success",
            input: () => catchError(Promise.resolve(42), [TestError]),
            expected: [undefined, 42],
        },
        {
            name: "catches an expected error",
            input: () => catchError(Promise.reject(new TestError("boom")), [TestError]),
            expectedInstanceOf: TestError,
        },
        {
            name: "catches any error when no errorsToCatch is provided",
            input: () => catchError(Promise.reject(new Error("generic"))),
            expectedInstanceOf: Error,
        },
        {
            name: "catches any of multiple allowed error types",
            input: () =>
                catchError(
                    Promise.reject(new AnotherError("boom")),
                    [TestError, AnotherError]
                ),
            expectedInstanceOf: AnotherError,
        },
        {
            name: "returns correct tuple types (undefined, data)",
            input: () => catchError(Promise.resolve("ok")),
            expected: [undefined, "ok"],
        },
        {
            name: "returns correct tuple types (error, undefined)",
            input: () => catchError(Promise.reject(new TestError("x")), [TestError]),
            expectedInstanceOf: TestError,
        },
    ])("$name", async ({ input, expected, expectedInstanceOf }) => {
        if (expected) {
            const result = await input();
            expect(result).toEqual(expected);
        } else if (expectedInstanceOf) {
            const [err, val] = await input();
            expect(err).toBeInstanceOf(expectedInstanceOf);
            expect(val).toBeUndefined();
        }
    });

    it.each([
        {
            name: "does NOT catch error not in errorsToCatch",
            executor: () =>
                catchError(
                    Promise.reject(new AnotherError("unexpected")),
                    [TestError]
                ),
            expectedError: AnotherError,
        },
        {
            name: "does NOT catch errors when errorsToCatch is an empty array",
            executor: () =>
                catchError(
                    Promise.reject(new TestError("should rethrow")),
                    []
                ),
            expectedError: TestError,
        },
    ])("$name", async ({ executor, expectedError }) => {
        await expect(executor()).rejects.toThrow(expectedError);
    });
});
