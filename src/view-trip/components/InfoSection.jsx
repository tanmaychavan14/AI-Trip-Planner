import { Button } from '@/components/ui/button';
import { FiShare } from "react-icons/fi";
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { useEffect, useState } from 'react';

import { PHOTO_REF_URL } from '@/service/GlobalAPI';

function InfoSection({ trip }) {

  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip&&GetPlacePhoto();
  }, [trip]);
  
  const GetPlacePhoto=async()=> {

    const data= {
       textQuery: trip?.userSelection?.location?.label,
    }

    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);

      const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoURL(photoURL);
    })

  }

  return (
    <div>
      <img src={photoURL? photoURL: "/assets/placeholder.png"} className='h-[350px] w-full object-cover rounded-xl' />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-5xl mt-5 text-blue-400" style={{ fontFamily: 'Monotype Corsiva, cursive' }}>{trip?.userSelection?.location?.label}</h2>

          <div className="flex gap-5 mt-3">
            <h2 className="p-1 px-3 rounded-full bg-[#4F5A2D] text-[white]">📅 {trip.userSelection?.noOfDays} Day(s)</h2>
            <h2 className="p-1 px-3 rounded-full bg-[#4F5A2D] text-[white]">💲{trip.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 rounded-full bg-[#4F5A2D] text-[white]">👨‍👩‍👧‍👦 Number of Travelers: {trip.userSelection?.people}</h2>

          </div>
        </div>

        <Button className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]"><FiShare /> Share Trip</Button>
      </div>
    </div>
  )
}

export default InfoSection