import { createPendingUser, getAllPendingUsers} from "/src/services/userService";

jest.mock('/src/services/userService', () => ({
    getAllPendingUsers: jest.fn(),
    createPendingUser: jest.fn(),
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
    });//getAllPendingUsers

    it('Should return one user', async () => {

        const mockData = [{ id: 1, name: 'José' }];

        (getAllPendingUsers).mockResolvedValue(mockData);

        const pendingArray = await getAllPendingUsers();
        expect(pendingArray.length).toBe(1);
    });//getAllPendingUsers

    it('Should return an empty array when there are no pending users', async () => {

        const mockData = [];
        (getAllPendingUsers).mockResolvedValue(mockData);

        const emptyArray = await getAllPendingUsers();
        expect(emptyArray).toEqual([]);
    });//getAllPendingUsers

    it('Should return data as an array of objects', async () => {
        const mockData = [{ id: 1, name: 'José' }];

        (getAllPendingUsers).mockResolvedValue(mockData);

        const users = await getAllPendingUsers();

        expect(users.every(user => typeof user === 'object')).toBe(true);
    });//getAllPendingUsers

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
    });//getAllPendingUsers

    it('Should create a new pending user successfully', async () => {
        const newUser = {
            name: 'Maria',
            email: 'maria@example.com',
            cpf: '12345678900',
            city: 'São Paulo',
            phoneNumber: '11999999999',
            linkedIn: 'https://linkedin.com/in/maria',
            role: 'Estudante',
            status: 'Pending'
        };

        const mockResponse = {
            success: true,
            message: "Conta criada com sucesso",
        };

        (createPendingUser).mockResolvedValue(mockResponse);

        const createdUser = await createPendingUser(newUser);

        expect(createPendingUser).toHaveBeenCalledWith(newUser);
        expect(createdUser).toHaveProperty('success');
        expect(createdUser).toHaveProperty('message');
        expect(createdUser.success).toBe(true);
        expect(createdUser.message).toBe("Conta criada com sucesso");

    });//createPendingUser
});