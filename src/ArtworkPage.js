import { useState } from "react";
import Artwork from "./Artwork";
// import { NavLink } from "react-router-dom";

function ArtworksPage({ artworks, categories, onAddNew, onDelete }) {
  const [collectorList, setCollectorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState({});
  const [modal, setModal] = useState(false);

  const defaultForm = {
    title: "",
    category: "",
    date_created: 0,
    edition: 0,
    price: 0,
    image: "",
    likes: 0,
    featured: false,
    medium: "",
  };
  const [formData, setFormData] = useState(defaultForm);

  const renderArtworks = artworks.map((artwork) => (
    <Artwork
      key={artwork.id}
      artwork={artwork}
      onDelete={onDelete}
      showCollectors={showCollectors}
      showCategories={showCategories}
    />
  ));

  const mappedCollectors = collectorList.map((collector) => (
    <div key={collector.id}>
      <p>
        <span style={{ color: "rgba(33, 133, 208, 100)" }}>
          <b>{collector.name}</b>
        </span>
        : collector id# <b>{collector.id}.</b>&nbsp;
        {collector.name.split(" ")[0]} also owns these works:{" "}
        <b>
          {collector.collection.map((a, i) => i + 1 + ". " + a.title + " ")}
        </b>
      </p>
    </div>
  ));
  const mappedCategories = categoryList.map((cat, ind) => {
    if (ind === 0) {
      return (
        <p key={cat.name}>
          {cat.name}&nbsp;&nbsp;
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
        </p>
      );
    } else if (ind === 1) {
      return (
        <p key={cat.name}>
          {cat.name}&nbsp;&nbsp;
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
        </p>
      );
    } else if (ind === 2) {
      return (
        <p key={cat.name}>
          {cat.name}&nbsp;&nbsp;
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
        </p>
      );
    } else if (ind === 3) {
      return (
        <p key={cat.name}>
          {cat.name}&nbsp;&nbsp;
          <i className="yellow small star icon"></i>
          <i className="yellow small star icon"></i>
        </p>
      );
    } else {
      return (
        <p key={cat.name}>
          {cat.name}&nbsp;&nbsp;
          <i className="yellow small star icon"></i>
        </p>
      );
    }
  });

  const renderCategories = categories.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));

  // function capitalizeS(string) {
  //   string
  //     .split(" ")
  //     .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
  //     .join(" ");
  // }

  function showCollectors(artwork) {
    setCategoryList([]);
    fetch(
      `https://limitless-reaches-06090.herokuapp.com/artworks/${artwork.id}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCollectorList(data.collector_list);
      });
    setCurrentArtwork(artwork);
  }

  function showCategories(artwork) {
    setCollectorList([]);
    fetch(
      `https://limitless-reaches-06090.herokuapp.com/artworks/${artwork.id}/showcategories`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCategoryList(data.cat_popularity);
      });
    setCurrentArtwork(artwork);
  }

  function handleChange(e) {
    if (e.target.name === "title") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
          .split(" ")
          .map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase())
          .join(" "),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleChecked(e) {
    setFormData({ ...formData, featured: e.target.checked });
  }

  function handleCatChange(e) {
    setFormData({ ...formData, category: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData.category);
    if (formData.category === "") {
      setModal((mUV) => !mUV);
    } else {
      const configObj = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          edition: parseInt(formData.edition),
          likes: parseInt(formData.likes),
          price: parseInt(formData.price),
          medium: formData.medium,
          image: formData.image,
          featured: formData.featured,
          category: formData.category,
          date_created: parseInt(formData.date_created),
        }),
      };
      console.log(configObj);
      fetch("https://limitless-reaches-06090.herokuapp.com/artworks", configObj)
        .then((resp) => resp.json())
        .then((data) => {
          onAddNew(data);
        });
    }
    setFormData(defaultForm);
  }

  return (
    <div className="ui segment">
      <div className={modal ? "ui orange message" : "ui hidden message"}>
        Category can't be empty
        <i className="close icon" onClick={() => setModal(false)}></i>
      </div>
      <div className="ui two column stakable grid">
        <div className="ui vertical divider">
          <i className="list ul icon"></i>
        </div>
        <div className="column">
          <div className="ui center aligned basic segment">
            <div className="ui icon header">
              <i className="image outline icon" />
              New Artwork
            </div>
          </div>
          <form onSubmit={handleSubmit} className="ui mini form">
            <div className="three fields">
              <div className="field">
                <label>Title</label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="title"
                  placeholder="title"
                  type="text"
                  value={formData.title}
                />
              </div>
              <div className="field">
                <label>Image URL</label>
                <input
                  onChange={(e) => handleChange(e)}
                  placeholder="image URL"
                  name="image"
                  type="text"
                  value={formData.image}
                />
              </div>
              <div className="field">
                <label>Date Created (year)</label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="date_created"
                  placeholder="date created"
                  type="number"
                  value={formData.date_created}
                />
              </div>
            </div>
            <div className="four fields">
              <div className="field">
                <label>Edition</label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="edition"
                  placeholder="edition"
                  type="number"
                  value={formData.edition}
                />
              </div>
              <div className="field">
                <label>Likes</label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="likes"
                  placeholder="likes"
                  type="number"
                  value={formData.likes}
                />
              </div>
              <div className="field">
                <label>Price</label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="price"
                  placeholder="price"
                  type="number"
                  value={formData.price}
                />
              </div>
              <div className="field">
                <label>Category</label>
                <select
                  onChange={(e) => handleCatChange(e)}
                  className="ui dropdown"
                >
                  {renderCategories}
                </select>
              </div>
            </div>
            <div className="field">
              <div className="ui toggle checkbox">
                <input
                  onClick={(e) => handleChecked(e)}
                  type="checkbox"
                  value={formData.featured}
                />
                <label style={{ fontSize: "10px" }}>
                  <b>Featured</b>
                </label>
              </div>
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                onChange={(e) => handleChange(e)}
                name="medium"
                rows={3}
                value={formData.medium}
              />
              {/* <div className="field">
                <label>Do you want to assign a collector?</label>
                <div className="ui mini buttons">
                  <NavLink to="/collectors" className="ui button">
                    Enter new
                  </NavLink>
                  <div className="or" />
                  <div className="ui button" onClick={() => console.log("bye")}>
                    Assign existing
                  </div>
                </div>
              </div> */}
            </div>
            <button className="ui submit button">Submit</button>
          </form>
        </div>
        <div className="column">
          <div className="ui center aligned basic segment">
            <div className="ui icon header">
              <i className="images outline icon" />
              View Gallery
            </div>
          </div>
          <div
            className="ui basic segment"
            style={{ overflow: "auto", maxHeight: 250 }}
          >
            {renderArtworks}
          </div>
          {collectorList.length > 0 ? (
            <div className="ui inverted segment">
              <b>{currentArtwork.title} artworks has been collected by: </b>
              <p />
              {mappedCollectors}
            </div>
          ) : null}
          {categoryList.length > 0 ? (
            <div className="ui inverted segment">
              <b>
                {currentArtwork.title} artwork belongs to:{" "}
                <span style={{ color: "rgba(251, 189, 10, 100" }}>
                  {currentArtwork.category.toUpperCase()}{" "}
                </span>{" "}
                category
              </b>
              <p />
              <p>Categories popularity breakdown below:</p> {mappedCategories}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ArtworksPage;
