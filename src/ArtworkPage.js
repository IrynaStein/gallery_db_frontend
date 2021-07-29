import { useState } from "react";
import Artwork from "./Artwork";

function ArtworksPage({ artworks, categories }) {
  const defaultForm = {
    title: "",
    category: "",
    date_created: 0,
    edition: 0,
    price: 0,
    likes: 0,
    featured: false,
    medium: "",
  };
  const [formData, setFormData] = useState(defaultForm);
  console.log(artworks);
  console.log(categories);

  const renderArtworks = artworks.map((artwork) => (
    <Artwork key={artwork.id} artwork={artwork} />
  ));

  const renderCategories = categories.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));

  function handleChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleChecked(e) {
    console.log(e.target.checked);
    setFormData({ ...formData, featured: e.target.checked });
  }

  function handleCatChange(e) {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, category: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormData(formData);
    console.log(formData);
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
    fetch("http://localhost:9393/artworks", configObj)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    setFormData(defaultForm);
  }

  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <div className="column">
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
                  {/* <option value={1}>Superheroes</option>
                  <option value={0}>Pop Culture</option>
                  <option value={2}>Flowers</option>
                  <option value={3}>Yoga</option>
                  <option value={4}>Abstract</option> */}
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
            </div>
            <button className="ui submit button">Submit</button>
          </form>
        </div>
        <div className="column" style={{ overflow: "auto", maxHeight: 400 }}>
          {renderArtworks}
        </div>
      </div>
      <div className="ui vertical divider">OR</div>
    </div>
  );
}

export default ArtworksPage;
