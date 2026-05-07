const API_URL = 'https://dummyjson.com/auth';

export interface AuthUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    token: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 30,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Usuario o contraseña incorrectos');
    }

    const data = await res.json();
    return {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image,
        token: data.token,
    };
};

export const getUserProfile = async (token: string): Promise<AuthUser> => {
    const res = await fetch(`${API_URL}/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
        throw new Error('Error al obtener perfil');
    }

    return await res.json();
};
