import { Card } from "@/types/board.type"

export function generatePlaceholdeCard(column: any):Card {
    return {
        _id: column._id+'-placeholder-card',
        label: '',
        FE_placeholderCard: true,
        columnId: column._id,
        checklist:[],
        status: false,
        cover: "",
        description: "",
        attachments: [],
        date: {
            startDate: null,
            dueDate: null,
            recurring: "Daily",
            reminder: "None"
        },
        tag: [],
        joined: []
        }
}

export function slugtify(val: string) {
    if (!val) return ''
    return val
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
}