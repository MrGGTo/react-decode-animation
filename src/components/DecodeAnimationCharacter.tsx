import React, { useEffect, useState } from "react";
import { CharacterList } from "../CharacterList";

export interface DecodeAnimationCharacterOptions {
  /**
   * The duration of character change (in Milliseconds)
   */
	interval: number;
  /**
   * The duration that can deviate from the interval (in Milliseconds)
   */
	intervalDeviation?: number;
}

export interface DecodeAnimationCharacterProps {
	isPlaying: boolean;
	loopString: string;
	options?: DecodeAnimationCharacterOptions;
}

export function DecodeAnimationCharacter({
	isPlaying,
	loopString,
	options = { intervalDeviation: 10, interval: 100 },
}: DecodeAnimationCharacterProps) {
	const code = CharacterList.generateCode(loopString);
	const minInterval = options.interval - (options.intervalDeviation || 50);
	const maxInterval = options.interval + (options.intervalDeviation || 50);
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
