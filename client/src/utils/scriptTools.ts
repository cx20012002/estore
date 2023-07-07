export const getRouter = () => require('../router/Routes').router;

export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
    return '$' + (amount/100).toFixed(2);
}

// a function to keep the letters before @ and first letter capital
export function getUserName(email: string) {
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
}