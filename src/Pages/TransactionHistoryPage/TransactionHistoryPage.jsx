import React from 'react'

const TransactionHistoryPage = () => {

    const data = [
        {
            time: "12/12/2023",
            amount: "+ 500.000",
            description: "nap tien"
        },
        {
            time: "13/12/2023",
            amount: " 200.000",
            description: "rut tien"
        },

    ];


    return (
        <>
            <div className="w-fit min-h-[320px] p-8 bg-white shadow-md rounded my-10 mx-auto">
                <div className='text-center font-bold'>TRANSACTION HISTORY</div>

                <div className='min-w-[500px] mt-10 flex justify-between'>
                    <div>TIME</div>
                    <div>AMOUNT</div>
                    <div>DESCRIPTION</div>
                </div>
                <hr className=" h-[1px] my-5 bg-black border-0 " />

                {data.map((item, index) => (
                    <div className='mt-5 flex justify-between' key={index}>
                        <div>{item.time}</div>
                        <div className='ml-[-100px]'>{item.amount}</div>
                        <div>{item.description}</div>
                    </div>
                ))}

            </div>


        </>
    )
}

export default TransactionHistoryPage