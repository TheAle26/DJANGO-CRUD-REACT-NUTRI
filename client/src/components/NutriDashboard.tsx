import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';

// 1. Definimos la interfaz (TypeScript rules!)
interface NutricionistaProfile {
    id: number;
    name: string;
    surname: string;
    email: string;
    license_number: string;
    telefono: string;
}

export const NutriDashboard: React.FC = () => {
    const [perfil, setPerfil] = useState<NutricionistaProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 2. Este Hook se ejecuta automáticamente apenas carga la pantalla
    useEffect(() => {
        const fetchPerfil = async () => {
            const token = localStorage.getItem('accessToken');
            
            // Si no hay token, lo pateamos de vuelta al login
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // Le pegamos a tu nuevo endpoint mandando el token en la cabecera
                const response = await apiClient.get<NutricionistaProfile>('mi-nutri-perfil/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setPerfil(response.data);
            } catch (err) {
                console.log(err)
                setError("Error al cargar el perfil. ¿La sesión expiró?");
                // Opcional: borrar el token y redirigir al login si falla
            }
        };

        fetchPerfil();
    }, [navigate]);

    // 3. Renderizado mientras carga
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
    if (!perfil) return <div style={{ padding: '20px' }}>Cargando perfil...</div>;

    // 4. Renderizado final con los datos
    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Bienvenido/a, Lic. {perfil.name} {perfil.surname}</h2>
            <hr />
            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Matrícula:</strong> {perfil.license_number || 'No registrada'}</p>
            <p><strong>Teléfono:</strong> {perfil.telefono || 'No registrado'}</p>
            
            <button 
                onClick={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/');
                }}
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};