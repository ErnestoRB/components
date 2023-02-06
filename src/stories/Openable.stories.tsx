import { ComponentStory, ComponentMeta } from "@storybook/react";

import Openable from "../Openable";

export default {
  title: "Example/Openable",
  component: Openable,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Openable>;

const Template: ComponentStory<typeof Openable> = (args) => (
  <Openable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  parent: (
    <div
      style={{ backgroundColor: "#242424", padding: "20px", color: "white" }}
    >
      Click me
    </div>
  ),
  children: (
    <div
      style={{ backgroundColor: "#5c5c5c", color: "white", padding: "10px" }}
    >
      Hidden
    </div>
  ),
};
Primary.storyName = "Default";
