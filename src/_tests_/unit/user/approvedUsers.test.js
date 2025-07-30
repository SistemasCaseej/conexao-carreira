import {getAllApprovedUsers, getAllPendingUsers} from "@/services/userService";

jest.mock('/src/services/userService', () => ({
    getAllApprovedUsers: jest.fn(),
}));


describe('Approved users', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return an array with an approved user', async () => {

        const mockData = [{ id: 1, name: 'José' , status: "Aprovado" }];

        (getAllApprovedUsers).mockResolvedValue(mockData);

        const result = await getAllApprovedUsers();

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual(mockData);
        expect(mockData.length).toBe(1);
    });//getAllApprovedUsers

    it('Should return an empty array when there are no approved users', async () => {

        const mockData = [];

        (getAllApprovedUsers).mockResolvedValue(mockData);

        const emptyArray = await getAllApprovedUsers();
        expect(emptyArray).toEqual([]);
    });//getAllApprovedUsers

    it('Each approved user should have all expected properties', async () => {
        const mockData = [{
            name: 'José',
            email: 'jvito@gmail.com',
            cpf: '122222121',
            city: 'Rio de Janeiro',
            phoneNumber: '1234567890',
            linkedIn: 'g1.com',
            role: 'Candidate',
            status: 'Aprovado',
        }];

        (getAllApprovedUsers).mockResolvedValue(mockData);

        const users = await getAllApprovedUsers();

        expect(getAllApprovedUsers).toHaveBeenCalled();

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);

        const expectedProperties = [
            'name',
            'email',
            'cpf',
            'city',
            'phoneNumber',
            'linkedIn',
            'role',
            'status',
        ];

        users.forEach(user => {
            expectedProperties.forEach(prop => {
                expect(user).toHaveProperty(prop);
            });
        });
    });//getAllApprovedUsers

})