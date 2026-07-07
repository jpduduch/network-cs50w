import getCSRFToken from "./csrf";

function apiPOST(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        body: body ? JSON.stringify(body) : undefined
    })
}

export default apiPOST