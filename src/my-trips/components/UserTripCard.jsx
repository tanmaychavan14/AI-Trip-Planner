import React from 'react'

function UserTripCard({trip}) {
  return (
    <div> 
        <img src="/assets/placeholder.png" className="object-cover rounded-xl mt-5" />
    
    <div> 
        <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-gray-800"> {trip?.userSelection?.noOfDays} Day(s) trip with a {trip?.userSelection?.budget} Budget for {trip?.userSelection?.people} </h2>
    
    </div>
    
    </div>
  )
}

export default UserTripCard
