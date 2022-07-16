import React, { useEffect, useState } from "react";
import { CharacterList } from "../CharacterList";

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
