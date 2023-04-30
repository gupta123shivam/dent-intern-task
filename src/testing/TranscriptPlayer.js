import React, { useState, useEffect, useRef } from "react";

const TranscriptPlayer = ({ transcriptData, audioUrl }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioUrl]);

  function handleTimeUpdate() {
    const audioElement = audioRef.current;
    const currentTime = audioElement.currentTime;

    for (let i = 0; i < transcriptData.length; i++) {
      const startTime = transcriptData[i].startTime;
      const endTime = transcriptData[i].endTime;

      if (currentTime >= startTime && currentTime <= endTime) {
        setActiveIndex(i);
        break;
      }
    }
  }

  return (
    <div className="transcript-player">
      {transcriptData.map((transcriptItem, index) => (
        <div
          key={index}
          className={`transcript-item ${index === activeIndex ? "active" : ""}`}
        >
          <span>{transcriptItem.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TranscriptPlayer;
