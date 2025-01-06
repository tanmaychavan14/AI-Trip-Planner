



function InfoSection({trip}) {
  return (
    <div>
        <img src='/assets/placeholder.png' className='h-[350px] w-full object-cover rounded-xl'/>
    
    <div className="my-5 flex flex-col gap-2">
      <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
    </div>
        <div className="flex gap-5"> 
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-grey-600">📅 {trip.userSelection?.noOfDays} Day(s)</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-grey-600">💲{trip.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-grey-600">👨‍👩‍👧‍👦 Number of travelers: {trip.userSelection?.people}</h2>

        </div>
    </div>
  )
}

export default InfoSection