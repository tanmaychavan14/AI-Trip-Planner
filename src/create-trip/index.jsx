import { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelOptions } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      console.log('Opening dialog');
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 20 && !formData?.location || !formData?.budget || !formData?.people) {
      toast("Please ensure all questions are answered!")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
      header: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })

  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate('/view-trip/' + docId)
  }


  useEffect(() => {
    console.log("Dialog state: ", openDialog);
  }, [openDialog]);

  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: '#844d31',
      fontWeight: 500
    })
  };

  return (
    <div className="flex justify-center">
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-blue-400 text-5xl' style={{ fontFamily: 'Monotype Corsiva, cursive' }}>Share Your Travel Preferences 🗺️🏝️</h2>
        <p className='mt-3 text-[#4F5A2D] text-xl' style={{ fontWeight: 500 }}>Give a few details about what you like, and we’ll create a personalized itinerary that fits your travel style!</p>

        <div className='mt-12 flex flex-col gap-10'>
          <div>
            <h2 className='text-xl my-3 font-medium text-[#271a14]'>What is your preferred destination?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                styles: customStyles,
              }}
            />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium text-[#271a14]'>How many days will your trip be?</h2>
            <Input placeholder={'3'} type='number'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium text-[#271a14]'>What is your budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div
                  onClick={() => handleInputChange('budget', item.title)}
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                    ${formData?.budget === item.title ? 'shadow-lg border-black' : ''
                    }`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg text-[#271a14]'>{item.title}</h2>
                  <h2 className='text-sm text-[#844d31] whitespace-pre-line' style={{ fontWeight: 500 }}>{item.desc}</h2>
                </div>

              ))}
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium text-[#271a14]'>Who will you be traveling with?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelOptions.map((item, index) => (
                <div
                  onClick={() => handleInputChange('people', item.people)}
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                   ${formData?.people === item.people ? 'shadow-lg border-black' : ''
                    }`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg text-[#271a14]'>{item.title}</h2>
                  <h2 className='text-sm text-[#844d31] whitespace-pre-line' style={{ fontWeight: 500 }}>{item.desc}</h2>
                </div>

              ))}
            </div>
          </div>

        </div>

        <div className='my-10 justify-end flex'>
          <Button
            disabled={loading}
            className='bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'
            onClick={OnGenerateTrip}
          >
            {loading ?
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
            }

          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/assets/logo.svg" width={150} />
                <h2 className='font-bold text-lg mt-5'>Continue with Google Authentication</h2>

                <Button
                  onClick={login}
                  className="w-full mt-5 bg-[#6b493c] text-white hover:border-[#291813] flex gap-2 items-center">

                  <FcGoogle className="w-6" />
                  Sign In With Google

                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip