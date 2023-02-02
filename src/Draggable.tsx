import { useSpring, animated as a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { useContext, useEffect, useRef } from "react";
import DraggableContext, { Coords } from "./DraggableContext";

const config = {
  tension: 200,
  mass: 1,
  friction: 20,
};

export default function Draggable({
  children,
  zIndex = 0,
  initialPosition = { x: 0, y: 0 },
  axis,
}: {
  children: React.ReactNode;
  initialPosition?: Coords;
  zIndex?: number;
  axis?: "x" | "y" | "lock";
}) {
  const { bounds } = useContext(DraggableContext);

  const ref = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({
    from: { ...initialPosition },
    cancel: true,
    config,
  }));

  useEffect(() => {
    api.start({ ...initialPosition });
  }, [initialPosition, api]);

  const bind = useDrag(
    ({ offset: [x, y], tap, event }) => {
      if (tap) {
        return;
      }
      api.start({ x, y, config });
      event.preventDefault();
      event.stopPropagation();
    },
    {
      bounds: bounds,
      from: () => [x.get(), y.get()],
      filterTaps: true,
      axis,
    }
  );

  return (
    <a.div
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
