import { Bounds } from "@use-gesture/react";
import React from "react";

export interface Coords {
  x: number;
  y: number;
}

export interface DraggableContextValue {
  bounds?: React.RefObject<HTMLElement> | Bounds | undefined;
}

export default React.createContext<DraggableContextValue>({});
