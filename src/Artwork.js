function Artwork({artwork}){
  const {image, title, medium} = artwork
console.log(artwork)
    return (

        <div className="ui list">
        <div className="item">
          <img className="ui avatar image" src={image} alt="artwork"/>
          <div className="content">
            <p className="header">{title}</p>
            <div className="description">{medium}</div>
          </div>
        </div>
      </div>
     
    )
}

export default Artwork;