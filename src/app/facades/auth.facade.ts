import { store } from "@/store";
import { login, logout, oauth, refresh, register } from "@/store/auth/auth.thunks";
import { LoginBody, RegisterBody } from "@/types/auth.type";

export const AuthFacade = {
    login (data: LoginBody) {
        store.dispatch(login(data))
    },

    register (data: RegisterBody) {
        store.dispatch(register(data))
    },

    logout () {
        store.dispatch(logout())
    },

    oauth (accessToken: string, refreshToken: string) {
        store.dispatch(oauth({accessToken, refreshToken}))
    },

    refresh () {
        store.dispatch(refresh())
    }
}