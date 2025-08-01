import { GET, POST } from "@/app/(private)/api/users/admin/route";


describe('Admin Users', ()=>{

    it('Should successfully create a new admin user with valid data', async () => {
        const newUserAdmin = {
            name: "José Vitor Façanha da Silva",
            email: "silva@example.com",
            cpf: "16285128731",
            phoneNumber: "85988888888",
            linkedIn: "https://linkedin.com/in/anasouza",
            city: "Fortaleza"
        }

        const newUserRequest = {
            json: async () => newUserAdmin
        }

        const response = await POST(newUserRequest)
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.message).toBe("Conta de Administrador criada com sucesso");
    }); //POST

    it('A new admin user should be created, with the role and status properties set to \'Admin\' and \'Aprovado\', respectively', async () => {

        const newUserAdmin = {
            name: "José Vitor Façanha da Silva",
            email: "facanh2a@example.com",
            cpf: "12345678900",
            phoneNumber: "85988888888",
            linkedIn: "https://linkedin.com/in/anasouza",
            city: "Fortaleza"
        }

        const newUserRequest = {
            json: async () => newUserAdmin
        }

        await POST(newUserRequest)

        const response = await GET()
        const data = await response.json()

        expect(response.status).toEqual(200)

        const matchingUser = data.find((user) => user.email === newUserAdmin.email);

        console.log(matchingUser);
        expect(matchingUser.role).toBe("Admin")
        expect(matchingUser.status).toBe("Aprovado");
    }); //GET

    it('Should not allow creating an admin user with a duplicate email', async () => {
        const duplicateUser = {
            name: "Outro Nome",
            email: "admin@example.com",
            cpf: "11122233344",
            phoneNumber: "85977777777",
            linkedIn: "https://linkedin.com/in/outro",
            city: "Sobral"
        };

        const request = {
            json: async () => duplicateUser
        };

        await POST(request)

        const secondRequest = {
            json: async () => duplicateUser
        };

        const response = await POST(secondRequest)
        const data = await response.json();

        expect(response.status).toEqual(409)
        expect(data.success).toBe(false);
        expect(data.message).toBe("E-mail já está em uso");


    }) //POST

    it('Should return error if required fields are missing', async () => {
        const incompleteUser = {
            email: "semnome@example.com"
        };

        const request = {
            json: async () => incompleteUser
        };


        const response = await POST(request);
        const data = await response.json();

        console.log(data);

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe("Dados inválidos");
    }); //POST

    it('Should reject user if CPF contains non-numeric characters', async () => {
        const userWithInvalidCPF = {
            name: "Usuário Inválido",
            email: "invalidcpf@example.com",
            cpf: "3336669991b", // inválido
            phoneNumber: "85988887777",
            linkedIn: "https://linkedin.com/in/usuarioinvalido",
            city: "Quixadá"
        };

        const request = {
            json: async () => userWithInvalidCPF
        };

        const response = await POST(request);
        const data = await response.json();

        const cpfErrorMessage = data.errors?.cpf?._errors?.[0];

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(cpfErrorMessage).toBe('O CPF deve conter apenas números')

    })//POST

    it('Should reject user if CPF does not contain exactly 11 digits', async () => {
        const userWithInvalidCPF = {
            name: "Usuário Inválido",
            email: "invalsdcpf@example.com",
            cpf: "333666999112221", // inválido
            phoneNumber: "85988887777",
            linkedIn: "https://linkedin.com/in/usuarioinvalido",
            city: "Quixadá"
        };

        const request = {
            json: async () => userWithInvalidCPF
        };

        const response = await POST(request);
        const data = await response.json();

        const cpfErrorMessage = data.errors?.cpf?._errors?.[0];

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(cpfErrorMessage).toBe('O CPF deve conter exatamente 11 números')
    })//POST

    it('Should reject phone number if it does not contain exactly 11 digits', async () => {
        const userWithInvalidPhoneNumber = {
            name: "Usuário",
            email: "invalsdcpf@example.com",
            cpf: "333444555-21", // inválido
            phoneNumber: "85988887777211221",
            linkedIn: "https://linkedin.com/in/usuarioinvalido",
            city: "Quixadá"
        };

        const request = {
            json: async () => userWithInvalidPhoneNumber
        };

        const response = await POST(request);
        const data = await response.json();

        const phoneNumberErrorMessage = data.errors?.phoneNumber?._errors?.[0];

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(phoneNumberErrorMessage).toBe('Telefone inválido')
    })
})