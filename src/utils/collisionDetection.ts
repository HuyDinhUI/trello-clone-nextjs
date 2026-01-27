import { closestCenter, pointerWithin, rectIntersection } from "@dnd-kit/core";

export const customCollisionDetection = (args: any) => {
  return pointerWithin(args).length > 0
    ? pointerWithin(args)
    : rectIntersection(args).length > 0
    ? rectIntersection(args)
    : closestCenter(args);
};
