function Artwork({ artwork, onDelete, showCollectors, showCategories }) {
  const {
    image,
    title,
    medium,
    likes,
    price,
    edition,
    date_created,
    featured,
    category,
  } = artwork;

  return (
    <div className="ui items">
      <div className="item">
        <img className="ui small image" src={image} alt="artwork" />
        <div className="content">
          <p className="header" style={{ color: "rgba(33, 133, 208, 100)" }}>
            {title}
          </p>
          <div className="meta">
            <p>
              <b>category: </b>
              {category}
            </p>
            <i className="blue heart outline icon">&nbsp;&nbsp;{likes}</i>
          </div>
          <p className="description">{medium}</p>
          <p>
            <b>price:</b> {price}&nbsp;&nbsp;&nbsp;&nbsp;<b>edition:</b>{" "}
            {edition}&nbsp;&nbsp;&nbsp;&nbsp;<b>year:</b> {date_created}
            &nbsp;&nbsp;&nbsp;&nbsp;<b>featured image:</b>{" "}
            {featured ? "yes" : "no"}
          </p>
          <div className="ui blue mini segment">
            <i
              className="blue trash alternate outline icon"
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(artwork)}
            ></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i
              className="blue edit outline icon"
              style={{ cursor: "pointer" }}
            ></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i
              className="blue users icon"
              style={{ cursor: "pointer" }}
              onClick={() => showCollectors(artwork)}
            ></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i
              className="blue list alternate outline icon"
              style={{ cursor: "pointer" }}
              onClick={() => showCategories(artwork)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artwork;
