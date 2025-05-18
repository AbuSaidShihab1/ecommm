import React, { useContext, useEffect, useState,useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Contextapi } from '../../../context/Appcontext';
import Dashboardleftside from '../../../components/Business_dashboard/Dashboardleftside';
import Dashboradheader from '../../../components/Business_dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
const Viewticket = () => {
   const navigate=useNavigate();
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);

        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);

  
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
         <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden':'w-0 xl:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
        </section>
        <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300':' transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[20px] lg:px-[30px]'>
       <div className='w-full flex justify-between items-center'>
        <div>
              <h1 className='text-[20px] lg:text-[20px] font-[600] mb-[8px]'>Your Order Number is 2333</h1>
          <ul className='flex justify-center items-center gap-[10px] text-neutral-500 text-[14px] font-[500]'>
            <li>Dashboard</li>
            <li><IoIosArrowForward/></li>
               <li>Support Ticket</li>
            <li><IoIosArrowForward/></li>
            <li>Your Order Number is 2333</li>
          </ul>
        </div>
       </div>
       {/* ------------------new customer table----------------- */}
         <section className='pt-[40px] pb-[30px]'>
         <div className="bg-white  rounded-lg p-6 w-full border mb-[20px] border-gray-200">
      <div className="flex items-start space-x-4">
        <img
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Destinee Predovic</h4>
           <div className='flex justify-start items-center gap-2'>
           <p className="text-sm text-gray-500">bettye25@yahoo.com &bull; #5897721608 &bull;  11-May-2025 </p>
              <div className='flex justify-center items-center gap-1 text-green-500 font-medium text-[15px]'>
                 <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
                 Open
              </div>
           </div>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <p>
              asperiores nesciunt autem quod error hic laudantium iste perspiciatis
              officiis voluptatibus exercitationem facere atque sapiente fuga
              excepturi qui illum alias reiciendis exercitationem ad occaecati deserunt
              molestiae maxime ratione consequuntur mollitia quae tempore alias ea
              architecto dolore iusto eaque error odit
            </p>
            <p>
              maxime suscipit fuga ducimus perspiciatis nemo porro nihil eaque a ab
              molestias praesentium voluptatum dignissimos odit ea omnis dolores maxime
              aspernatur vitae incidunt corrupti laudantium deserunt nisi facere
              sapiente fugiat
            </p>
            <p>
              consequatur pariatur cupiditate sit ut velit est fugiat itaque sequi
            </p>
            <p>
              pariatur necessitatibus quia molestiae minus nisi cumque dicta nobis
              reprehenderit porro placet aliquid consequatur maiores earum sapiente
              dolores aperiam asperiores aut rerum tenetur voluptatibus voluptas delectus
              tenetur quam quisquam possimus amet accusantium dolore eius repudiandae
              unde rem blanditiis quia voluptatem porro quaerat magnam voluptas repellat
              debitis culpa dolorum sed cupiditate
            </p>
            <p>
              quia ullam aut occaecati atque eos dolores numquam dignissimos voluptatem
              ratione ipsa providunt cupiditate molestias repellat reiciendis reiciendis
              enim voluptatibus ipsum velit velit libero cum reiciendis mollitia eius a
              nam necessitatibus in quos mollitia at quis sunt dolor
            </p>
            <p>
              excepturi corrupti iure dolores quam inventore veritatis culpa modi saepe
              alias esse aperiam ipsam assumenda ex ex dolor pariatur debitis
              accusantium architecto omnis quae officia
            </p>
            <p>
              maiores nostrum omnis dolor debitis minima omnis corporis incidunt aperiam
              vel tenetur enim perspiciatis incidunt ex laborum ex facilis similique nam
              facilis nostrum magni voluptatum molestiae voluptate dignissimos saepe
              ratione consequatur at sequi quidem est quibusdam ducimus facere laborum
              sunt sapiente ex repudiandae eius rem similique cumque doloremque eius
              omnis pariatur laboriosam modi nihil odit voluptatum tempora ratione
              magnam quo inventore vitae numquam
            </p>
          </div>
          <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
          <p className="text-gray-700">Destinee Predovic,</p>
          <p className="text-gray-500">Huels - Schulist</p>
          <div className="mt-4 py-3 flex items-center space-x-3 ">
            <div>
                <img className='w-[40px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">unto_blowhole_even.pdf (3.8mb)</p>
              <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                <button className="hover:underline flex justify-center items-center gap-2 "><MdOutlineRemoveRedEye className='text-[18px]'/> Preview</button>
                <button className="hover:underline flex justify-center items-center gap-2 "><PiDownloadSimpleBold/> Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
         </div>
         <div className="bg-white  rounded-lg p-6 w-full border mb-[20px] border-gray-200">
      <div className="flex items-start space-x-4">
        <img
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Destinee Predovic</h4>
           <div className='flex justify-start items-center gap-2'>
           <p className="text-sm text-gray-500">bettye25@yahoo.com &bull; #5897721608 &bull;  11-May-2025 </p>
              <div className='flex justify-center items-center gap-1 text-green-500 font-medium text-[15px]'>
                 <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
                 Open
              </div>
           </div>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <p>
              asperiores nesciunt autem quod error hic laudantium iste perspiciatis
              officiis voluptatibus exercitationem facere atque sapiente fuga
              excepturi qui illum alias reiciendis exercitationem ad occaecati deserunt
              molestiae maxime ratione consequuntur mollitia quae tempore alias ea
              architecto dolore iusto eaque error odit
            </p>
            <p>
              maxime suscipit fuga ducimus perspiciatis nemo porro nihil eaque a ab
              molestias praesentium voluptatum dignissimos odit ea omnis dolores maxime
              aspernatur vitae incidunt corrupti laudantium deserunt nisi facere
              sapiente fugiat
            </p>
            <p>
              consequatur pariatur cupiditate sit ut velit est fugiat itaque sequi
            </p>
            <p>
              pariatur necessitatibus quia molestiae minus nisi cumque dicta nobis
              reprehenderit porro placet aliquid consequatur maiores earum sapiente
              dolores aperiam asperiores aut rerum tenetur voluptatibus voluptas delectus
              tenetur quam quisquam possimus amet accusantium dolore eius repudiandae
              unde rem blanditiis quia voluptatem porro quaerat magnam voluptas repellat
              debitis culpa dolorum sed cupiditate
            </p>
            <p>
              quia ullam aut occaecati atque eos dolores numquam dignissimos voluptatem
              ratione ipsa providunt cupiditate molestias repellat reiciendis reiciendis
              enim voluptatibus ipsum velit velit libero cum reiciendis mollitia eius a
              nam necessitatibus in quos mollitia at quis sunt dolor
            </p>
            <p>
              excepturi corrupti iure dolores quam inventore veritatis culpa modi saepe
              alias esse aperiam ipsam assumenda ex ex dolor pariatur debitis
              accusantium architecto omnis quae officia
            </p>
            <p>
              maiores nostrum omnis dolor debitis minima omnis corporis incidunt aperiam
              vel tenetur enim perspiciatis incidunt ex laborum ex facilis similique nam
              facilis nostrum magni voluptatum molestiae voluptate dignissimos saepe
              ratione consequatur at sequi quidem est quibusdam ducimus facere laborum
              sunt sapiente ex repudiandae eius rem similique cumque doloremque eius
              omnis pariatur laboriosam modi nihil odit voluptatum tempora ratione
              magnam quo inventore vitae numquam
            </p>
          </div>
          <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
          <p className="text-gray-700">Destinee Predovic,</p>
          <p className="text-gray-500">Huels - Schulist</p>
          <div className="mt-4 py-3 flex items-center space-x-3 ">
            <div>
                <img className='w-[40px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">unto_blowhole_even.pdf (3.8mb)</p>
              <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                <button className="hover:underline flex justify-center items-center gap-2 "><MdOutlineRemoveRedEye className='text-[18px]'/> Preview</button>
                <button className="hover:underline flex justify-center items-center gap-2 "><PiDownloadSimpleBold/> Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
         </div>
         <div className="bg-white  rounded-lg p-6 w-full border mb-[20px] border-gray-200">
      <div className="flex items-start space-x-4">
        <img
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Destinee Predovic</h4>
           <div className='flex justify-start items-center gap-2'>
           <p className="text-sm text-gray-500">bettye25@yahoo.com &bull; #5897721608 &bull;  11-May-2025 </p>
              <div className='flex justify-center items-center gap-1 text-green-500 font-medium text-[15px]'>
                 <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
                 Open
              </div>
           </div>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <p>
              asperiores nesciunt autem quod error hic laudantium iste perspiciatis
              officiis voluptatibus exercitationem facere atque sapiente fuga
              excepturi qui illum alias reiciendis exercitationem ad occaecati deserunt
              molestiae maxime ratione consequuntur mollitia quae tempore alias ea
              architecto dolore iusto eaque error odit
            </p>
            <p>
              maxime suscipit fuga ducimus perspiciatis nemo porro nihil eaque a ab
              molestias praesentium voluptatum dignissimos odit ea omnis dolores maxime
              aspernatur vitae incidunt corrupti laudantium deserunt nisi facere
              sapiente fugiat
            </p>
            <p>
              consequatur pariatur cupiditate sit ut velit est fugiat itaque sequi
            </p>
            <p>
              pariatur necessitatibus quia molestiae minus nisi cumque dicta nobis
              reprehenderit porro placet aliquid consequatur maiores earum sapiente
              dolores aperiam asperiores aut rerum tenetur voluptatibus voluptas delectus
              tenetur quam quisquam possimus amet accusantium dolore eius repudiandae
              unde rem blanditiis quia voluptatem porro quaerat magnam voluptas repellat
              debitis culpa dolorum sed cupiditate
            </p>
            <p>
              quia ullam aut occaecati atque eos dolores numquam dignissimos voluptatem
              ratione ipsa providunt cupiditate molestias repellat reiciendis reiciendis
              enim voluptatibus ipsum velit velit libero cum reiciendis mollitia eius a
              nam necessitatibus in quos mollitia at quis sunt dolor
            </p>
            <p>
              excepturi corrupti iure dolores quam inventore veritatis culpa modi saepe
              alias esse aperiam ipsam assumenda ex ex dolor pariatur debitis
              accusantium architecto omnis quae officia
            </p>
            <p>
              maiores nostrum omnis dolor debitis minima omnis corporis incidunt aperiam
              vel tenetur enim perspiciatis incidunt ex laborum ex facilis similique nam
              facilis nostrum magni voluptatum molestiae voluptate dignissimos saepe
              ratione consequatur at sequi quidem est quibusdam ducimus facere laborum
              sunt sapiente ex repudiandae eius rem similique cumque doloremque eius
              omnis pariatur laboriosam modi nihil odit voluptatum tempora ratione
              magnam quo inventore vitae numquam
            </p>
          </div>
          <p className="text-gray-700 mt-4 font-semibold">Regards,</p>
          <p className="text-gray-700">Destinee Predovic,</p>
          <p className="text-gray-500">Huels - Schulist</p>
          <div className="mt-4 py-3 flex items-center space-x-3 ">
            <div>
                <img className='w-[40px]' src="https://isomorphic-furyroad.vercel.app/_next/static/media/doc-icon.c49abc54.svg" alt="" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">unto_blowhole_even.pdf (3.8mb)</p>
              <div className="flex space-x-3 text-sm text-gray-700 mt-1">
                <button className="hover:underline flex justify-center items-center gap-2 "><MdOutlineRemoveRedEye className='text-[18px]'/> Preview</button>
                <button className="hover:underline flex justify-center items-center gap-2 "><PiDownloadSimpleBold/> Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
         </div>
         </section>
       {/* ------------------------new customer table-------------------- */}
       </section>
        </section>
    </section>
  )
}

export default Viewticket