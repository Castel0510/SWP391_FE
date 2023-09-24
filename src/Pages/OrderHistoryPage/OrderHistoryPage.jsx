import React from 'react'

const OrderHistoryPage = () => {

  const data = [
    {
      name: "BIRD HOTEL - ABC HOTEL",
      dateOrder: " 01/01/2023",
      dateComplete: "03/01/2023",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took ",
      status: "Done"
    },
    {
      name: "BIRD HOTEL - ABC HOTEL",
      dateOrder: " 01/01/2023",
      dateComplete: null,
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took ",
      status: "ONGOING"
    },
  ]

  const check = (item) => {
    if (item === "DONE") {
      return (
        <button className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded ml-5">
          DONE
        </button>
      )
    } else if (item === "ONGOING") {
      return (
        <button className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded ml-5">
          ON GOING
        </button>
      )
    } else if (item === "CANCEL") {
      return (
        <button className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded ml-5">
          CANCEL
        </button>
      )
    }
  }


  return (
    <>
      <div className="w-fit min-h-[320px] p-8 bg-white shadow-md rounded my-10 mx-auto">
        <div className='text-center font-bold'>ORDER HISTORY</div>

        <div className='mt-5 mb-10'>
          <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded ml-5">
            All
          </button>
          <button className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded ml-5">
            ON GOING
          </button>
          <button className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded ml-5">
            CANCEL
          </button>
          <button className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded ml-5">
            DONE
          </button>
        </div>

        {data && data?.map((item, index) => (
          <div className='shadow-md rounded-md mt-5' key={index}>
            <div className='p-4 bg-green-300 rounded-md'>{item.name}</div>
            <div className='p-3 flex'><p className='font-bold pr-1'>Date order: </p> {item.dateOrder}</div>
            <div className='p-3 flex'><p className='font-bold pr-1'>Date completed: </p> {item.dateComplete}</div>
            <div className='p-3 flex leading-normal'><p className='font-bold pr-1'>Detail: </p> {item.detail}</div>
            <div className='p-3 pb-6 flex'><p className='font-bold pr-1'>Status: </p> {() => check(item)}</div>
          </div>
        ))}



      </div>


    </>
  )
}

export default OrderHistoryPage