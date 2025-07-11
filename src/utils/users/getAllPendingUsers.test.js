import { getAllPendingUsers } from "@/utils/users/getAllPendingUsers";

describe('Get All Pending Users', () => {

    it('Should return an Array', async () => {
        const pendingArray = await getAllPendingUsers();
        expect(Array.isArray(pendingArray)).toBe(true);
    });

    it('Should return Something', async () => {
        const pendingArray = await getAllPendingUsers();
        expect(pendingArray.length).toBe(1);//Isso muda de acordo com a quantidade de regsitro no banco de dados
    });

    it('Should return an empty array when there are no pending users', async () => {
        const users = await getAllPendingUsers();
        expect(users).toEqual([]);//Esse teste só vai passar se tiver os registro zerados no banco de dados
    });

    it('Should return data as an array of objects', async () => {
        const users = await getAllPendingUsers();
        expect(users.every(user => typeof user === 'object')).toBe(true);
    });


    it('Each user should have all expected properties', async () => {
        const users = await getAllPendingUsers();

        users.forEach(user => {
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('cpf');
            expect(user).toHaveProperty('city');
            expect(user).toHaveProperty('phoneNumber');
            expect(user).toHaveProperty('linkedIn');
            expect(user).toHaveProperty('role');
            expect(user).toHaveProperty('status');
        });
    });
});