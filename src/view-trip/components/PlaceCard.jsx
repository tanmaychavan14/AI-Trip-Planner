import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function PlaceCard({place}) {
  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">

        <img src="/assets/placeholder.png" className='w-[150px] h-[150px] rounded-xl'/>
         
         <div> 
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-sm text-gray-700">{place.placeDetails}</p>
            <h2 className="text-md mt-2">⌛ {place.timeToExplore}</h2>
            <h2 className="text-md mt-2">🎫 {place.ticketPricing}</h2>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
            <Button className='font-normal text-md p-0'>↗️  Get Directions</Button>
            </Link>

         </div>
    
    </div>
  )
}

export default PlaceCard