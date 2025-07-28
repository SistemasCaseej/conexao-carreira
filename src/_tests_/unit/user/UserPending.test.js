import { getAllPendingUsers } from "/src/services/userService";

jest.mock('/src/services/userService', () => ({
    getAllPendingUsers: jest.fn(),
}));

describe('Pending users', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return an Array', async () => {

        const mockData = [{ id: 1, name: 'José' }];

        (getAllPendingUsers).mockResolvedValue(mockData);

        const result = await getAllPendingUsers();

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual(mockData);
    });

    it('Should return one user', async () => {

        const mockData = [{ id: 1, name: 'José' }];

        (getAllPendingUsers).mockResolvedValue(mockData);

        const pendingArray = await getAllPendingUsers();
        expect(pendingArray.length).toBe(1);
    });

    it('Should return an empty array when there are no pending users', async () => {

        const mockData = [];
        (getAllPendingUsers).mockResolvedValue(mockData);

        const emptyArray = await getAllPendingUsers();
        expect(emptyArray).toEqual([]);
    });

    it('Should return data as an array of objects', async () => {
        const mockData = [{ id: 1, name: 'José' }];

        (getAllPendingUsers).mockResolvedValue(mockData);

        const users = await getAllPendingUsers();

        expect(users.every(user => typeof user === 'object')).toBe(true);
    });

    it('Each user should have all expected properties', async () => {
        const mockData = [{
            name: 'José' , email: 'jvito@gmail.com' , cpf: '122222121', city: "Rio de Janeiro",
            phoneNumber: '1234567890', linkedIn: 'g1.com', role: "Estudante", status: "Pending"
        }];

        (getAllPendingUsers).mockResolvedValue(mockData);

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