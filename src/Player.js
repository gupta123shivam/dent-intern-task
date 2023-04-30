import React, { useRef, useEffect, useCallback } from "react";
import Mousetrap from "mousetrap";

const audioSrc = require("./data/harvard.wav");

const Player = ({ transcript }) => {
  const playerRef = useRef(null);
  const wordsRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    const onTimeUpdate = () => {
      // find the active word right now
      const activeWordIndex = transcript.words.findIndex((word) => {
        return (
          word.startTime < player.currentTime &&
          word.endTime > player.currentTime
        );
      });
      addActiveToElements(activeWordIndex);
    };

    player.addEventListener("timeupdate", onTimeUpdate);

    // cleanup function
    return () => {
      player.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  // Mousetrap binding
  useEffect(() => {
    const player = playerRef.current;

    Mousetrap.bind("j", () => {
      // Skip backwards 10 seconds
      playerRef.current.currentTime += 5;
      const activeWordIndex = transcript.words.findIndex((word) => {
        return (
          word.startTime < player.currentTime &&
          word.endTime > player.currentTime
        );
      });

      addActiveToElements(activeWordIndex);
    });
    return () => Mousetrap.unbind("j");
  }, []);

  // add 'active' class to the words
  // Modified addActiveToElements
  const addActiveToElements = useCallback((activeIndex) => {
    const wordElements = Array.from(wordsRef.current.childNodes);

    wordElements.forEach((node, idx) => {
      const isActive = idx === activeIndex;

      node.classList.toggle("active", isActive);

      if (isActive) {
        const rect = node.getBoundingClientRect();

        const highlight = highlightRef.current;
        highlight.style.top = `${rect.top}px`;
        highlight.style.left = `${rect.left}px`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
      }

      // Implements -- "Highlighting the current word"
      if (activeIndex >= 0)
        highlightRef.current.childNodes[0].textContent =
          transcript.words[activeIndex].text;
    });
  }, []);

  // set the current time of audio player to start of the clicked i-th word/sentence
  const handleWordClick = (i) => {
    playerRef.current.currentTime = transcript.words[i].startTime;
    addActiveToElements(i);
  };

  return (
    <div className="transcript-player">
      <div
        className="highlight"
        ref={highlightRef}
        style={{ display: "inline-block" }}
      >
        <span></span>
      </div>
      <span ref={wordsRef}>
        {transcript.words.map((word, i) => (
          <span key={i} onClick={() => handleWordClick(i)}>
            {word.text}{" "}
          </span>
        ))}
      </span>
      <audio
        controls
        ref={playerRef}
        style={{ display: "block" }}
        className="audio-player"
      >
        <source src={audioSrc} type="audio/wav" />
      </audio>
    </div>
  );
};

export default Player;
