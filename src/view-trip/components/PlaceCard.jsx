import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { GetPlaceDetails } from '@/service/GlobalAPI';

import { PHOTO_REF_URL } from '@/service/GlobalAPI';


function PlaceCard({place}) {

  const [photoURL, setPhotoURL] = useState();
  
    useEffect(() => {
      place&&GetPlacePhoto();
    }, [place]);
    
    const GetPlacePhoto=async()=> {
  
      const data= {
         textQuery: place.placeName,
      }
  
      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);
  
        const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoURL(photoURL);
      })
  
    }

  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">

        <img src={photoURL?photoURL: "/assets/placeholder.png"} className='w-[150px] h-[150px] rounded-xl object-cover'/>
         
         <div> 
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-sm text-gray-700">{place.placeDetails}</p>
            <h2 className="text-md mt-2 text-[black]">⌛ {place.timeToExplore}</h2>
            <h2 className="text-md mt-2">🎫 {place.ticketPricing}</h2>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
            <Button className='font-normal text-md p-0'>↗️  Get Directions</Button>
            </Link>

         </div>
    
    </div>
  )
}

export default PlaceCard 