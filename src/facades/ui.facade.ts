import { store } from "@/store"
import { setIsCardDetailView } from "@/store/ui/ui.slice"

export const UIFacade = {
    setCardDetailView(open: boolean, cardId: string){
        store.dispatch(setIsCardDetailView({open, cardId}))
    }
}