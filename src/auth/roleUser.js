export default function roleUser() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jeton) {
        return { "role": user.role };
    } else {
        return {};
    }
}