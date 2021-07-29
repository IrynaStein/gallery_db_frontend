import Collector from "./Collector";
import { useEffect, useState } from "react";

function CollectorPage() {
  const [collectors, setCollectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const defaultCollector = {
    id: 123,
    first_name: "name",
    last_name: "last name",
    email: "email@me.com",
    full_address: "123 Captains Row, apt 310, MDR, CA 90292",
    phone_num: "702-335-1320",
  };
  useEffect(() => {
    fetch("http://localhost:9393/collectors")
      .then((resp) => resp.json())
      .then((data) => {
        setCollectors(data.collectors);
        console.log(data);
      });
  }, []);
  console.log(collectors);
  console.log(searchTerm);

  function handleChange(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  }

  const searchedCollectors = collectors
    .filter((collector) =>
      collector.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((collector) => <Collector collector={collector} key={collector.id} />);
  

  //   const displayCollectors = () => {
  //     if (searchedCollectors.length = 0){
  //         <Collector collector={defaultCollector}/>
  //     }
  //     else {
  //    const displayCollectors = searchedCollectors.map((collect›or) => (
  //         <Collector collector={collector} key={collector.id}/>
  //       ))
  //     }
  //   }
  //   console.log(displayCollectors)

  return (
    <div className="ui segment">
      <div className="ui two column stackable center aligned grid">
        <div className="ui vertical divider">Or</div>

        <div className="column">
          <div className="ui mini form">
            <div className="three fields">
              <div className="field">
                <label>First Name</label>
                <input placeholder="First Name" type="text" />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input placeholder="Last Name" type="text" />
              </div>
              <div className="field">
                <label>E-mail</label>
                <input type="email" placeholder="joe@schmoe.com" />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Address</label>
                <input placeholder="address" type="text" />
              </div>
              <div className="field">
                <label>Phone number</label>
                <input placeholder="phone number" type="text" />
              </div>
            </div>
            <div className="ui submit button">Submit</div>
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
              {/* <div class="ui list">{displayCollectors}</div> */}
              {searchedCollectors}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectorPage;
