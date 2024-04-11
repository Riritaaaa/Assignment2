import {useState} from "react";
import data from "./word.json";
import { Word } from "./types";
import WordItem from "./word";

export default function AssignmentVocab() {
  const [words, setWords] = useState<Word[]>(data);
  const [thaiWords, setThaiWords] = useState<Word[]>([]);
  const [englishWords, setEnglishWords] = useState<Word[]>([]);

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
    }
  };

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
