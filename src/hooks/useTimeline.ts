import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import { RECORDING_STATUS, RECORDING } from "./const";

const TOTAL_FRAMES = 600;

// Update frame per frame
// when drag range input, the frame update should be stopped
export const useTimeline = () => {
  const [time, setTime] = useState(0);
  const [recording, setRecording] = useState<RECORDING>(
    RECORDING_STATUS.INITIAL
  );
  const [isRunning, setIsRunning] = useState(false);
  const [totalFrames, setTotalFrames] = useState(TOTAL_FRAMES);
  // const inputRef = useRef<HTMLInputElement>(null);
  const rafRef = useRef<number>();

  const changeTime = useCallback(
    (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        setIsRunning(false);
        // console.log(parseInt(e.target.value, 10));
        setTime(parseInt(e.target.value, 10));
      }
    },
    [setTime]
  );

  const changeFrames = useCallback(
    (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        setIsRunning(false);
        if (!e.target.value) {
          setTotalFrames(1);
          return;
        }

        const integer =
          parseInt(e.target.value, 10) <= 0 ? 1 : parseInt(e.target.value, 10);
        setTotalFrames(integer);
      }
    },
    [setTotalFrames]
  );

  // useEffect(() => {
  //   if (inputRef.current) {
  //     // const canvas = inputRef.current;
  //     // console.log("useEffect - canvas", canvas);
  //     // console.log("useEffect - useTimeline", inputRef.current);
  //   }
  // }, [inputRef]);

  const loop = useCallback(() => {
    if (isRunning) {
      rafRef.current = requestAnimationFrame(loop);
      setTime((prevCount) => {
        if (prevCount !== totalFrames) {
          return ++prevCount;
        }

        if (recording === RECORDING_STATUS.RECORDING) {
          setIsRunning(false);
          setRecording(RECORDING_STATUS.RECORDED);
          return totalFrames;
        }

        return 0;
      });
    }
  }, [isRunning]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loop]);

  return {
    time,
    totalFrames,
    isRunning,
    recording,
    changeTime,
    changeFrames,
    setIsRunning,
    setRecording,
  };
};
