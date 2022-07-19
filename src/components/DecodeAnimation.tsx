import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { AllowedCharatersList, CharacterList } from "../CharacterList";
import useDecodeAnimation, { DecodeState } from "../hooks/useDecodeAnimation";
import { DecodeAnimationCharacter, DecodeAnimationCharacterOptions, DecodeAnimationCharacterProps } from "./DecodeAnimationCharacter";

export interface DecodeAnimationProps {
  /**
   * If True, DecodeAnimation will play once it is rendered
   */
  autoplay?: boolean;
  state?: DecodeState;
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
  /**
   * A list of character types for the encoded text to use, this will not work if customCharacters is in use
   */
	allowedCharacters?: AllowedCharatersList;
  /**
   * Custom characters for the encoded text to use, this will override allowedCharacters
   */
  customCharacters?: string;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * Animation actions can be controlled via DecodeAnimationRef,
 * DecodeAnimationRef can be obtained through useRef
 */
export type DecodeAnimationRef = {
  /**
   * run start() to play the decode animation
   */
  start: Function,
  /**
   * run pause() to stop the decode animation
   */
  pause: Function,
  /**
   * run reset() to pause and reset the decode animation
   */
  reset: Function,
}

const DecodeAnimation = forwardRef<DecodeAnimationRef, DecodeAnimationProps>(({
  autoplay = false,
  interval = 100,
  ...props
}, ref) => {
	const { text, currentIndex, state,  start, pause, reset } = useDecodeAnimation({
    value: props.text,
    interval,
  });
	const placeholders = Array.apply({}, Array<DecodeAnimationCharacterProps>(props.text.length));
	const characterList = new CharacterList(props.allowedCharacters, props.customCharacters);
  useImperativeHandle(ref, () => ({ start, pause, reset }), []);

  useEffect(() => {
    if (autoplay) start();
  }, []);

  useEffect(() => {
    switch (props.state) {
      case "Playing":
        start()
        break;
      case "Paused":
        pause()
        break;
      case "Reset":
        reset()
        break;
    }
  }, [props.state])

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
