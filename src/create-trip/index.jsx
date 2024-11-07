import React, {useState} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="flex justify-center">
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-blue-400 text-3xl'>Share Your Travel Preferences 🗺️🏝️</h2>
      <p className='mt-3 text-amber-800 text-xl'>Give a few details about what you like, and we’ll create a personalized itinerary that fits your travel style.</p>
    
    <div className='mt-20'>
      <div>
       <h2 className='text-xl my-3 font-medium'>What is your preferred destination?</h2>
       <GooglePlacesAutocomplete
         apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
         selectProps={{
          place,
          onChange: (v) =>{setPlace(v); console.log(v)}
         }}
       />
      </div>
    </div>
    
    </div>
    </div>
  )
}

export default CreateTrip