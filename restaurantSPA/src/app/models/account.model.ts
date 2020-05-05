export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    token: string;
    email: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    repeatPass: string;
}

export interface RegisterResponse {
    
}