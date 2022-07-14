import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AllowedCharaters, CharacterList } from "../CharacterList";
import useDecodeAnimation from "../hooks/useDecodeAnimation";

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

export interface DecodeAnimationCharacterOptions {
	interval: number;
	deviation?: number;
}

export interface DecodeAnimationCharacterProps {
	isPlaying: boolean;
	loopString: string;
	options?: DecodeAnimationCharacterOptions;
}

export function DecodeAnimationCharacter({
	isPlaying,
	loopString,
	options = { deviation: 10, interval: 100 },
}: DecodeAnimationCharacterProps) {
	const code = CharacterList.generateCode(loopString);
	const minInterval = options.interval - (options.deviation || 0);
	const maxInterval = options.interval + (options.deviation || 0);
	const interval = Math.random() * (maxInterval - minInterval) + minInterval;
	let intervalId: NodeJS.Timeout;
	const [character, setCharacter] = useState<string>(`${code.next().value}`);

	const clear = () => {
		clearInterval(intervalId);
	};

	useEffect(() => {
		if (isPlaying) {
			intervalId = setInterval(() => {
				setCharacter(`${code.next().value}`);
			}, interval);
		} else {
			clear();
		}
		return clear;
	}, [isPlaying]);

	return <React.Fragment>{character}</React.Fragment>;
}
