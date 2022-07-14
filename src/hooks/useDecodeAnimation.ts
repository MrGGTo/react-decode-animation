import { useEffect, useState } from "react"

export type UseDecodeAnimationType = (value: string) => {
  text: string,
  currentIndex: number,
  state: DecodeState,
  start: Function,
  pause: Function,
  reset: Function,
}

export type DecodeState = "Playing" | "Paused" | "Reset";

const useDecodeAnimation: UseDecodeAnimationType = (value) => {
  const [decodeState, setDecodeState] = useState<DecodeState>("Reset");
  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  let intervalId: NodeJS.Timeout;
  
  const start = () => {
    setDecodeState("Playing");
  };
  const pause = () => {
    setDecodeState("Paused");
  };
  const reset = () => {
    clearInterval(intervalId!);
    setIndex(0);
    setText("");
  };

  useEffect(() => {
    if (decodeState === "Playing") {
      setText((prevousState) => {
        return prevousState += value[index - 1]
      })
    }
  }, [index]);
  
  useEffect(() => {
    switch (decodeState) {
      case "Playing":
        intervalId = setInterval(() => {
          setIndex((prevousState) => {
            if (prevousState >= value.length) {
              pause();
              return prevousState;
            }
            return ++prevousState;
          });
        }, 100)
        break;
      case "Paused":
        clearInterval(intervalId!);
        break;
      case "Reset":
        reset();
        break;
      default:
        break;
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [decodeState]);

  return {
    text,
    currentIndex: index,
    state: decodeState,
    start,
    pause,
    reset,
  }
}

export default useDecodeAnimation;