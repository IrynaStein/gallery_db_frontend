import "./App.css";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ArtworkPage from "./ArtworkPage";
import CollectorPage from "./CollectorPage";
import NavBar from "./NavBar";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://limitless-reaches-06090.herokuapp.com/artworks")
      .then((resp) => resp.json())
      .then((data) => {
        setArtworks(data.artworks);
        setCategories(data.categories);
      });
  }, []);

  function onAddNew(data) {
    setArtworks([...artworks, data.artwork]);
  }

  function onDelete(artwork) {
    fetch(`https://limitless-reaches-06090.herokuapp.com/artworks/${artwork.id}`, {
      method: "DELETE",
    });
    const deletedArtworks = artworks.filter((a) => a.id !== artwork.id);
    setArtworks(deletedArtworks);
  }

  return (
    <div>
      <NavBar/>
      <Route exact path="/artworks">
        <ArtworkPage
          artworks={artworks}
          categories={categories}
          onAddNew={onAddNew}
          onDelete={onDelete}
        />
      </Route>
      <Route exact path="/collectors">
        <CollectorPage artworks={artworks}/>
      </Route>
    </div>
  );
}

export default App;
