function getCSRFToken() {
    // utils/csrf.js
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));

    // If cookie is found, split in two by the = sign and gets the latter part. Else, return null.
    return cookie ? cookie.split('=')[1] : null;
}

export default getCSRFToken;
