import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);
  })

  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5'>
      <img src='/assets/logo.svg' width={150} />

      <div>
        {user ?

          <div className='flex items-center gap-5'>
            <Button variant="outline" className="bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full">My Trips</Button>
            <img src={user?.picture} className=" h-[45px] w-[45px] rounded-full"/>
          </div> :

          <Button className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>

        }

      </div>
    </div>
  )
}

export default Header