import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./css/slider.css";
import Slider from "../Slider";

export default {
  title: "Example/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const OneImage = Template.bind({});
OneImage.args = {
  images: [{ src: "/vite.svg" }],
  className: "border-black w-256 h-256",
};
OneImage.storyName = "One Image ";

export const TwoImages = Template.bind({});
TwoImages.args = {
  className: "w-256 h-256",
  images: [
    {
      src: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg",
    },
    {
      src: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ],
};
TwoImages.storyName = "Multiple Images";
