import { GET, POST } from "@/app/(private)/api/company/route";


describe('Companies API', () => {

    it('Should return 200 and an empty list if no users are found', async () => {

            const response = await GET();
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual([]);
        })//GET
    it("Should return 200 and a list of companies", async () => {

            const companyData = {
                cnpj : "22.230.202/0000-06",
                legalName : "Teste Company",
                tradeName: "Service"
            };

            const newCompanyRequest = {
                json: async () => companyData,
            };

            await POST(newCompanyRequest)

            const response = await GET();

            expect(response.status).toBe(200);
        });//POST E GET

    it('Should create a company and return 201', async () => {
            const newCompanyRequest = {
                json : async () => ({
                    cnpj: "00.000.000/0000-00",
                    legalName: "Empresa Teste",
                    tradeName: "Empresa T",
                })
            }

            const response = await POST(newCompanyRequest)
            const responseData = await response.json();

            expect(response.status).toBe(201);
            expect(responseData.success).toBe(true);
            expect(responseData.message).toBe("Empresa criada com sucesso!");
        })//POST

    it('Should return 400 if validation fails', async () => {
            const newCompanyRequest = {
                json : async () => ({
                    address: "Rua X",
                    businessSector: "Tecnologia",
                    city: "São Paulo",
                    companySize: "Média",
                    legalName: "Empresa Teste",
                    site: "https://empresa.com",
                    tradeName: "Empresa T",
                    users: [],
                })
            }

            const response = await POST(newCompanyRequest);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.success).toBe(false);
            expect(data.message).toBe("Dados inválidos");
        })//POST
})