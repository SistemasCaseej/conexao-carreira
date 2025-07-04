import { http } from 'msw';


const mockedUsers = [
    { id: 1, name: 'John Doe', status: 'pending' },
    { id: 2, name: 'Jane Smith', status: 'pending' },
];

export const handlers = [
    http.get('/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockedUsers)
        )
    }),
];