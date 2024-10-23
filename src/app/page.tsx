import Image from "next/image";
import { FaBell } from "react-icons/fa"

export default function Home() {
  return (
    <div className="w-[1,512px] h-[85px] relative [-1px] border pt-[16px] pr-[36px] pb-[16px] pl-[36px]">
        <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px]">
                BookaThon 
              </h1>
        </div>
        <div className="w-[1,062px] h-[53px] flex justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="w-[238px] h-[25px]">
              <div className="w-[67px] h-[25px]">
             <p className="text-[#0661E8] font-sans text-[14px] leading-[25.14px]">
              Library
             </p>
             <div className="w-[83px] h-[25px] font-sans relative bottom-[25px] left-[100px]">
             <span className="text-[14px] leading-[25.14px] w-[400px]">
               My Shelf 
             </span>
             </div>

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[800px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
               <Image 
               src='/user-avatar.jpg'
               alt="Avatar"
               width={44}
               height={46}
               className="rounded-full cursor-pointer"
               >
               </Image>
              </FaBell>  
            </div> 

             </div>
            </div>
        </div>

        <div className="w-[195px] h-[40px] top-[135px] left-[80px]">
          <p className="w-[400px] font-semibold font-sans text-[22px] leading-[40.22px]">
            Find a Book
          </p>
        </div>

        <div className="w-[1,112px] h-[66px] relative top-[215px] left-[80px] flex rounded-md justify-between p-8">
           
        </div>
    </div>

    
  );
}
