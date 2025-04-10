import { GoogleMap, useJsApiLoader, StandaloneSearchBox, MarkerF } from '@react-google-maps/api'
import { useRef, useState, useCallback } from "react";

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
  
  const [markers, setMarkers] = useState([]);
  const refOrigin = useRef(null);
  const refDestination = useRef(null);
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"]
  })

  console.log(isLoaded);

  const [origin_id, setOrigin_id] = useState(null);
  const handleOnPlacesChanged = () => {
    let address = refOrigin.current.getPlaces();
    console.log(address);
    setOrigin_id(address[0].place_id);

    markerOrigin = { 
      id: 1, 
      position: { 
        lat: address[0].geometry.location.lat(), 
        lng: address[0].geometry.location.lng()
      } 
    }

    updateMarkers();
  }

  
  function updateMarkers(){
    _markers = [];
    if(markerOrigin)
      _markers.push(markerOrigin);
    if(markerDestination)
      _markers.push(markerDestination);

    setMarkers(_markers);
    console.log(markers); 
  }

  const handleOnPlacesChanged2 = () => {
    let address = refDestination.current.getPlaces();
    if(address)
      console.log(address);    

    markerDestination = { 
      id: 2, 
      position: { 
        lat: address[0].geometry.location.lat(), 
        lng: address[0].geometry.location.lng()
      } 
    }

    updateMarkers();
  }

  const containerStyle = {
    width: '100%',
    height: '800px',
  }
  
  const center = {
    lat: 24.593,
    lng: -101.285
  }
  
  let markerOrigin; // = { id: 1, position: { lat: 24.7128, lng: -101.0060 }, name: "A" }
  let markerDestination; // = { id: 2, position: { lat: 26.7306, lng: -102.9352 }, name: "B" }
  var _markers = []; // = [ markerOrigin, markerDestination ];
  //setMarkers(_markers);

  const onLoad = useCallback(function callback(map) {
    console.log("onLoad");

    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center)
    //map.fitBounds(bounds)

    setMap(map)

    /*
    setTimeout(function(){
      setMarkers(_markers);
    }, 5000);*/
    setMarkers(_markers);

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
                          onPlacesChanged={handleOnPlacesChanged}>                        
                          <input type="text" id="txtOrigin" placeholder="Origen" />
                        </StandaloneSearchBox>
                        }
                        {isLoaded && 
                        <StandaloneSearchBox
                          onLoad={(ref) => refDestination.current = ref}
                          onPlacesChanged={handleOnPlacesChanged2}>                        
                          <input type="text" id="txtDestination" placeholder="Destino" />
                        </StandaloneSearchBox>
                        }
                    </div>
                    <input type="button" id="btnQuote" value="Cotizar" onClick={quote} />
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
                  markers.map((marker) => (
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
