import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';

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
      
            <Popover>
              <PopoverTrigger>
              <img src={user?.picture} className=" h-[35px] w-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent className="bg-white">
                <h2 className="cursor-pointer" onClick={() => { 
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                 }}>Log Out</h2>
              </PopoverContent>
            </Popover>

          </div>

          :

          <Button className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>

        }

      </div>
    </div>
  )
}

export default Header