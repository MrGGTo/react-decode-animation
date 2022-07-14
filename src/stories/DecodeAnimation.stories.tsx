import React, { useRef } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as DecodeAnimationRaw from '../components/DecodeAnimation';

export default {
  title: 'Decode Animation',
  component: DecodeAnimation,
} as ComponentMeta<typeof DecodeAnimation>;


const Template: ComponentStory<typeof DecodeAnimation> = (args) => <DecodeAnimation {...args} />;

export const Short = Template.bind({});
Short.args = {
  text: "This is an Decode Animation Short.",
  style: {
    fontFamily: "sans-serif"
  }
}

function DecodeAnimation(props: DecodeAnimationRaw.DecodeAnimationProps) {
  const ref = useRef<DecodeAnimationRaw.DecodeAnimationRef>(null);
  return (
    <div>
      <DecodeAnimationRaw.default {...props} ref={ref} />
			<hr />
			<button onClick={() => ref.current?.start()}>Play</button>&nbsp;
			<button onClick={() => ref.current?.pause()}>Pause</button>&nbsp;
			<button onClick={() => ref.current?.reset()}>Reset</button>&nbsp;
			{/* <code>{ref.current?.getState()}</code> */}
    </div>
  )
}