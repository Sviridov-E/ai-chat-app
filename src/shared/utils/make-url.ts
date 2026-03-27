import { API_URL } from "../api/config";

export const makeUrl = (path: string) => `${API_URL}${path}`;
