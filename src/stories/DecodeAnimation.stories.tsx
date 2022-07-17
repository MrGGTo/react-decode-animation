import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DecodeAnimation from "../components/DecodeAnimation";

export default {
	title: "Decode Animation",
	component: DecodeAnimation,
	argTypes: {
		autoplay: {
			defaultValue: false,
		},
    interval: {
      defaultValue: 100,
    },
    allowedCharacters: {
      defaultValue: "alphanumeric",
    }
	},
} as ComponentMeta<typeof DecodeAnimation>;

const Template: ComponentStory<typeof DecodeAnimation> = (args) => (
	<DecodeAnimation
		{...args}
		style={{
			fontFamily: "sans-serif",
			color: "#4b4b4b",
		}}
	/>
);

export const Sample = Template.bind({});
Sample.args = {
	text: "This is a decode Animation.",
	allowedCharacters: "alphanumeric"
};
