const apartment=apartmentInfo;
const doctors=doctorInfo;
const stores=storesInfo;
const schools=schoolsInfo;
const restaurants=restaurantsInfo;
class App extends React.Component{
 
  render() {
    const apartmentItems = apartment.map((a) =>
        <div className="card">
           <div className="card-header"><h5> {a.name} </h5></div>
           <div className="card-body">
              <p className="card-title">Category: {a.categories[0].title}</p>
              <p className="card-text">Rating: {a.rating}</p>
              <p className="card-text">Phone:{a.display_phone}</p>
              <a href={a.url} target="_blank" className="btn btn-primary">Details</a>
          </div>
         </div> 
      );
    const doctorItems = doctors.map((d) =>
        <div className="card">
          <div className="card-header"><h5> {d.name} </h5></div>
          <div className="card-body">
            <p className="card-title">Title: {d.categories[0].title} </p>
            <p className="card-text">Rating: {d.rating}</p>
            <p className="card-text">Phone:{d.display_phone}</p>
            <a href={d.url} target="_blank" className="btn btn-primary">Details</a>
          </div>
        </div>
      );
    const storeItems = stores.map((s) =>
        <div className="card">
          <div className="card-header"><h5> {s.name}</h5></div>
          <div className="card-body">
              <p className="card-title">Category: {s.categories[0].title}</p>
              <p className="card-text">Rating: {s.rating}</p>
              <p className="card-text">Phone:{s.display_phone}</p>
              <a href={s.url} target="_blank" className="btn btn-primary">Details</a>
          </div>
        </div> 
      );
    const restaurantItems = restaurants.map((r) => 
        <div className="card">
          <div className="card-header"><h5> {r.name} </h5></div>
          <div className="card-body">
              <p className="card-title">Category: {r.categories[0].title}</p>
              <p className="card-text">Rating: {r.rating}</p>
              <p className="card-text">Phone:{r.display_phone}</p>
              <a href={r.url} target="_blank" className="btn btn-primary">Details</a>
          </div>
        </div> 
      );
    const schoolsItems = schools.map((sc) =>
        <div className="card">
          <div className="card-header"><h5> {sc.name} </h5></div>
          <div className="card-body">
              <p className="card-title">Category: {sc.categories[0].title}</p>
              <p className="card-text">Rating: {sc.rating}</p>
              <p className="card-text">Phone:{sc.display_phone}</p>
              <a href={sc.url} target="_blank" className="btn btn-primary">Details</a>
          </div>
        </div> 
      );
  return (
    <div>
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
