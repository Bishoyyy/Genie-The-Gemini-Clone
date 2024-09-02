import React from "react";
import run from "../config/gemini";

export const Context = React.createContext();

const ContextProvider = (props) => {
  const [input, setInput] = React.useState("");
  const [recentPrompt, setRecentPrompt] = React.useState("");
  const [prevPrompts, setPrevPrompts] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resultData, setResultData] = React.useState("");

  const delayWords = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 60 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const cleanResponse = (response) => {
    let filteredResponse = response
      .replaceAll("#", "")
      .replaceAll("*", "")
      .replaceAll("*", "")
      .replaceAll("'", "&#039;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

    return filteredResponse  
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setInput("");
    let result;
    if (prompt !== undefined) {
      result = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      result = await run(input);
    }

    let response = cleanResponse(result);
    let responseArray = response.split(" ");
    for (let i = 0; i < responseArray.length; i++) {
      const nextWord = responseArray[i];
      delayWords(i, nextWord + " ");
    }
    setLoading(false);
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
