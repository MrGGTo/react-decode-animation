import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DecodeAnimation from '../components/DecodeAnimation';

export default {
  title: 'Decode Animation',
  component: DecodeAnimation,
} as ComponentMeta<typeof DecodeAnimation>;

const Template: ComponentStory<typeof DecodeAnimation> = (args) => <DecodeAnimation {...args} />;

export const Short = Template.bind({});
Short.args = {
  text: "This is an Decode Animation Short."
}