import { MongoEntity } from "./board.type"

export interface CheckListItem extends MongoEntity {
    label: string
    status: boolean
    dueDate: string | null
    member: string[]
}

export interface CheckListProcess {
    total: number
    process: number
    
}

export interface CheckList extends MongoEntity {
    title: string
    items: CheckListItem[]
    process: CheckListProcess

}