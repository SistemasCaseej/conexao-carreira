import { POST } from "@/app/(private)/api/users/pending/route";

describe('Pending Users', () => {

    it('Should create a new pending user', async () => {
        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "create@pendinguser.com",
                cpf: "123.456.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
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
            }),
        };

        const response = await POST(newUserRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.success).toBe(false);
        expect(json.message).toMatch("Dados inválidos");
    });

    it('should return 409 if email is already used', async () => {

        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "email@exists.com",
                cpf: "123.456.759-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
            }),
        };

        await POST(newUserRequest);

        const duplicateEmailRequest = {
            json: async () => ({
                name: "Outro Nome",
                email: "email@exists.com",
                cpf: "987.654.321-00",
                phoneNumber: "85988888888",
                linkedIn: "https://linkedin.com/in/outro",
                city: "Fortaleza",
            }),
        };

        const response = await POST(duplicateEmailRequest);
        const json = await response.json();

        expect(response.status).toBe(409);
        expect(json).toEqual({
            success: false,
            message: "E-mail já está em uso",
        });


    });

    it('should return 409 if CPF is already used', async () => {

        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "new@email.com",
                cpf: "123.456.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
            }),
        };

        await POST(newUserRequest);

        const response = await POST(newUserRequest);
        const json = await response.json();

        expect(response.status).toBe(409);
        expect(json).toEqual({
            success: false,
            message: "CPF já está em uso",
        });


    });

});