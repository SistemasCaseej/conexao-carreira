
export async function getAllPendingUsers() {

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/users`);
    return await response.json();
}