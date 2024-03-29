import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { AllowedCharatersList, CharacterList } from "../CharacterList";
import useDecodeAnimation, { DecodeState } from "../hooks/useDecodeAnimation";
import useOnScreen from "../hooks/useOnScreen";
import {
	DecodeAnimationCharacter,
	DecodeAnimationCharacterOptions,
	DecodeAnimationCharacterProps,
} from "./DecodeAnimationCharacter";

/**
 * Components props for DecodeAnimation
 */
export interface DecodeAnimationProps {
	/**
	 * If True, DecodeAnimation will play once it enters the viewport
	 */
	autoplay?: boolean;
	/**
	 * Changing the state will start | pause | reset the animation
	 */
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
	/**
	 * onFinish is triggered when the decode animation is finished
	 */
	onFinish?: Function;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * Animation actions can be controlled via DecodeAnimationRef,
 * DecodeAnimationRef can be obtained through useRef
 */
export type DecodeAnimationRef = {
	/**
	 * run play() to play the decode animation
	 */
	play: Function;
	/**
	 * run pause() to stop the decode animation
	 */
	pause: Function;
	/**
	 * run reset() to pause and reset the decode animation
	 */
	reset: Function;
};

/**
 * Decode effect typing animation for React
 */
const DecodeAnimation = forwardRef<DecodeAnimationRef, DecodeAnimationProps>(
	({ autoplay = false, interval = 100, ...props }, ref) => {
		const [isRendered, setRendered] = useState<boolean>(false);
		const [isAutoplayed, setAutoplayed] = useState<boolean>(false);
		const spanRef = useRef(null);
		const isOnScreen = useOnScreen(spanRef);
		const { text, currentIndex, state, play, pause, reset } =
			useDecodeAnimation({
				value: props.text,
				interval,
				onFinish: props.onFinish,
			});
		const placeholders = Array.apply(
			{},
			Array<DecodeAnimationCharacterProps>(props.text.length)
		);
		const characterList = new CharacterList(
			props.allowedCharacters,
			props.customCharacters
		);
		useImperativeHandle(ref, () => ({ play, pause, reset }), []);

		useEffect(() => {
			setRendered(true);
		}, []);

		useEffect(() => {
			if (autoplay && !isAutoplayed) {
				console.log("play");
				play();
			}
			setAutoplayed(true);
		}, [isOnScreen]);

		useEffect(() => {
			switch (props.state) {
				case "Playing":
					play();
					break;
				case "Paused":
					pause();
					break;
				case "Reset":
					reset();
					break;
			}
		}, [props.state]);

		return (
			<span ref={spanRef} className={props.className} style={props.style}>
				{isRendered ? (
					<>
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
					</>
				) : (
					props.text.split("").map(() => "-")
				)}
			</span>
		);
	}
);

export default DecodeAnimation;
