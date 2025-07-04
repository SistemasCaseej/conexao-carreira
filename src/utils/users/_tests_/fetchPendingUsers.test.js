import { server } from "../../../app/mocks/server";
import { http } from "msw"
import { getAllPendingUsers } from "../PendingUsersList"

describe('fetchPendingUsers', ()=> {
    it('should return something', async () => {
        const pendingArray = await getAllPendingUsers();
        expect(pendingArray.length).toBe(1);
    });
})