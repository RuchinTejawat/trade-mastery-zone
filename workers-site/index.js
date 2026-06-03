import { getAssetFromKV, mapRequestToAsset } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event, { mapRequestToAsset });
  } catch (error) {
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: (request) =>
          new Request(`${new URL(request.url).origin}/index.html`, request),
      });
    } catch (fallbackError) {
      return new Response("Not found", { status: 404 });
    }
  }
}
