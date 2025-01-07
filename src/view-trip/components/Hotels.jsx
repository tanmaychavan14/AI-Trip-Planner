
import { Link } from 'react-router-dom';

function Hotels({trip}) {
  return (
    <div>
    

        <h2 className="font-bold text-xl mt-5"> Hotel Recommendations</h2>

         <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"> 

           {trip?.tripData?.hotels?.map((hotel, index) => (

            // eslint-disable-next-line react/jsx-key
            <Link to={'https://www.google.com/maps/search/?api=1&query=centurylink+field' + hotel?.hotelAddress} target="_blank">
                <div className="hover:scale-105 transition-all cursor-pointer">   
                    <img src="/assets/placeholder.png"  className="rounded-xl"/>
                    
                    <div className="my-3 flex flex-col gap-2"> 
 
                      <h2 className="font-medium">{hotel?.hotelName}</h2>
                      <h2 className="text-xs text-gray-700">📍{hotel?.hotelAddress}</h2>
                      <h2 className="text-sm">💰{hotel?.price}</h2>
                      <h2 className="text-sm">⭐{hotel?.rating}</h2>


                    </div>
                 </div>
                 </Link>

           ))}

         </div>

    </div>
  )
}

export default Hotels