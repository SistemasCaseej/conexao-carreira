import {GET, POST} from "@/app/(private)/api/users/pending/route";


describe('Pending Users', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should create a new pending user', async () => {
        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "jose@example.com",
                cpf: "123.456.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
                password: "12345678",
                confirmPassword: "12345678",
            }),
        };

        const response = await POST(newUserRequest);
        const json = await response.json();

        expect(response.status).toBe(201);
        expect(json.success).toBe(true);
        expect(json.message).toBe("Conta criada com sucesso");
        expect(json.data).toHaveProperty("userId");
    });

    it('Should return 400 if required fields are missing', async () => {
        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                cpf: "123.456.789-00",
                // email is missing
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
                password: "12345678",
                confirmPassword: "12345678",
            }),
        };

        const response = await POST(newUserRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.success).toBe(false);
        expect(json.message).toMatch("Dados inválidos");
    });

    it('Should return 400 if email is invalid', async () => {
        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "invalid-email",
                cpf: "123.456.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
                password: "12345678",
                confirmPassword: "12345678",
            }),
        };

        const response = await POST(newUserRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.success).toBe(false);
        expect(json.message).toMatch("Dados inválidos");
    });

    it('Should return one pending user', async () => {

        const newUserRequest = {
            json: async () => ({
                name: "Maria",
                email: "maria@example.com",
                cpf: "123.422.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
                password: "12345678",
                confirmPassword: "12345678",
            }),
        };

        const postResponse = await POST(newUserRequest);
        expect(postResponse.status).toBe(201);

        const response = await GET();
        const users = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(users)).toBe(true);
        expect(users).toHaveLength(1);

        expect(users[0]).toEqual(
            expect.objectContaining({
                name: "Maria",
                email: "maria@example.com"
            })
        )
    })
});