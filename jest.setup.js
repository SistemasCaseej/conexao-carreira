console.log("Teste console.wwlog");

import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import { server } from '@/app/mocks/server'
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder


beforeAll(()=> server.listen());

afterEach(()=> server.resetHandlers());

afterAll(()=> server.close());