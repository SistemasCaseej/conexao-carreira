import { getAllPendingUsers } from "@/utils/users/getAllPendingUsers";

describe('FetchPendingUsers', () => {

    it('Should return an Array', async () => {
        const pendingArray = await getAllPendingUsers();
        expect(Array.isArray(pendingArray)).toBe(true);
    });

    it('Should return Something', async () => {
        const pendingArray = await getAllPendingUsers();
        expect(pendingArray.length).toBe(0);
    });
});