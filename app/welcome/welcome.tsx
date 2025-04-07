import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef, useState } from "react";

export function Welcome() {
  function quote(){
    console.log("quote");
  }

  function refresh(){
    location.reload();
  }

  function schedule(){
    console.log("schedule");
  }
  
  const refOrigin = useRef(null);
  const refDestination = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"]
  })

  console.log(isLoaded);

  const handleOnPlacesChanged = () => {
    let address = refOrigin.current.getPlaces();
    console.log(address);
  }
  
  const handleOnPlacesChanged2 = () => {
    if(refDestination)
      console.log(refDestination.current.getPlaces());    
  }

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
                          <input type="text" id="txtOrigin2" placeholder="Origen" />
                        </StandaloneSearchBox>
                        }
                        {isLoaded && 
                        <StandaloneSearchBox
                          onLoad={(ref) => refDestination.current = ref}
                          onPlacesChanged={handleOnPlacesChanged2}>                        
                          <input type="text" id="txtDestination2" placeholder="Destino" />
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
            </div>
        </div>
    </main>
  );
}

const resources = [
  
];
