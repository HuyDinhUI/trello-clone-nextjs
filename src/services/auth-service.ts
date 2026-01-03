import { LoginBody, RegisterBody } from "@/types/auth.type";
import API from "@/utils/axios"
import axios from "axios";

interface IAuth {
    login (data: LoginBody): Promise<any>
    register (data: RegisterBody): Promise<any>
    logout (): Promise<any>
    refreshToken (refreshToken: string): Promise<any>
    setCookie (data: any): Promise<any>
}

class Auth implements IAuth {
    
    login (data: LoginBody) {
        return API.post('/authorization/login', data)
    }

    register (data: RegisterBody) {
        return API.post('authorization/register', data)
    }

    logout () {
        return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_NEXTJS}/api/auth/removeCookie`)
    }

    refreshToken () {
        return axios.put(`${process.env.NEXT_PUBLIC_SERVER_NEXTJS}/api/auth/refreshToken`)
    }

    setCookie(data: any): Promise<any> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_NEXTJS}/api/auth/setCookie`, data)
    }
}

export const AuthSevices = new Auth()