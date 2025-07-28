import { GET, POST } from "@/app/(private)/api/users/pending/route";

describe('Pending Users', () => {

    it('Should return 200 and an empty list if no users are found', async () => {

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual([]);
    }); //GET

    it('Should return 200 and a property role with value pending', async () => {
        const userData = {
            name: "José Vitor",
            email: "create@pr.com",
            cpf: "123.656.709-00",
            phoneNumber: "85999999999",
            linkedIn: "https://linkedin.com/in/josevitor",
            city: "Fortaleza",
        };

        const newUserRequest = {
            json: async () => userData,
        };

        await POST(newUserRequest)

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);

        const matchingUser = data.find((user) => user.email === userData.email);

        expect(matchingUser).toBeDefined();
        expect(matchingUser.role).toBe("Candidate")
        expect(matchingUser.status).toBe("Pendente");
    }); //GET

    it('Should return 200 and a list of pending users', async () => {
        const userData = {
            name: "José Vitor",
            email: "create@pendinguser.com",
            cpf: "123.656.709-00",
            phoneNumber: "85999999999",
            linkedIn: "https://linkedin.com/in/josevitor",
            city: "Fortaleza",
        };

        const newUserRequest = {
            json: async () => userData,
        };

        await POST(newUserRequest)

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);

        // Verifica se pelo menos um dos usuários retornados tem o mesmo e-mail do que foi criado
        const hasNewUser = data.find((user) => user.email === userData.email);
    }); //GET

    it('Should create a new pending user', async () => {
        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "create@uniqueuser.com",
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
    }); //POST

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
    }); //POST

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
    }); //POST

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


    }); //POST

    it('should return 409 if CPF is already used', async () => {

        const newUserRequest = {
            json: async () => ({
                name: "José Vitor",
                email: "new@email.com",
                cpf: "321.456.789-00",
                phoneNumber: "85999999999",
                linkedIn: "https://linkedin.com/in/josevitor",
                city: "Fortaleza",
            }),
        };

        await POST(newUserRequest);

        const duplicateEmailRequest = {
            json: async () => ({
                name: "Outro Nome",
                email: "email@different.com",
                cpf: "321.456.789-00",
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
            message: "CPF já está em uso",
        });


    }); //POST

});