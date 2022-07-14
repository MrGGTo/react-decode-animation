import React, { useEffect, useState } from "react";
import { AllowedCharaters, CharacterList } from "../CharacterList";
import useDecodeAnimation from "../hooks/useDecodeAnimation";

export interface DecodeAnimationProps {
	text: string;
	allowedCharacters?: AllowedCharaters;
	className?: string;
	style?: React.CSSProperties;
}

export default function DecodeAnimation(props: DecodeAnimationProps) {
	const { text, currentIndex, state, start, pause, reset } = useDecodeAnimation(props.text);
	const placeholders = Array.apply({}, Array<DecodeAnimationCharacterProps>(props.text.length));
	const characterList = new CharacterList(props.allowedCharacters);

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
			<hr />
			<button onClick={() => start()}>Play</button>&nbsp;
			<button onClick={() => pause()}>Pause</button>&nbsp;
			<button onClick={() => reset()}>Reset</button>&nbsp;
			<code>{state.toUpperCase()}</code>
		</span>
	);
}

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
