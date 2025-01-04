import { useState, useEffect } from 'react';
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
  DialogTitle,
} from "@/components/ui/dialog"


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 20 && !formData?.location || !formData?.budget || !formData?.people) {
      toast("Please ensure all questions are answered!")
      return;
    }
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT)
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  }

  return (
    <div className="flex justify-center">
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-blue-400 text-3xl'>Share Your Travel Preferences 🗺️🏝️</h2>
        <p className='mt-3 text-amber-800 text-xl'>Give a few details about what you like, and we’ll create a personalized itinerary that fits your travel style.</p>

        <div className='mt-20 flex flex-col gap-10'>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is your preferred destination?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) }
              }}
            />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>How many days will your trip be?</h2>
            <Input placeholder={'3'} type='number'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div
                  onClick={() => handleInputChange('budget', item.title)}
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                    ${formData?.budget === item.title ? 'shadow-lg border-black' : ''
                    }`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500 whitespace-pre-line'>{item.desc}</h2>
                </div>

              ))}
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>Who will you be traveling with?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelOptions.map((item, index) => (
                <div
                  onClick={() => handleInputChange('people', item.people)}
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                   ${formData?.people === item.people ? 'shadow-lg border-black' : ''
                    }`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500 whitespace-pre-line'>{item.desc}</h2>
                </div>

              ))}
            </div>
          </div>

        </div>

        <div className='my-10 justify-end flex'>
          <Button
            className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'
            onClick={OnGenerateTrip}
          >Generate Trip
          </Button>
        </div>

        <Dialog open={openDialog}>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <img src="/logo.svg"/>
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>Sign in to the app with Google Authentication</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

    </div >

  )
}

export default CreateTrip