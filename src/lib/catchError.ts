/**
 * Wraps a promise and returns a tuple containing either an error or the resolved data,
 * similar to Node.js-style `[error, result]` handling.
 *
 * ## Behavior
 * - On **success**, returns:
 *   `[undefined, data]`
 *
 * - On **expected/whitelisted errors**, returns:
 *   `[error, undefined]`
 *
 * - On **unexpected errors**, the error is rethrown.
 *
 * ## Parameters
 * @param promise
 * The promise to resolve. Its resolved value becomes the `data` element of the tuple.
 *
 * @param errorsToCatch
 * Optional array of `Error` constructors.
 * If supplied, only errors that are instances of these constructors will be caught.
 * Any other error will be rethrown.
 *
 * ## Returns
 * A Promise resolving to a tuple:
 * - `[undefined, T]` when the promise resolves successfully
 * - `[InstanceType<E>, undefined]` when the promise rejects with a *specified* error
 *
 * ## Example
 * ```ts
 * const [err, data] = await catchError(fetchUser(), [NotFoundError]);
 *
 * if (err) {
 *   // Handle expected error
 *   console.error("Known error:", err);
 *   return;
 * }
 *
 * console.log("User:", data);
 * ```
 */
function catchError<
    T,
    E extends new (message?: string) => Error
>(
    promise: Promise<T>,
    errorsToCatch?: E[]
): Promise<[InstanceType<E> | undefined, T | undefined]> {
    return promise
        .then((data) => {
            return [undefined, data] as [undefined, T];
        })
        .catch((error) => {
            if (errorsToCatch === undefined) {
                return [error, undefined] as [InstanceType<E>, undefined];
            }
            if (errorsToCatch.some((e) => error instanceof e)) {
                return [error, undefined] as [InstanceType<E>, undefined];
            }
            throw error;
        });
}
export default catchError
