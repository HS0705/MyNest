const doctors=doctorInfo;
const stores=storesInfo;
const schools=schoolsInfo;
const restaurants=restaurantsInfo;
class App extends React.Component{
 
  render() {
    const doctorItems = doctors.map((d) =>
      <React.Fragment>
      <li>Name: {d.name}</li>
      <li>Rating: {d.rating}</li>
      <li>Url: {d.url}</li>
     </React.Fragment> 
      );
    const storeItems = stores.map((s) =>
    <React.Fragment>
      <li>Name: {s.name}</li>
      <li>Rating: {s.rating}</li>
      <li>Url: {s.url}</li>
     </React.Fragment> 
      );
    const restaurantItems = restaurants.map((r) => 
      <React.Fragment>
      <li>Name: {r.name}</li>
      <li>Rating: {r.rating}</li>
      <li>Url: {r.url}</li>
     </React.Fragment> 
      );
    const schoolsItems = schools.map((sc) =>
     <React.Fragment>
      <li>Name: {sc.name}</li>
      <li>Rating: {sc.rating}</li>
      <li>Url: {sc.url}</li>
     </React.Fragment> 
      );
  return (
    <div>
      <h1>Information </h1>
      <MyTabs>
      <div label="Home">
        <p>Sample Home Text</p>
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
