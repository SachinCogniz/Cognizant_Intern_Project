import api from './api';
export const login = async (credentials) => {
 return await api.post('/auth/login', credentials);
};
export const register = async (user) => {
 return await api.post('/auth/register', user);
};