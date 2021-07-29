import "./App.css";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ArtworkPage from "./ArtworkPage";
import CollectorPage from "./CollectorPage";
import NavBar from "./NavBar";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:9393/artworks")
      .then((resp) => resp.json())
      .then((data) => {
        setArtworks(data.artworks)
        setCategories(data.categories)
      })
  }, []);

  console.log(artworks);

  return (
    <div>
      <NavBar />
      <Route exact path="/artworks">
        <ArtworkPage artworks={artworks} categories={categories}/>
      </Route>
      <Route exact path="/collectors">
        <CollectorPage/>
      </Route>
    </div>
    
  );
}

export default App;

