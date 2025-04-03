import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalAPI';

import { PHOTO_REF_URL } from '@/service/GlobalAPI';

function HotelCard({hotel}) {

   const [photoURL, setPhotoURL] = useState();
   
     useEffect(() => {
       hotel&&GetPlacePhoto();
     }, [hotel]);
     
     const GetPlacePhoto=async()=> {
   
       const data= {
          textQuery: hotel?.hotelName,
       }
   
       const result = await GetPlaceDetails(data).then(resp => {
         console.log(resp.data.places[0].photos[3].name);
   
         const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
         setPhotoURL(photoURL);
       })
   
     }

  return (
            <div className="relative hover:scale-105 transition-all cursor-pointer mt-5 hover:shadow-2xl" style={{position: 'relative', padding: '10px', borderRadius: '10px'}}>
    
                            <img src={photoURL?photoURL: "/assets/placeholder.png"} className="rounded-xl h-[220px] w-full object-cover" />

                            {/* <img 
    src={photoURL || hotel?.hotelImageUrl || "/assets/placeholder.png"} 
    className="rounded-xl h-[220px] w-full object-cover" 
    alt={hotel?.hotelName} */}
/>


    
                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target="_blank">
                                <div className="absolute top-0 right-0">
                                    <Button className="border-[#844d31]"><FaLocationDot /></Button>
                                </div>
                            </Link>
    
                            <div className="my-3 flex flex-col gap-2">
                                <h2 className="font-medium" style={{ fontWeight: 600 }}>{hotel?.hotelName}</h2>
                                <h2 className="text-xs text-[#844d31]" style={{ fontWeight: 500 }}>📍{hotel?.hotelAddress}</h2>
                                <h2 className="text-sm text-[#844d31]" style={{ fontWeight: 500 }}>💰{hotel?.price}</h2>
                                <h2 className="text-sm text-[#844d31]" style={{ fontWeight: 500 }}>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
  )
}

export default HotelCard;
 