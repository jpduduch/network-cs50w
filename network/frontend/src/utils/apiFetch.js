import getCSRFToken from './csrf';

function apiFetch(url, method = 'GET', body = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
}

export default apiFetch;
