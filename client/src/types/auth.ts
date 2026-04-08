// src/types/auth.ts

export interface TokenResponse {
    access: string;
    refresh: string;
}

export interface LoginError {
    detail?: string;
}

