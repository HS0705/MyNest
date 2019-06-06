/*Create global variable map*/

let map;
function initMap() {
          /*Create the map and geocoder */
  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13
          });
  let geocoder = new google.maps.Geocoder();
 
            geocodeAddress(geocoder, map);
          }
/* geocodeAddress function to get the latitude and longitude of the given city,state,usa*/
function geocodeAddress(geocoder, resultsMap) {

  /*Pass the value of the input box'user-address' to the address variable*/

  let address= document.getElementById('user-address').innerHTML;

  /*Geocode method and a function that takes in results and status as arguments */

  geocoder.geocode({'address': address}, function(results, status) {
  /*Check the status*/  

  if (status === 'OK') {
    /* Status ='OK', set the map center with the geometry.location 
       returned by geocoder method */

    resultsMap.setCenter(results[0].geometry.location);

    /* Setup the marker variable*/
    marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
            });
  } else {
          /* Status  not equal to 'OK' display the message along 
            with the status returned*/
          alert('Geocode was not successful for the following reason: ' + status);
          }

    /* Create the google maps PlaceService. */

    let service = new google.maps.places.PlacesService(map);
    let getNextPage = null;

    /* Create variable nextApartmentResultsPage Button*/
    let nextApartmentResultsPage = document.getElementById('more');

    /* Onclick event for the nextApartmentResultsPage button to get the next 
       page of apartment results  */
    nextApartmentResultsPage.onclick = function() {
                          nextApartmentResultsPage.disabled = true;
                          if (getNextPage) getNextPage();
                          };
    /* Google maps textSearch method and disable the nextApartmentResultsPage 
       button if no more results are available */ 
    service.textSearch({location:results[0].geometry.location, 
                        radius: 500, 
                        query:'apartments'},function(results, status, pagination) {
                            if (status !== 'OK') return;
                            createMarkers(results);
                            nextApartmentResultsPage.disabled = !pagination.hasNextPage;
                            getNextPage = pagination.hasNextPage && function() {
                                                    pagination.nextPage();
                                                   };
                      });
    
    /* createMarkers function to create markers and display them on the map */
    function createMarkers(places) {
      let bounds = new google.maps.LatLngBounds();
      let apartmentsList = document.getElementById('places');
      for (let i = 0, place; place = places[i]; i++) {
              let image = {
              url:'/static/images/apt.png',
              size: new google.maps.Size(100, 100),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
              }
              if(place.photos == null) continue;
              let photoUrl = place.photos[0].getUrl({maxWidth: 300, 
                                                     maxHeight: 150});
                  
              let infoWindow = new google.maps.InfoWindow({});
              let marker = new google.maps.Marker({map: map,
                                               icon:image,
                                               title: place.name,
                                               rating: place.rating,
                                               position: place.geometry.location
                                             });
              /*Adding event listener to open a infowimdow when a marker is 
                clicked */
              google.maps.event.addListener(marker,'click', function() {
                    infoWindow.setContent('<div>'
                                          +'<i>'+'<h2 style="color:blue">'
                                          +'Name: '+ this.title +'</h2>'
                                          +'<h2 style="color:green">'
                                          +'User ratings: ' + this.rating+'</h2>'
                                          +'</i>'+'</div>');
                        infoWindow.open(map, this);
                        });
              /*Close the current open infowindow on click */
              google.maps.event.addListener(map, 'click', function() {
                                            infoWindow.close();
                                        });
              /*Create an image element, img  to display apartment photo*/
              let aptCard=document.createElement('div');
              aptCard.className='card';
              // let aptHeader=document.createElement('div');
              // aptHeader.className='card-header';
              let img = document.createElement('img');
              img.className='card-img-top';
              img.setAttribute('src', photoUrl);  
              let aptBody=document.createElement('div');
              aptBody.className='card-body';
              

              /*Create Apartment Card and add the apartment names to
                the apartmentsList*/

                let cardTitle = document.createElement('h5');
                cardTitle.className='card-title';
                cardTitle.textContent = place.name; 
                let cardText=document.createElement('p');
                cardText.className='card-text';
                cardText.textContent=`${place.name} has ${place.rating}`;
                //let aptUrl= document.createElement('a');

                // img.onclick= function () {
                //   window.location.href=`/information/${place.formatted_address}`;
                // }
                let getInfo=document.createElement('a');
                getInfo.className='btn btn-primary';
                getInfo.innerHTML='Get Info';
                getInfo.href=`/information/${place.formatted_address}`;
                let favBtn=document.createElement('Button');
                favBtn.innerHTML='Favorites';
                aptBody.appendChild(cardTitle);
                aptBody.appendChild(cardText);
                aptBody.appendChild(getInfo);
                aptBody.appendChild(favBtn);
                aptCard.appendChild(img);
                aptCard.appendChild(aptBody);
                apartmentsList.appendChild(aptCard);

                        
              bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);
            };
});
} 