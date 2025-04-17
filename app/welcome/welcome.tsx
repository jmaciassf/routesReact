import { GoogleMap, useJsApiLoader, StandaloneSearchBox, MarkerF } from '@react-google-maps/api'
import { useRef, useState, useCallback, useEffect  } from "react";
//import axios from "axios";

//import unirest from "unirest";


export function Welcome() {
  function quote(){
    console.log("quote");

    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:"+origin_id+"&destinations=place_id:EiNBdi4gQXN0dXJlcyAxMDgsIDY2NjA3IE4uTC4sIE1leGljbyIwEi4KFAoSCaf-MpYF7WKGERgLIMcItFT6EGwqFAoSCWMk3Z8F7WKGEVdw9jz0oFZz&key="+import.meta.env.VITE_GOOGLEMAPS_API_KEY;
    console.log(url);
  }

  function refresh(){
    location.reload();
  }

  function schedule(){
    console.log("schedule");
  }
  
  const [markerOrigin, setMarkerOrigin] = useState(null);
  const [markerDestination, setMarkerDestination] = useState(null);
  const [markers, setMarkers] = useState([]);
  const refOrigin = useRef(null);
  const refDestination = useRef(null);
  const [map, setMap] = useState(null);
  const [origin_id, setOrigin_id] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"]
  })

  console.log("isLoaded: " + isLoaded);

  const getDirections = () => {
    console.log("getDirections");

    console.log("_markers.length: " + _markers.length);
    if(_markers.length == 2){


      let url = 
        "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial"+
        "&origins=place_id:"+_markers[0].place_id+
        "&destinations=place_id:"+_markers[1].place_id+
        "&key="+import.meta.env.VITE_GOOGLEMAPS_API_KEY;

      fetch(url)
      .then(results => results.json())
      .then(data => {
        
        console.table(data);

        let elements = data.rows[0].elements[0];
        let _distance = elements.distance;
        console.log("Elements: ");
        console.log(elements);
        console.log("Distance: ");
        console.log(_distance);
        setDistance(_distance.text);
        setTime(elements.duration.text);
      })
      .catch(err => {
        console.log(err);
        setDistance(0);
        setTime(0);
      });
      
return;


      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        withCredentials: false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      
      axios.request(config)
      .then((response) => {
        console.table(response.data);

        let elements = response.data.rows[0].elements[0];
        let _distance = elements.distance;
        console.log("Elements: ");
        console.log(elements);
        console.log("Distance: ");
        console.log(_distance);
        setDistance(_distance.text);
        setTime(elements.duration.text);
      })
      .catch((error) => {
        console.log(error);
      });

    }
  }

  useEffect(() => {
    console.log(`useEffect`);
    getDirections();
  });

  const handleOnPlacesChangedOrigin = () => {
    console.log("handleOnPlacesChangedOrigin");
    let address = refOrigin.current.getPlaces();
    console.log(address);

    if(address){
      let a = address[0];
      console.log("Selected: " + a.formatted_address);
      
      setOrigin_id(a.place_id);

      let jOrigin = { 
        id: 1,
        place_id: a.place_id,
        position: { 
          lat: a.geometry.location.lat(), 
          lng: a.geometry.location.lng()
        },
        text: a.formatted_address
      }

      console.log("jOrigin");
      console.log(jOrigin);

      setMarkerOrigin(jOrigin);
    }
  }

  const handleOnPlacesChangedDestination = () => {
    console.log("handleOnPlacesChangedDestination");
    let address = refDestination.current.getPlaces();
    if(address){
      console.log(address);    

      let a = address[0];

      let jDestination = { 
        id: 2, 
        place_id: a.place_id,
        position: { 
          lat: a.geometry.location.lat(), 
          lng: a.geometry.location.lng()
        },
        text: a.formatted_address
      }

      setMarkerDestination(jDestination);
    }
  }

  const containerStyle = {
    width: '100%',
    height: '800px',
  }
  
  const center = {
    lat: 24.593,
    lng: -101.285
  }
  
  var _markers = [];
  if(markerOrigin)
    _markers.push(markerOrigin);
  if(markerDestination)
    _markers.push(markerDestination);

  const onLoad = useCallback(function callback(map) {
    console.log("onLoad");

    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center)
    //map.fitBounds(bounds)

    setMap(map);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <main>
        <div className="topFixed">
            <div className="header flex">

                <div className="divLogo">
              
                    <span className="name logo"></span>
                </div>
                <span className="link" onClick={refresh}>Reservar</span>
            </div> 
        </div>
        
        <div className="section1 divInputs">
            <div className="content">
                <div className="line1 flex">
                    <div className="divOrigin flex flex1">
                        {isLoaded && 
                        <StandaloneSearchBox
                          onLoad={(ref) => refOrigin.current = ref}
                          onPlacesChanged={handleOnPlacesChangedOrigin}>                        
                          <input type="text" id="txtOrigin" placeholder="Origen" />
                        </StandaloneSearchBox>
                        }
                        {isLoaded && 
                        <StandaloneSearchBox
                          onLoad={(ref) => refDestination.current = ref}
                          onPlacesChanged={handleOnPlacesChangedDestination}>                        
                          <input type="text" id="txtDestination" placeholder="Destino" />
                        </StandaloneSearchBox>
                        }
                    </div>
                    <input type="button" id="btnQuote" value="Cotizar" onClick={quote} />

                    &nbsp;Distancia: {distance}
                    &nbsp;Tiempo: {time}
                </div>
                <div className="dates">

                </div>
                <div id="divResult">
                    Total: $<span id="lblTotal"></span>
                    <input type="button" id="btnSchedule" value="Agendar viaje" onClick={schedule} />
                </div>

                <div id="divMap">
                  
                {isLoaded && 
                  <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={6}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {
                  
                  /* Child components, such as markers, info windows, etc. */
                  // Coloca AdvancedMarkers en el mapa
                  _markers.map((marker) => (
                    //markers.map((marker) => (
                    <MarkerF key={marker.id} position={marker.position}>
                      
                    </MarkerF>
                  ))
                  }
                  <></>
                </GoogleMap>
                  }
                </div>
            </div>
        </div>
    </main>
  );
}

const resources = [
  
];
