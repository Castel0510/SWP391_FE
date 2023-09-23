import React from 'react'
import HeroComponent from '../../Components/HeroComponent'

const ServicePage = () => {
  return (
    <div>
      <HeroComponent />
      <div className='h-[1000px]'>
        <div className='flex mt-10 ml-16'>
          <input type="text" class="w-96 px-4 py-2  border-black rounded-2xl focus:outline-none focus:border-gray-500 mr-7 border-2" placeholder="" />
          <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl w-36 h-11 font-serif">
            Search
          </button>
        </div>
        <div className='flex'>
          <div className='ml-16 mt-20 flex-1'>
            <div className="div">
              <button className=" bg-gray-100 hover:bg-green-700 text-black   font-bold py-2 px-4 rounded-2xl w-1/4 h-16  font-serif mb-2 ">Hotel</button>

            </div>
            <div className="div">            <button className="bg-gray-100 hover:bg-green-700 text-black   font-bold py-2 px-4 rounded-2xl  w-1/4 h-16  font-serif mb-2 ">Hospital</button>
            </div>
            <div className="div">            <button className="bg-gray-100 hover:bg-green-700 text-black   font-bold py-2 px-4 rounded-2xl w-1/4 h-16 font-serif mb-2">Spa</button>
            </div>
            <div className="div">            <button className="bg-gray-100 hover:bg-green-700 text-black   font-bold py-2 px-4 rounded-2xl w-1/4 h-16 font-serif mb-2">Cage</button>
            </div>
          </div>
          <div>
            list item
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServicePage