// src/api/client.ts
import axios from 'axios';
import type { TokenResponse } from '../types/auth';

// Create a base instance
export const apiClient = axios.create({
    baseURL: 'http://localhost:8000/nutri_api/', // Change this when you deploy!
    headers: {
        'Content-Type': 'application/json',
    },
});

// A dedicated function for logging in (body key must match User.USERNAME_FIELD → "email")
export const login = async (email: string, password: string) => {
    const response = await apiClient.post<TokenResponse>('token/', {
        email,
        password,
    });
    
    // Save tokens to localStorage automatically
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    return response.data;
};
