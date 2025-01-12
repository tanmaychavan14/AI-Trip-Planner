
import HotelCard from '@/view-trip/components/HotelCard';

function Hotels({ trip }) {
    return (
        <div>


            <h2 className="font-bold text-xl mt-5"> Hotel Recommendations</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

                {trip?.tripData?.hotels?.map((hotel, index) => (

                    // eslint-disable-next-line react/jsx-key
                 <HotelCard hotel={hotel} />

                ))}

            </div>

        </div>
    )
}

export default Hotels