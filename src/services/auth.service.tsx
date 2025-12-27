import { LoginBody, RegisterBody } from "@/types/auth.type";
import API from "@/utils/axios"

interface IAuth {
    login (data: LoginBody): Promise<any>
    register (data: RegisterBody): Promise<any>
    logout (): Promise<any>
    refreshToken (): Promise<any>
}

class Auth implements IAuth {
    
    login (data: LoginBody) {
        return API.post('/authorization/login', data)
    }

    register (data: RegisterBody) {
        return API.post('authorization/register', data)
    }

    logout () {
        return API.delete('authorization/logout')
    }

    refreshToken () {
        return API.put('authorization/refresh_token')
    }
}

export const AuthSevices = new Auth()