export async function getAllApprovedUsers() {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    try {
        const response = await fetch(`${baseUrl}/api/users/approved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error("Erro ao buscar usuários:", response.statusText);
            return [];
        }

        const text = await response.text();
        if (!text) {
            console.warn("Resposta vazia da API /api/users");
            return [];
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Erro ao buscar ou processar usuários pendentes:", error);
        return [];
    }
}
