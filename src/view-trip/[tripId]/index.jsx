import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig'; // Adjust the path to your firebase configuration file

function ViewTrip() {

const {tripId} = useParams();

const GetTripData =async()=> {
    const docRef=doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
}
  return (
    <div> ViewTrip: {tripId}</div>
  )
}

export default ViewTrip