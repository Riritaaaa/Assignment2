import { useState, useRef } from "react";
import data from "./word.json";
import { Word } from "./types";
import WordItem from "./word";

export default function AssignmentVocab() {
  const [words, setWords] = useState<Word[]>(data);
  const [thaiWords, setThaiWords] = useState<Word[]>([]);
  const [englishWords, setEnglishWords] = useState<Word[]>([]);
  // const TimeRef = useRef<NodeJS.Timeout[]>([]);

  const handleVocabClick = (word: Word) => {
    if (word.lang === "TH") {
      setThaiWords([...thaiWords, word]);
    } else if (word.lang === "EN") {
      setEnglishWords([...englishWords, word]);
    }
    setWords(words.filter((w) => w.word !== word.word));
  };

  const handleBackToVocabClick = (word: Word) => {
    setWords((prev) => [...prev, word]);
    if (word.lang === "TH") {
      setThaiWords((prev) => prev.filter((w) => w.word !== word.word));
    } else if (word.lang === "EN") {
      setEnglishWords((prev) => prev.filter((w) => w.word !== word.word));
    }
  };

  const switchLock = (word: Word) => {
    word.isLocked = !word.isLocked;
    setWords([...words]);
    if (!word.isLocked) {
      if (word.lang === "TH") {
        setThaiWords(
          thaiWords.map((w) =>
            w.word === word.word ? { ...w, isLocked: false } : w
          )
        );
      } else if (word.lang === "EN") {
        setEnglishWords(
          englishWords.map((w) => (w === word ? { ...w, isLocked: false } : w))
        );
      }
    } else {
      // TimeRef.current.forEach((timer) => clearTimeout(timer));
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const thaiWordToRemoveIndex = thaiWords.findIndex(
  //       (word) => !word.isLocked
  //     );
  //     if (thaiWordToRemoveIndex !== -1) {
  //       const removedWord = thaiWords[thaiWordToRemoveIndex];
  //       setWords((prevWords) => [...prevWords, removedWord]);
  //       setThaiWords((prevThaiWords) =>
  //         prevThaiWords.filter((_, index) => index !== thaiWordToRemoveIndex)
  //       );
  //     }
  //   }, 3000);
  //   //TimeRef.current.push(timer);
  //   return () => clearTimeout(timer)
  // }, [thaiWords]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const englishWordToRemoveIndex = englishWords.findIndex(
  //       (word) => !word.isLocked
  //     );
  //     if (englishWordToRemoveIndex !== -1) {
  //       const removedWord = englishWords[englishWordToRemoveIndex];
  //       setWords((prevWords) => [...prevWords, removedWord]);
  //       setEnglishWords((prevEnglishWords) =>
  //         prevEnglishWords.filter(
  //           (_, index) => index !== englishWordToRemoveIndex
  //         )
  //       );
  //     }
  //   }, 3000);
  //  // TimeRef.current.push(timer);
  //  /* TimeRef.current.forEach((timer) => clearTimeout(timer));
  // }, [englishWords]); */

  //   return () => clearTimeout(timer)
  // }, [englishWords]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="boxsmall">คำศัพท์ (Vocabulary)</div>
          <div className="box boxvocab">
            <div id="wordButtons">
              {words.map((word) => (
                <button className="button" key={word.word}>
                  <p className="span" onClick={() => handleVocabClick(word)}>
                    {word.word}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="boxsmall">ภาษาไทย (Thai)</div>
          <div className="box boxth">
            {/* {thaiWords.map((word, index) => (
              <button className="button" key={index}>
                <p
                  className={`span ${word.isLocked ? "not-allowed" : ""}`}
                  onClick={() => {
                    if (!word.isLocked) {
                      handleBackToVocabClick(word);
                    }
                  }}
                >
                  {word.word}
                </p>

                <button className="butimg" onClick={() => switchLock(word)}>
                  {word.isLocked ? (
                    <svg viewBox="0 0 24 24" fill="rgb(135, 113, 178)">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  )}
                </button>
              </button>
            ))} */}
            {thaiWords.map((word, index) => (
              <WordItem
                key={word.word}
                word={word}
                index={index}
                handle={handleBackToVocabClick}
                switchLock={switchLock}
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="boxsmall">ภาษาอังกฤษ (English)</div>
          <div className="box boxen">
            {/* {englishWords.map((word, index) => (
              <button className="button" key={index}>
                <p
                  className="span"
                  onClick={() => {
                    if (!word.isLocked) {
                      handleBackToVocabClick(word);
                    }
                  }}
                >
                  {word.word}
                </p>
                <button className="butimg" onClick={() => switchLock(word)}>
                  {word.isLocked ? (
                    <svg viewBox="0 0 24 24" fill="rgb(135, 113, 178)">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  )}
                </button>
              </button>
            ))} */}
            {englishWords.map((word, index) => (
              <WordItem
                key={word.word}
                word={word}
                index={index}
                handle={handleBackToVocabClick}
                switchLock={switchLock}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
