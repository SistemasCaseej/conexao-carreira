import { GET } from "@/app/(private)/api/users/approved/route";
import {POST} from "@/app/(private)/api/users/pending/route";

describe('Approved users', () => {

    it('Should return 200 and an empty list if no users are found', async () => {

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual([]);
    })//GET

})