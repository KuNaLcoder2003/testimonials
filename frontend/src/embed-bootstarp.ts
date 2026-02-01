function decodePayload(encoded: string) {
    try {
        return JSON.parse(atob(encoded))
    } catch {
        return null
    }
}

const params = new URLSearchParams(window.location.search)
const encoded = params.get("data") as string;
(window as any).__EMBED_DATA__ = encoded ? decodePayload(encoded) : null
console.log("BOOTSTRAP DATA:", (window as any).__EMBED_DATA__)
