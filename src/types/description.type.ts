interface EditorBlock {
    id: string
    type: string
    data: {
        text: string
        level: number | null
    }
}

export interface EditorData {
    time: number | null
    blocks: EditorBlock[]

}