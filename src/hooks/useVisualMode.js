import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    setMode(newMode)
    if(replace !== false) {
      setHistory([...history.slice(0, history.length - 1), newMode])
    } else {
      setHistory([...history, newMode])
    }
  }

  function back() {
    if(history.length > 1) {
     const newHistoryArray = history.slice(0, -1)
     setMode(newHistoryArray[newHistoryArray.length - 1]);
     setHistory(newHistoryArray)
    }
  }
  return { mode, transition, back}
};

