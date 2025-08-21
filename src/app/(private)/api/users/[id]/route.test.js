import { DELETE, GET } from "@/app/(private)/api/users/[id]/route"
import { POST } from "@/app/(private)/api/users/pending/route";

describe('Specific user', () => {

    describe('DELETE /api/users/users', () => {
        it('Should return 400 if no id is provided', async () => {
            const response = await DELETE(null, { params: {} });
            const body = await response.json();

            expect(response.status).toBe(400);
            expect(body.success).toBe(false);
            expect(body.error).toBe("ID document is required.");
        });//DELETE

        it('Should delete the user and return 200', async () => {

            const newUserRequest = {
                json: async () => ({
                    name: "leuge",
                    email: "leuge@exists.com",
                    cpf: "231.313.902-31",
                    phoneNumber: "85999999999",
                    linkedIn: "https://linkedin.com/in/josevitor",
                    city: "Macaé",
                }),
            };

            const responseCreateUser = await POST(newUserRequest);
            const bodyCreateUser = await responseCreateUser.json();

            const documentId = bodyCreateUser.data.userId;

            const responseDeleteUser = await DELETE(null, { params: { id: documentId } });
            const bodyDeleteUser = await responseDeleteUser.json();

            expect(responseDeleteUser.status).toBe(200);
            expect(bodyDeleteUser.success).toBe(true);
            expect(bodyDeleteUser.message).toBe("User deleted successfully.");
        }) //DELETE & POST
    })

    describe('GET /api/users/users', () => {

        it('Should return 400 if no id is provided', async () => {
            const response = await GET(null, { params: {} });
            const body = await response.json();

            expect(response.status).toBe(400);
            expect(body.success).toBe(false);
            expect(body.error).toBe("No such document id");
        });//GET

        it('Should return 200 and one specific user', async () => {

            const newUserRequest = {
                json: async () => ({
                    name: "Ciair",
                    email: "ciair@exists.com",
                    cpf: "758.411.890-93",
                    phoneNumber: "85999999999",
                    linkedIn: "https://linkedin.com/in/josevitor",
                    city: "Macaé",
                }),
            };

            const responseCreateUser = await POST(newUserRequest);
            const bodyCreateUser = await responseCreateUser.json();

            const response = await GET(null, { params: { id: bodyCreateUser.data.userId } });
            const body = await response.json();

            expect(response.status).toBe(200);
            expect(body.success).toBe(true);

        })//GET
    })

})