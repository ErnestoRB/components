import { Bounds } from "@use-gesture/react";
import React from "react";

export interface Coords {
  x: number;
  y: number;
}

export interface DraggableContextValue {
  /**
   * Represents if the draggable container should have a boundry. If not set, it could be dragged without limit
   */
  bounds?: React.RefObject<HTMLElement> | Bounds | undefined;
}

export default React.createContext<DraggableContextValue>({});
