import { RootState } from "..";
import { labelsAdapter } from "./label.adapter";

export const labelsSelectors = labelsAdapter.getSelectors(
  (state: RootState) => state.label.labels,
);
