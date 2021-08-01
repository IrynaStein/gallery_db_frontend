function Collector({ collector, showArtworks, onCollectorDelete }) {
  const { first_name, last_name, email, address, phone, id } = collector;

  return (
    <div className="ui list">
      <div className="item">
        <i className="user circle icon" />
        <div className="content">
          {first_name} {last_name}&nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <div className="item">
        <i className="id card outline icon"></i>
        <div className="content">
          collector id: <b>{id}</b>
        </div>
      </div>
      <div className="item">
        <i className="marker icon" />
        <div className="content">{address}</div>
      </div>
      <div className="item">
        <i className="mail icon" />
        <div className="content">
          <a href="mailto:jack@semantic-ui.com">
            <b>{email}</b>
          </a>
        </div>
      </div>
      <div className="item">
        <i className="phone icon"></i>
        <div className="content">{phone}</div>
      </div>
      <div className="ui blue mini inverted segment">
        <i
          className="trash alternate outline icon"
          style={{ cursor: "pointer" }}
          onClick={
            collector.id !== 1111 ? () => onCollectorDelete(collector) : null
          }
        ></i>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <i className="edit outline icon" 
        style={{ cursor: "pointer" }} 
        onClick={collector.id !== 1111 ? () => console.log("edit collector info") : null}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        <i
          className="images outline icon"
          style={{ cursor: "pointer" }}
          onClick={collector.id !== 1111 ? () => showArtworks(collector) : null}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <i
          className="chart line icon"
          style={{ cursor: "pointer" }}
          onClick={collector.id !== 1111 ? () => console.log("show stats") : null}
        /> */}
      </div>
    </div>
  );
}

export default Collector;
