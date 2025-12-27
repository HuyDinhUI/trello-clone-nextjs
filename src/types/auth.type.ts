export interface LoginBody {
    email: string
    password: string
}

export interface RegisterBody extends LoginBody {
    username: string
    confirmPassword: string
}