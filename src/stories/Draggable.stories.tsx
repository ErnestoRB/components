import { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import reactIcon from "../assets/react.svg";

import Draggable from "../Draggable";
import DraggableContext from "../DraggableContext";
import StackableContext from "../StackableContext";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Draggable",
  component: Draggable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Draggable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Draggable> = (args) => (
  <Draggable {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "1px 1px 5px black",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      Drag me
      <img src={reactIcon}></img>
    </div>
  ),
};
Primary.storyName = "Without boundries";

const ContextTemplate: ComponentStory<typeof Draggable> = (args) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <DraggableContext.Provider value={{ bounds: ref }}>
      <div
        ref={ref}
        style={{
          width: "50%",
          height: "200px",
          backgroundColor: "#ff432e",
          position: "relative",
        }}
      >
        <Draggable {...args} />
      </div>
    </DraggableContext.Provider>
  );
};

export const Context = ContextTemplate.bind({});
Context.args = {
  children: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "1px 1px 5px black",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      Try draggin' this component outside the red block
      <img src={reactIcon}></img>
    </div>
  ),
};
Context.storyName = "With bound context";

export const StackableDraggable = () => {
  const [lastZ, setLastZ] = useState(1);
  return (
    <StackableContext.Provider value={{ lastZ, setLastZ }}>
      <Draggable initialPosition={{ x: 100, y: 100 }}>
        <div style={{ width: 100, height: 50, backgroundColor: "#ffddd9" }}>
          1
        </div>
      </Draggable>
      <Draggable>
        <div style={{ width: 50, height: 50, backgroundColor: "#ffb3f7" }}>
          2
        </div>
      </Draggable>
      <Draggable initialPosition={{ x: 150, y: 50 }}>
        <div style={{ width: 50, height: 75, backgroundColor: "#f03775" }}>
          3
        </div>
      </Draggable>
    </StackableContext.Provider>
  );
};
