import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DecodeAnimation, {
	DecodeAnimationRef,
} from "../components/DecodeAnimation";
import { DecodeState } from "../hooks/useDecodeAnimation";

const DecodeAnimationExample = ({}) => {
	const [decodeState, setDecodeState] = useState<DecodeState>("Paused");
	const [finished, setFinished] = useState<boolean>(false);
	const ref = useRef<DecodeAnimationRef>(null);
	return (
		<div style={{ fontFamily: "sans-serif" }}>
			<DecodeAnimation
				text={"This is an animation Example"}
				ref={ref}
				state={decodeState}
				onFinish={() => setFinished(true)}
        style={{
          display: "block",
          backgroundColor: "lightgray",
          borderRadius: 4,
          padding: 16,
          marginBottom: 8,
        }}
			/>
      <div>onFinished Called: { finished ? "Yes" : "No" }</div>
			<section style={{
        border: "1px solid grey",
        borderRadius: 4,
        padding: "0 16px 16px",
        marginTop: 8,
      }}>
				<h3>Control with Ref</h3>
				<p>
					With refs, DecodeAnimation will handle the state
					automatically. The state, however, cannot be accessed
				</p>
				<button onClick={() => ref.current?.play()}>PlayRe</button>
				<button onClick={() => ref.current?.pause()}>Pause</button>
				<button onClick={() => ref.current?.reset()}>Reset</button>
			</section>
			<section style={{
        border: "1px solid grey",
        borderRadius: 4,
        padding: "0 16px 16px",
        marginTop: 8,
      }}>
				<h3>Control with States</h3>
				<p>
					With setting an external state, it will trigger
					DecodeAnimation to re-render. The external state will not be
					updated when the state of DecodeAnimation changes
				</p>
				<button onClick={() => setDecodeState("Playing")}>Play</button>
				<button onClick={() => setDecodeState("Paused")}>Pause</button>
				<button onClick={() => setDecodeState("Reset")}>Reset</button>
			</section>
		</div>
	);
};

export default {
	title: "Example",
	component: DecodeAnimationExample,
} as ComponentMeta<typeof DecodeAnimationExample>;

export const Template: ComponentStory<typeof DecodeAnimationExample> = (
	args
) => <DecodeAnimationExample {...args} />;
