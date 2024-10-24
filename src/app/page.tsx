import Image from "next/image";
import { FaBell } from "react-icons/fa"
import { FaSearch } from 'react-icons/fa'

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

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[900px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
               <img 
               src='/user-avatar.jpg'
               alt="Avatar"
               width={44}
               height={46}
               className="rounded-full cursor-pointer"
               />
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

        <div className="w-[992px] h-[66px] flex rounded-md justify-between p-8">
          <div className="relative">
            <input 
            type="text" 
            className="border p-6 font-sans w-[1112px] h-[66px] bottom-[25px] right-[35px] relative rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"      
            placeholder="Type book name or author"
            />
           {/* Search Icon */}
      <FaSearch 
      className="text-gray-500 w-3 h-6 relative bottom-[70px] left-[1040px] cursor-pointer" 
      />
        

      <div className="w-[172px] h-[58px] relative bottom-[110px] left-[1090px] rounded-md border pt-[14px] pr-[10px] pb-[14px] pl-[10px] hover:bg-blue-500 bg-[#0661E8] cursor-pointer">
          <button 
          type="submit"
          className="text-white relative left-[50px] font-sans text-[14px]">
             Filter
          </button>
      </div>
        </div>
      </div>
      
      <div className="w-[1,314px] h-[58px] top-[328px] left-[80px] gap-[30px]">
          <div className="w-[60px] h-[38px] rounded-md pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-[#0661E8] relative top-[76px]">
            <p className="text-white relative left-[10px] bottom-[8px] font-sans">
              All
              </p>  
          </div>    
         
          <div className="w-[80px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative top-[38px] left-[100px]">
            <p className="text-black relative left-[5px] bottom-[8px] font-sans font-semibold">
              Sci-fi 
              </p>  
          </div>    

          <div className="w-[80px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[1.1px] left-[240px]">
            <p className="text-black relative left-[2px] bottom-[8px] font-semibold relative">
              Fantasy 
            </p>  
          </div>    

          <div className="w-[100px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[40px] left-[380px]">
            <p className="text-black relative right-[5px] bottom-[8px] font-semibold relative left-[5px]">
              Romance
              </p>  
          </div>    
              

          <div className="w-[80px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[78px] left-[540px]">
            <p className="text-black font-sans relative left-[10px] bottom-[8px] font-semibold relative left-[5px]">
              Drama 
              </p>  
          </div>    

          <div className="w-[120px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[114px] left-[670px]">
            <p className="text-black font-sans  relative left-[10px] bottom-[8px] font-semibold">
              Business 
              </p>  
          </div>    

          <div className="w-[120px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[152px] left-[840px]">
            <p className="text-black font-sans relative left-[10px] bottom-[8px] font-semibold">
              Education
              </p>  
          </div>    

          <div className="w-[120px] h-[38px] rounded-sm pt-[14px] pr-[10px] pb-[14px] pl-[10px] cursor-pointer bg-blue-200 relative bottom-[189px] left-[1000px]">
            <p className="text-black font-sans relative left-[10px] bottom-[8px] font-semibold">
              Geography  
              </p>  
          </div>    



      <div className="w-[1331px] h-[320px] justify-between">
        <div className="w-[192px] h-[320px] bottom-[130px] relative p-8">
           <img src="/lone wolf.png" className="rounded-md cursor-pointer" alt="lone wolf" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
            Lone Wolf Adventure
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[450px] left-[200px] relative p-8">
           <img src="/Hide and seek.jpg" className='rounded-md cursor-pointer' alt="Hide and seek" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
            Hide and Seek 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[770px] left-[400px] relative p-8">
           <img src="/Dont Look.png" className="rounded-md cursor-pointer" alt="Dont Look" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Don't Look Back 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[1090px] left-[600px] relative p-8">
           <img src="/spring book.jpg" className="rounded-md cursor-pointer h-[200px]" alt="spring book" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Spring book 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[1410px] left-[800px] relative p-8">
           <img src="/harry potter.jpg" className="rounded-md cursor-pointer h-[200px]" alt="harry potter" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Harry Potter 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[1730px] left-[1000px] relative p-8">
           <img src="/Robin lee.jpg" className="rounded-md cursor-pointer h-[200px]" alt="robin lee" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              A Promise Kept
            </span>
        </div>
        </div>



        <div className="w-[1331px] h-[320px] justify-between"> 
        <div className="w-[192px] h-[320px] bottom-[1700px] left-[2.25px] relative p-8">
           <img src="/Dont Look.png" className="rounded-md cursor-pointer" alt="Dont Look" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Don't Look Back 
            </span>
        </div>
        </div>
    
        <div className="w-[192px] h-[320px] bottom-[2020px] left-[200px] relative p-8">
           <img src="/Hide and seek.jpg" className='rounded-md cursor-pointer' alt="Hide and seek" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
            Hide and Seek 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[2340px] left-[400px] relative p-8">
           <img src="/harry potter.jpg" className="rounded-md cursor-pointer h-[200px]" alt="harry potter" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Harry Potter 
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[2660px] left-[600px] relative p-8">
           <img src="/Robin lee.jpg" className="rounded-md cursor-pointer h-[200px]" alt="robin lee" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              A Promise Kept
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[2980px] left-[800px] relative p-8">
           <img src="/lone wolf.png" className="rounded-md cursor-pointer" alt="lone wolf" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
            Lone Wolf Adventure
            </span>
        </div>
        </div>

        <div className="w-[192px] h-[320px] bottom-[3300px] left-[1000px] relative p-8">
           <img src="/spring book.jpg" className="rounded-md cursor-pointer h-[200px]" alt="spring book" />
            <div className="flex justify-between w-[164px] h-[43px]">
           <span className="w-[164px] h-[20px] font-sans font-semibold text-[14px] leading-[20.11px]">
              Spring book 
            </span>
        </div>
        </div>

      </div>

      </div>
           
      </div>
      
    </div>



    
  );
}
