import Collector from "./Collector";
import { Input } from "semantic-ui-react";
import { useEffect, useState } from "react";

function CollectorPage({artworks}) {
  const {title, id} = artworks
  const [collectors, setCollectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [collectorArtworks, setCollectorArtworks] = useState([]);

  const defaultForm = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    art_id: [],
  };
  const [formData, setFormData] = useState(defaultForm);

  const defaultCollector = [
    {
      id: 1111,
      first_name: "John",
      last_name: "Doe",
      email: "JDemail@me.com",
      address: "4545 LaJolla Village Dr, San Diego, CA 92122",
      phone: "310-123-4567",
    },
  ];
  const mappedDefault = defaultCollector.map((collector) => (
    <Collector collector={collector} key={collector.id} />
  ));

  const mappedArtworks = artworks.map((aw) => (
    <option key={aw.id} value={aw.title}>{aw.title}</option>
  ))

  useEffect(() => {
    fetch("http://localhost:9393/collectors")
      .then((resp) => resp.json())
      .then((data) => {
        setCollectors(data.collectors);
      });
  }, []);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function dataListChange(e){
    console.log(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
    const configObj = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        // line 62 change to send an array of all art id's
        art_id_1: parseInt(formData.art_id_1),
      }),
    };
    fetch("http://localhost:9393/collectors", configObj)
      .then((resp) => resp.json())
      .then((data) => setCollectors([...collectors, data.collector]));
    setFormData(defaultForm);
  }

  const searchedCollectors = collectors
    .filter(
      (collector) =>
        collector.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collector.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((collector) => (
      <Collector
        collector={collector}
        key={collector.id}
        showArtworks={showArtworks}
        onCollectorDelete={onCollectorDelete}
      />
    ));

  function showArtworks(collector) {
    fetch(`http://localhost:9393/collectors/${collector.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setCollectorArtworks(data.artworks);
      });
  }
  const mappedArtworksByCollector = collectorArtworks.map((artwork, i) => (
    <div key={artwork.id}>
      {i + 1}.{" "}
      <span style={{ color: "rgba(33, 133, 208, 100)" }}>
        <b>{artwork.title}</b>{" "}
      </span>
      , category: {artwork.category}
    </div>
  ));

  function onCollectorDelete(coll) {
    fetch(`http://localhost:9393/collectors/${coll.id}`, {
      method: "DELETE",
    });
    const deletedCollectors = collectors.filter((c) => c.id !== coll.id);
    setCollectors(deletedCollectors);
  }

  return (
    <div className="ui segment">
      <div className="ui two column stackable center aligned grid">
        <div className="ui vertical divider">Or</div>

        <div className="column">
          <div className="ui icon header">
            <i className="user outline icon" />
            Add New Collector
          </div>
          <form
            onSubmit={handleSubmit}
            className="ui mini form"
            style={{ margin: "20px" }}
          >
            <div className="three fields">
              <div className="field">
                <label>First Name</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                />
              </div>
              <div className="field">
                <label>E-mail</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  type="email"
                  placeholder="joe@schmoe.com"
                  name="email"
                  value={formData.email}
                />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Address</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="address"
                  type="text"
                  name="address"
                  value={formData.address}
                />
              </div>
              <div className="field">
                <label>Phone number</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="phone number"
                  type="text"
                  name="phone"
                  value={formData.phone}
                />
              </div>
            </div>
            {/* <div className="five fields">
              <div className="field">
                <label>Artwork ID*</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="artwork id#1"
                  type="number"
                  name="art_id_1"
                  value={formData.art_id_1}
                />
              </div>
              <div className="field">
                <label>Artwork ID*</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  placeholder="artwork id#2"
                  type="number"
                  name="art_id_2"
                  value={formData.art_id_2}
                />
              </div>
            </div> */}
             <div className="two fields">
            <div className="field">
              <Input list="artworks" name="art_id" placeholder="Choose artwork..." onChange={(e)=>dataListChange(e)}/>
              <datalist id="artworks">
              {mappedArtworks}
              </datalist>
            </div>
            <div className="field">
              <Input list="artworks" name="art_id" placeholder="Choose artwork..." onChange={(e)=>dataListChange(e)}/>
              <datalist id="artworks">
              {mappedArtworks}
              </datalist>
            </div>
            </div>
            <button className="ui submit button">Submit</button>
          </form>
          <div
            className="ui left aligned basic segment"
            style={{ fontSize: "9px" }}
          >
            * optional fileds
          </div>
        </div>

        <div className="column">
          <div className="ui icon header">
            <i className="search icon" />
            Find Collector
          </div>
          <div className="field">
            <div className="ui search">
              <div className="ui icon input">
                <input
                  onChange={handleChange}
                  className="prompt"
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                />
                <i className="search icon" />
              </div>
              <div
                className="ui left aligned inverted segment"
                style={{ overflow: "auto", maxHeight: 190 }}
              >
                {searchTerm.length > 0 ? searchedCollectors : mappedDefault}
              </div>

              <div className="ui left aligned inverted segment">
                {collectorArtworks.length > 0 ? (
                  <div>
                    Artworks in this collection: {mappedArtworksByCollector}
                  </div>
                ) : (
                  "Choose a collector to see more details"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectorPage;
