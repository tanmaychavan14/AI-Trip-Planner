import PlaceCard from '@/view-trip/components/PlaceCard';

function Itinerary({trip}) {
  return (
    <div>
        <h2 className="text-2xl mt-10 text-[#271a14]" style={{fontWeight: 500}}><i>Daily Itinerary</i></h2>

        <div className="mt-6"> 
            {trip.tripData?.itinerary.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className="mt-3"> 
                   
                    <h2 className="font-medium text-xl text-[#271a14]" style={{fontWeight: 600}}>{item.day}</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                    {item.plan.map((place, index) =>(
                       // eslint-disable-next-line react/jsx-key
                       <div className="my-3">

                          <h2 className='font-medium text-sm text-[#4F5A2D]' style={{fontWeight: 600}}>{place.time}</h2>
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
