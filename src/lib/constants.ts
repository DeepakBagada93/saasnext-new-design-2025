
export const ADMIN_EMAILS = [
    "ceo@saasnext.in",
    "deeepakbagada25@gmail.com"
];

export const isEmailAdmin = (email?: string | null) => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
};
