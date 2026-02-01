function decodePayload(encoded: string) {
    try {
        return JSON.parse(atob(encoded))
    } catch {
        return null
    }
}

const params = new URLSearchParams(window.location.search)
const encoded = params.get("data")

    ; (window as any).__EMBED_DATA__ = encoded
        ? decodePayload(encoded)
        : null
