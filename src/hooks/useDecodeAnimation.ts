import { useEffect, useState } from "react";

export type UseDecodeAnimationType = (value: string) => {
  text: string,
  currentIndex: number,
  state: DecodeState,
  start: Function,
  pause: Function,
  reset: Function,
};

export type DecodeState = "Playing" | "Paused" | "Reset";

const useDecodeAnimation: UseDecodeAnimationType = (value) => {
  const [decodeState, setDecodeState] = useState<DecodeState>("Reset");
  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  let intervalId: NodeJS.Timeout;
  
  const start = () => {
    intervalId = setInterval(() => {
      setIndex((prevousState) => {
        if (prevousState >= value.length) {
          pause();
          setDecodeState("Paused");
          return prevousState;
        }
        return ++prevousState;
      });
    }, 100);
  };

  const pause = () => {
    clearInterval(intervalId!);
  };

  const reset = () => {
    clearInterval(intervalId!);
    setIndex(0);
    setText("");
  };

  useEffect(() => {
    if (decodeState === "Playing") {
      setText((prevousState) => prevousState += value[index - 1]);
    }
  }, [index]);
  
  useEffect(() => {
    switch (decodeState) {
      case "Playing":
        start();
        break;
      case "Paused":
        pause();
        break;
      default:
        reset();
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
    start: () => setDecodeState("Playing"),
    pause: () => setDecodeState("Paused"),
    reset: () => setDecodeState("Reset"),
  }
}

export default useDecodeAnimation;