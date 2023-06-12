interface userData {
    id: string,
    username: string,
    email: string,
    phone: string
}

interface LoginRequest {
    password: string;
    email: string;
}

export { userData, LoginRequest };
