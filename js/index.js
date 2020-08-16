var map;
var markers = [] ;
 var infoWindow;
function initMap() {
var Mumbai = {
    lat: 19.0760,
    lng: 72.8777
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: Mumbai,
        zoom: 8
        });
         infoWindow = new google.maps.InfoWindow(); //initialise
      searchStores();
        // displayStores();
        // showStoresMarkers();
  
}


function searchStores(){
var foundStores =[];
  var zipCode = document.getElementById("zip-code-input").value;

  if (zipCode){
// console.log(zipCode);
  stores.forEach(function(store){
var postal = store.address.postalCode.substring(0,6);
  // console.log(postal);

if (postal ==zipCode){
  //show results
foundStores.push(store); 

}
  });
  } else{
foundStores = stores;

  }
clearLocations();  
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
  // console.log(foundStores);
}

function clearLocations(){
infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;

        //  locationSelect.innerHTML = "";
        //  var option = document.createElement("option"); nott needeedddd
        //  option.value = "none";
        //  option.innerHTML = "See all results:";
        //  locationSelect.appendChild(option);

}


function setOnClickListener(){
  // console.log(markers);
  var storeElements = document.querySelectorAll('.store-container');
  // console.log(storeElements);

  storeElements.forEach(function(elem, index){
    elem.addEventListener('click', function(){
      google.maps.event.trigger(markers[index], 'click');

    })
  });
}

function displayStores(stores){
    var storesHtml = "";
    stores.forEach(function(store, index){
        var address = store.addressLines;
        var phone =  store.phoneNumber;
if (phone==null){
  phone="Phone number not available";
}
        storesHtml += ` 
        <div class="store-container">
        <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                           <span> ${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class ="store-number">
                            ${index+1}
                        </div>
                    </div>
                    </div>
                </div>
                `

    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoresMarkers(stores){
    var bounds = new google.maps.LatLngBounds(); //boundary for the map
    stores.forEach(function(store, index){
var latlng = new google.maps.LatLng(
                  store.coordinates.latitude,
                  store.coordinates.longitude);
                  var name = store.name;
                  var address = store.addressLines[0];
                  var statusText = store.openStatusText;
                  var phone = store.phoneNumber;
                  bounds.extend(latlng); //extending boundary by adding new lat long- so if new store goes outside initial boundary then the boundary extends
                  createMarker(latlng, name, address, statusText, phone, index);
    })
    map.fitBounds(bounds); //fit the boundary of the map and zoom into it
}


  function createMarker(latlng, name, address, statusText, phone, index) {
    if (phone==null){
  phone="Phone number not available";
}
          var html = `
          <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${statusText} 
            </div>
            <div class="store-info-address">
           <div class="circle"> <i class="fas fa-location-arrow"></i>
               </div> 
               ${address}
            </div>
            <div class="store-info-phone">
              <div class="circle">
              <i class="fas fa-phone-alt"></i>
                </div>
                ${phone}
            </div>    
          </div>
          `;
        //   "<b>" + name + "</b> <br/>" + address
          var marker = new google.maps.Marker({
            map: map,
            position: latlng,
             label: `${index+1}`
          });
          google.maps.event.addListener(marker, 'click', function() { //content of infowindow to be displayed onclick.
            infoWindow.setContent(html); //click can be changed to hover or mouseover
            infoWindow.open(map, marker);
          });
          markers.push(marker);
        }










