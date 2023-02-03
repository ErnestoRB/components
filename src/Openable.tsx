import { usePosition } from "@ernestorb/useposition";
import { useSpring, animated as a } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface ChildrenPos {
  left?: number;
  top?: number;
}

export default function Openable({
  children,
}: {
  children: React.ReactElement[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);

  const [open, setOpen] = useState(false);
  const [{ top, left, opacity }, api] = useSpring(() => ({
    top: 0,
    left: 0,
    rotate: 0,
    opacity: "0%",
    onStart: {
      opacity: (result) => {
        active.current = true;
        if (result.value.animation.to === "100%") {
          setOpen(true);
        }
      },
    },
    onRest: {
      opacity: (result) => {
        active.current = false;
        if (result.value === "0%") {
          setOpen(false);
        }
      },
    },
    config: { duration: 200 },
  }));

  const openablePosition = usePosition(ref, { callOnResize: true });
  const menuPosition = usePosition(menuRef, { callOnResize: false });

  useEffect(() => {
    if (!openablePosition || !menuPosition) return;
    const { width, height } = menuPosition;
    const {
      left,
      right,
      bottom,
      top,
      width: openableWidth,
      height: openableHeight,
      screenHeight,
      screenWidth,
      visible,
    } = openablePosition;
    if (open && !visible) {
      api.start({ opacity: "0%" });
      return;
    }
    const positionFromBottom = screenHeight - bottom;
    const positionFromRight = screenWidth - right;

    const moreSpace = Math.max(
      top,
      left,
      positionFromBottom,
      positionFromRight
    );

    let childrenPos: ChildrenPos | undefined;

    switch (moreSpace) {
      case top:
        childrenPos = {
          left: -width / 2 + openableWidth / 2,
          top: -height,
        };
        break;
      case left:
        childrenPos = {
          left: -width,
          top: -height / 2 + openableHeight / 2,
        };
        break;
      case positionFromRight:
        childrenPos = {
          left: openableWidth,
          top: -height / 2 + openableHeight / 2,
        };
        break;
      case positionFromBottom:
        childrenPos = {
          left: -width / 2 + openableWidth / 2,
          top: openableHeight,
        };
        break;
    }

    api.start({ ...childrenPos }); // solo desplazar
  }, [openablePosition, menuPosition, open]);

  return (
    <div style={{ width: "max-content", position: "relative" }}>
      <div
        ref={ref}
        onClick={() => {
          if (active.current) {
            active.current = false;
            api.stop();
          }
          api.start({
            opacity: open ? "0%" : "100%",
          });
        }}
        role="button"
      >
        {children[0]}
      </div>
      <a.div
        style={{
          position: "absolute",
          display: open ? "" : "none",
          top,
          left,
          opacity,
        }}
        ref={menuRef}
      >
        {children[1]}
      </a.div>
    </div>
  );
}
