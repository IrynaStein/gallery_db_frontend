function Collector({collector=[]}) {
  const {first_name, last_name, email, full_address, phone_number} = collector
  {
    /* <div className="item" key={sC.id}>
<i className="blue user circle icon"></i>{sC.first_name} {sC.last_name}
</div> */
  }
  return (
    <div className="ui list">
    <div className="item">
      <i className="users icon" />
      <div className="content">{first_name}</div>
    </div>
    <div className="item">
      <i className="marker icon" />
      <div className="content">New York, NY</div>
    </div>
    <div className="item">
      <i className="mail icon" />
      <div className="content">
        <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
      </div>
    </div>
  </div>
  )

}

export default Collector;

// t.string "first_name"
// t.string "last_name"
// t.string "email"
// t.string "full_address"
// t.string "phone_num"
