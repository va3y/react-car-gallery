import "@testing-library/jest-dom";
import { mswServer } from "./utils/msw";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
