import { Tag } from "@/types/board.type";
import { createEntityAdapter, EntityId } from "@reduxjs/toolkit";

export const labelsAdapter = createEntityAdapter<Tag, EntityId>({
    selectId: (t) => t._id,
    sortComparer: false
})