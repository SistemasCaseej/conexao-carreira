import {randomBytes} from "crypto";

export function generateSecurePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|";
    const buffer = randomBytes(length);
    return Array.from(buffer)
        .map(b => charset[b % charset.length])
        .join('');
}
