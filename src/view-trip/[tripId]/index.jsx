import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '@/view-trip/components/InfoSection';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    /**
     * Used to get trip information form the firebase db 
     */
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document:', docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log('No trip found!');
            toast('No trip found!');
        }
    }
    return (
        <div> 
            {/*Information Section/Image*/}
            <InfoSection trip={trip} />
            {/*Recommended Hotels */}

            {/*Daily Itinerary */}

            {/*Footer*/}
        </div>
    )
}

export default ViewTrip