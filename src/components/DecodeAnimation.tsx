import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { AllowedCharaters, CharacterList } from "../CharacterList";
import useDecodeAnimation from "../hooks/useDecodeAnimation";
import { DecodeAnimationCharacter, DecodeAnimationCharacterOptions, DecodeAnimationCharacterProps } from "./DecodeAnimationCharacter";

export interface DecodeAnimationProps {
  /**
   * If True, DecodeAnimation will play once it is rendered
   */
  autoplay: boolean;
  /**
   * The duration of each character reveal (in Milliseconds)
   */
  interval?: number;
  /**
   * Options for each characters
   */
  characterOptions?: DecodeAnimationCharacterOptions;
  /**
   * The text that will be animated
   */
	text: string;
	allowedCharacters?: AllowedCharaters;
  customCharacters?: string;
	className?: string;
	style?: React.CSSProperties;
}

export type DecodeAnimationRef = {
  start: Function,
  pause: Function,
  reset: Function,
}

const DecodeAnimation = forwardRef<DecodeAnimationRef, DecodeAnimationProps>(({
  autoplay = false,
  interval = 100,
  ...props
}, ref) => {
	const { text, currentIndex, state, start, pause, reset } = useDecodeAnimation({
    value: props.text,
    interval,
  });
	const placeholders = Array.apply({}, Array<DecodeAnimationCharacterProps>(props.text.length));
	const characterList = new CharacterList(props.allowedCharacters, props.customCharacters);
  useImperativeHandle(ref, () => ({ start, pause, reset }), []);
  useEffect(() => {
    if (autoplay) start();
  }, []);

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
              options={props.characterOptions}
						/>
					)
				);
			})}
		</span>
	);
})

export default DecodeAnimation;
