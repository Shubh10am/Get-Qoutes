import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";

const App = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  const handleSaveQuote = () => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app">
      <h1>Random Quote</h1>
      <QuoteCard quote={quote} onSave={handleSaveQuote} />
      <h2>Saved Quotes</h2>
      <div className="saved-quotes">
        {savedQuotes.map((q, index) => (
          <div key={index} className="quote-card">
            <p>{q}</p>
          </div>
        ))}
      </div>
      <button onClick={fetchQuote}>Get New Quote</button>
    </div>
  );
};

export default App;
