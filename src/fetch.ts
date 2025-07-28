import { deepMapOnKey } from "./util";
import { patchAvatar, patchDisplayName } from "./patcher";

const OUT_OF_SCOPE_API: ReadonlyArray<string> = [
  // login info
  "/com.atproto.server.getSession",

  // feed info and name
  "/app.bsky.feed.getFeedGenerators",

  // current user's profile
  "/app.bsky.actor.getProfiles",
  "/app.bsky.unspecced.getConfig",
];

const originalFetch: typeof fetch = unsafeWindow.fetch;

/**
 * Patches the window.fetch API and modifies its response
 * @param args - The arguments passed to the original fetch function
 * @returns A modified Response object
 */
async function patchedFetch(
  ...args: Parameters<typeof fetch>
): Promise<Response> {
  if ((originalFetch as any).patched) {
    throw new Error("already patched");
  }
  // Optionally inspect the arguments (URL, options)
  const response: Response = await originalFetch.apply(unsafeWindow, args);

  // Clone and modify the response here
  const cloned = response.clone();
  const { url } = cloned;
  console.debug(`fetched: ${url}`);

  if (!url.includes("/xrpc/")) {
    console.debug(`${url} isn't a xrpc, skip patching`);
    return response;
  }

  if (OUT_OF_SCOPE_API.some((api) => url.includes(api))) {
    console.debug(`${url} isn't a candidate API, skip patching`);
    return response;
  }

  const text = await cloned.text();

  // Example: Modify response text (say, inject extra data into JSON)
  let data: Record<string, any>;
  try {
    data = JSON.parse(text);
    data = await deepMapOnKey(data, "avatar", patchAvatar);
    data = await deepMapOnKey(data, "displayName", patchDisplayName);
    data.injected = true; // Modify the response
    console.debug(`patched data of ${url}: ${JSON.stringify(data)}`);
  } catch (e: unknown) {
    // Not JSON; return as-is
    console.warn(e);
    return response;
  }

  // Create and return a new response
  const modified: Response = new Response(JSON.stringify(data), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  return modified;
}

patchedFetch.patched = true;

export { patchedFetch };
