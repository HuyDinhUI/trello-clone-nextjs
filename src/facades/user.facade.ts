import { store } from "@/store"
import { fetchUser } from "@/store/user/user.thunks"

export const UserFacade = {
    getUser () {
        store.dispatch(fetchUser())
    }
}