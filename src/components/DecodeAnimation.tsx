import React, { forwardRef, useImperativeHandle } from "react";
import { AllowedCharaters, CharacterList } from "../CharacterList";
import useDecodeAnimation from "../hooks/useDecodeAnimation";
import { DecodeAnimationCharacter, DecodeAnimationCharacterProps } from "./DecodeAnimationCharacter";

export interface DecodeAnimationProps {
	text: string;
	allowedCharacters?: AllowedCharaters;
	className?: string;
	style?: React.CSSProperties;
}

export type DecodeAnimationRef = {
  start: Function,
  pause: Function,
  reset: Function,
}

const DecodeAnimation = forwardRef<DecodeAnimationRef, DecodeAnimationProps>((props, ref) => {
	const { text, currentIndex, state, start, pause, reset } = useDecodeAnimation(props.text);
	const placeholders = Array.apply({}, Array<DecodeAnimationCharacterProps>(props.text.length));
	const characterList = new CharacterList(props.allowedCharacters);
  useImperativeHandle(ref, () => ({ start, pause, reset }), []); //TODO: pass State 

	return (
		<span className={props.className} style={props.style}>
			{text}
			{placeholders.map((_, index) => {
				return (
					index >= currentIndex && (
						<DecodeAnimationCharacter
							key={index}
							isPlaying={state === "Playing"}
							loopString={characterList.shuffle()}
						/>
					)
				);
			})}
		</span>
	);
})

export default DecodeAnimation;
