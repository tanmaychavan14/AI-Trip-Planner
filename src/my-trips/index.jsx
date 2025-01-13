import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, [])

    /**
     * Used to get all user trips
     * @returns 
     */
    const GetUserTrips = async() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

        setUserTrips([]);
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()]);
        });
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips</h2>

            <div> 
              {userTrips.map((trip, index)=> (

              ))}
            </div>
        </div>
    )
}

export default MyTrips