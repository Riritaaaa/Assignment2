import { useEffect, useRef, useState } from "react";
import { Word } from "./types";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  word: Word;
  handle: (word: Word) => void;
  switchLock: (word: Word) => void;
}

const word = ({ word, handle, switchLock }: Props) => {
  const timerId = useRef<NodeJS.Timeout>();
  const [isClear, setisClear] = useState<boolean>(false);
  const [timer, setTimer] = useState(5);

  const initTimer = () => {
    timerId.current = setTimeout(() => {
      setisClear(true);
    }, 5000);
  };

  useEffect(() => {
    if (!word.isLocked) {
      initTimer();
      setTimer(5);
    } else {
      clearTimeout(timerId.current);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [word.isLocked]);

  useEffect(() => {
    if (!word.isLocked && isClear) {
      handle(word);
    }
  }, [isClear]);

  return (
    <>
        <button className="button">
          <div className="countdown">
            {word.isLocked ? (
              <CountdownCircleTimer
                key={`${word.word}_thai_lock`}
                duration={timer}
                size={30}
                strokeWidth={3}
                colors={["#004777", "#F7B801", "#A30000"]}
                colorsTime={[5, 2, 0]}
              >
                {() => 0}
              </CountdownCircleTimer>
            ) : (
              <CountdownCircleTimer
                key={`${word.word}_thai`}
                isPlaying={!word.isLocked}
                duration={5}
                onUpdate={(remainingTime) => setTimer(remainingTime)}
                size={30}
                strokeWidth={3}
                colors={["#004777", "#F7B801", "#A30000"]}
                colorsTime={[5, 2, 0]}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            )}
          </div>
          <p
            className={`span ${word.isLocked ? "not-allowed" : ""}`}
            onClick={() => {
              if (!word.isLocked) {
                handle(word);
              }
            }}
          >
            {word.word}
          </p>
          <div
            className="butimg"
            onClick={() => {
              switchLock(word);
            }}
          >
            {word.isLocked ? (
              <svg viewBox="0 0 24 24" fill="rgb(135, 113, 178)">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            )}
          </div>
        </button>
    </>
  );
};

export default word;
