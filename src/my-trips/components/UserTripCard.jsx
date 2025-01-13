import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalAPI';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {

const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
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
    <Link to ={'/view-trip/' + trip?.id} >
    <div className = "hover:scale-105 transition-all hover:shadow-xl">
      <img src={photoURL? photoURL : '/assets/placeholder.png'} className="object-cover rounded-xl mt-5 h-[250px]" />

      <div>
        <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-gray-800"> {trip?.userSelection?.noOfDays} Day(s) trip with a {trip?.userSelection?.budget} Budget for {trip?.userSelection?.people} </h2>

      </div>

    </div>
    </Link>
  )
}

export default UserTripCard
