import API from "@/utils/axios"


export const UserService = {
    getUser () {
        return API.get('/user/get/me')
    },

    updateRecentBoardAsync (boardId: string) {
        return API.put(`/user/update/recentBoard/${boardId}`)
    }
}