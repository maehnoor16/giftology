export const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone: string) =>
    /^\+\d{1,3}\d{7,14}$/.test(phone);
