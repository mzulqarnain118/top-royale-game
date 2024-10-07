// api.js
import axios from 'axios';

export const SERVER_URL = 'http://192.168.100.40:5000';
export const API_URL = `${SERVER_URL}/api`; // Replace with your backend URL
export const API_AUTH_URL = `${API_URL}/auth`;

export const signup = async (username: string, email: string, password: string) => {
  return await axios.post(`${API_AUTH_URL}/register`, { username, email, password });
};

export const signuptaproyale = async (username: string, country: string) => {
  return await axios.post(`${API_AUTH_URL}/registertaproyale`, { username, country });
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_AUTH_URL}/login`, { email, password });
};
