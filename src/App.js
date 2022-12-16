import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import Pagination from "./components/Pagination";
import axios from "axios";

function App() {
  // Create the first Hook (ganchos)
  const [pokemon, setPokemon] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();

  function gotoPrevPage() {
    setCurrentUrl(prevPageUrl);
  }

  function gotoNextPage() {
    setCurrentUrl(nextPageUrl);
  }

  useEffect(() => {
    axios.get(currentUrl).then((response) => {
      setPokemon(response.data.results.map((p) => p.name));
      // Set NAvigation
      setPrevPageUrl(response.data.previous);
      setNextPageUrl(response.data.next);
    });
  }, [currentUrl]);
  return (
    <div className="App">
      <Grid pokemon={pokemon} />
      <Pagination gotoPrevPage={gotoPrevPage} gotoNextPage={gotoNextPage} />
    </div>
  );
}

export default App;
