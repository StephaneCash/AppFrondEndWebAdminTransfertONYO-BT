export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jeton) {
        return { "authorization": 'Bearer ' + user.jeton };
    } else {
        return {};
    }
}