// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { login } from '../api/client';
import { AxiosError } from 'axios';
import type { LoginError } from '../types/auth';
import { useNavigate } from "react-router-dom";


export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the page from refreshing
        setError(null);
        setIsLoading(true);

        try {
            await login(email, password);
            console.log("Success! Tokens are in localStorage.");
            navigate('/dashboard/');
            
        } catch (err) {
            const axiosError = err as AxiosError<LoginError>;
            // DRF usually sends error details in the 'detail' key
            setError(axiosError.response?.data?.detail || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Iniciar Sesión</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px' }}>
                    {isLoading ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};