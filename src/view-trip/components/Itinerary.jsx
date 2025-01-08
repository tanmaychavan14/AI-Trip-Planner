

import PlaceCard from '@/view-trip/components/PlaceCard';

function Itinerary({trip}) {
  return (
    <div>
        <h2 className="font-bold text-lg mt-5">Daily Itinerary</h2>

        <div> 
            {trip.tripData?.itinerary.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className="mt-3"> 
                   
                    <h2 className="font-medium text-lg">{item.day}</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                    {item.plan.map((place, index) =>(
                       // eslint-disable-next-line react/jsx-key
                       <div className="my-3">

                          <h2 className='font-medium text-sm text-[#ff51f6]'>{place.time}</h2>
                           <PlaceCard place={place}/>

                       </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Itinerary
