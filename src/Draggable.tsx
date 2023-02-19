import { useSpring, animated as a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import DraggableContext, { Coords } from "./DraggableContext";
import StackableContext from "./StackableContext";

const config = {
  tension: 200,
  mass: 1,
  friction: 20,
};

/**
 * A wrapper for react nodes to making 'em draggables.
 * Also have support for being stackable. It means that you can drag it and put it in front of any other element under the same StackableProvider
 */
export default function Draggable({
  children,
  initialZ = 0,
  initialPosition = { x: 0, y: 0 },
  axis = "none",
}: {
  /** The node you want to be draggable */
  children: React.ReactNode;
  /** The initial position for this draggable component */
  initialPosition?: Coords;
  /** The zIndex for this draggable component */
  initialZ?: number;
  /** The axis the drag gesture should only be available for */
  axis?: "x" | "y" | "lock" | "none";
}) {
  const { bounds } = useContext(DraggableContext);
  const stackableContext = useContext(StackableContext);
  const [zIndex, setZIndex] = useState(initialZ);
  const [position] = useState(initialPosition);

  const ref = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({
    from: { ...position },
    cancel: true,
    config,
  }));

  useEffect(() => {
    api.start({ ...position });
  }, [position, api]);

  const bind = useDrag(
    ({ offset: [x, y], tap, event, first }) => {
      if (stackableContext && stackableContext.lastZ != zIndex) {
        setZIndex(stackableContext.lastZ + 1);
        stackableContext.setLastZ((z) => z + 1);
      }
      if (tap) {
        return;
      }
      api.start({ x, y, config });
      event.preventDefault();
      event.stopPropagation();
    },
    {
      bounds,
      from: () => [x.get(), y.get()],
      filterTaps: true,
      axis: axis === "none" ? undefined : axis,
    }
  );

  return (
    <a.div
      data-testid="draggable"
      {...bind()}
      style={{
        left: x,
        top: y,
        zIndex,
        touchAction: "none",
        position: "absolute",
      }}
      ref={ref}
    >
      {children}
    </a.div>
  );
}
