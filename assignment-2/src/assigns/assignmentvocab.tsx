import React, { useEffect, useState, useRef } from "react";
import data from "./word.json";

interface Word {
  lang: string;
  word: string;
  isLocked?: boolean;
}

function ImgUnlock() {
  return (
    <img
      className="img"
      src="https://img5.pic.in.th/file/secure-sv1/unlock.png"
      width={100}
      height={100}
    />
  );
}

function Imglock() {
  return (
    <img
      className="img"
      src="https://img2.pic.in.th/pic/lockbc8d89556d342449.png"
      width={100}
      height={100}
    />
  );
}

export default function AssignmentVocab() {
  const [words, setWords] = useState<Word[]>([]);
  const [thaiWords, setThaiWords] = useState<Word[]>([]);
  const [englishWords, setEnglishWords] = useState<Word[]>([]);
  const thaiWordTimers = useRef<NodeJS.Timeout[]>([]);
  const englishWordTimers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    setWords(data);
  }, []);

  const handleVocabClick = (word: Word) => {
    if (word.lang === "TH") {
      setThaiWords([...thaiWords, word]);
    } else if (word.lang === "EN") {
      setEnglishWords([...englishWords, word]);
    }
    const filteredWords = words.filter((w) => w !== word);
    setWords(filteredWords);
  };

  const handleBackToVocabClick = (word: Word) => {
    setWords([...words, word]);
    if (word.lang === "TH") {
      setThaiWords(thaiWords.filter((w) => w !== word));
    } else if (word.lang === "EN") {
      setEnglishWords(englishWords.filter((w) => w !== word));
    }
  };

  const switchImg = (word: Word) => {
    word.isLocked = !word.isLocked;
    setWords([...words]);
    if (word.isLocked) {
      thaiWordTimers.current.forEach((timer) => clearTimeout(timer));
      englishWordTimers.current.forEach((timer) => clearTimeout(timer));
    } else {
      if (word.lang === "TH") {
        setThaiWords(
          thaiWords.map((w) => (w === word ? { ...w, isLocked: false } : w))
        );
      } else if (word.lang === "EN") {
        setEnglishWords(
          englishWords.map((w) => (w === word ? { ...w, isLocked: false } : w))
        );
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const thaiWordToRemoveIndex = thaiWords.findIndex(
        (word) => !word.isLocked
      );
      if (thaiWordToRemoveIndex !== -1) {
        setWords((prevWords) => [
          ...prevWords,
          thaiWords[thaiWordToRemoveIndex],
        ]);
        setThaiWords((prevThaiWords) =>
          prevThaiWords.filter((_, index) => index !== thaiWordToRemoveIndex)
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [thaiWords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const englishWordToRemoveIndex = englishWords.findIndex(
        (word) => !word.isLocked
      );
      if (englishWordToRemoveIndex !== -1) {
        setWords((prevWords) => [
          ...prevWords,
          englishWords[englishWordToRemoveIndex],
        ]);
        setEnglishWords((prevEnglishWords) =>
          prevEnglishWords.filter(
            (_, index) => index !== englishWordToRemoveIndex
          )
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [englishWords]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="boxsmall">คำศัพท์ (Vocabulary)</div>
          <div className="box boxvocab">
            <div id="wordButtons">
              {words.map((word, index) => (
                <button className="button" key={index}>
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
            {thaiWords.map((word, index) => (
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
                <button className="butimg" onClick={() => switchImg(word)}>
                  {word.isLocked ? <Imglock /> : <ImgUnlock />} {}
                </button>
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="boxsmall">ภาษาอังกฤษ (English)</div>
          <div className="box boxen">
            {englishWords.map((word, index) => (
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
                <button className="butimg" onClick={() => switchImg(word)}>
                  {word.isLocked ? <Imglock /> : <ImgUnlock />} {}
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
