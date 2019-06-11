const apartment=apartmentInfo;
const doctors=doctorInfo;
const stores=storesInfo;
const schools=schoolsInfo;
const restaurants=restaurantsInfo;
class App extends React.Component{
 
  render() {
    const apartmentItems = apartment.map((a) =>
      <React.Fragment>
      <div className="apt">
        <h3> {a.name}</h3>
        <h5>Rating: {a.rating}</h5>
        <a href={a.url} target="_blank">Details</a>
      </div>
     </React.Fragment> 
      );
    const doctorItems = doctors.map((d) =>
      <React.Fragment>
      <div className="doct">
        <h3> {d.name}</h3>
        <h5>Rating: {d.rating}</h5>
        <a href={d.url} target="_blank">Details</a>
      </div>
     </React.Fragment> 
      );
    const storeItems = stores.map((s) =>
    <React.Fragment>
      <div className="retail">
        <h3> {s.name}</h3>
        <h5>Rating: {s.rating}</h5>
        <a href={s.url} target="_blank">Details</a>
      </div>
     </React.Fragment> 
      );
    const restaurantItems = restaurants.map((r) => 
      <React.Fragment>
      <div className="food">
        <h3> {r.name}</h3>
        <h5>Rating: {r.rating}</h5>
        <a href={r.url} target="_blank">Details</a>
      </div>
     </React.Fragment> 
      );
    const schoolsItems = schools.map((sc) =>
     <React.Fragment>
      <div className="edu">
        <h3> {sc.name}</h3>
        <h5>Rating: {sc.rating}</h5>
        <a href={sc.url} target="_blank">Details</a>
      </div>
     </React.Fragment> 
      );
  return (
    <div>
      <h1>Information </h1>
      <MyTabs>
      <div label="Home">
        {apartmentItems}
      </div>
      <div label="Doctors"> 
             { doctorItems }

      </div>
      <div label="Stores">
              { storeItems }
      </div>
      <div label="School">
        {schoolsItems}
      </div>
      <div label="Restaurant">
        {restaurantItems}
      </div>
    </MyTabs>
    </div>
  );
}
}
const domContainer = document.getElementById('root');
ReactDOM.render(<App /> , domContainer);
