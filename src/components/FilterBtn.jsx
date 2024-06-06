
'use client'
import React from 'react'

function FilterBtn({className,data, children}) {

    function filterData(type="single_family",min_sqft=0,beds=0,baths=0,max_price=50_000,status="for_sale"){
        let filteredData = data;

        filteredData = filteredData.filter((d) => {
            if(d.sqft >= min_sqft && d.beds >= beds && d.baths >= baths && d.listPrice <= max_price ){
                return true;
            }else{
                return false
            }
        });

        if (type !== "any"){
            filteredData = filteredData.filter((d) => d.type === type);
        }

        if(status !== "any"){
            filteredData = filteredData.filter((d) => d.status === status);
        }

        console.log(filteredData)


    }

    return (
        <form className='shadow grid grid-cols-9 gap-3 my-5 bg-white rounded-t rounded-b p-5'>
            <label className='flex flex-col col-span-2'>
                <h4 className='font-bold mb-2'>Property Type</h4>
                <select className='border border-black px-2 py-1 '>
                    <option value="">Single Family</option>
                    <option value="">Land</option>
                    <option value="">Mobile</option>
                    <option value="">Townhouse</option>
                    <option value="">Condos</option>
                    <option value="">Farm</option>
                    <option value="">Other</option>
                    <option value="">Any</option>
                </select>
            </label>

            <label className='flex flex-col'>
                <h4 className='font-bold mb-2'>Minimum ft²</h4>
                <input placeholder='0' className='border border-black px-2 py-1 ' type="number" />

            </label>

            <label className='flex flex-col'>
                <h4 className='font-bold mb-2'>Minimum Beds</h4>
                <input placeholder='0' className='border border-black px-2 py-1 ' type="number" />

            </label>

            <label className='flex flex-col'>
                <h4 className='font-bold mb-2'>Minimum Baths</h4>
                <input placeholder='0' className='border border-black px-2 py-1 ' type="number" />

            </label>

            <label className='flex flex-col col-span-2'>
                <h4 className='font-bold mb-2'>Maximum List Price</h4>
                <input placeholder='0' className='border border-black px-2 py-1 ' type="number" />

            </label>


            <label className='flex flex-col'>
                <h4 className='font-bold mb-2'>Property Status</h4>
                <select className='border border-black px-2 py-1 '>
                    <option value="">For Sale</option>
                    <option value="">Ready to Build</option>
                </select>
            </label>

            

            <div>
                <div className='h-6 mb-2'></div>
                <button onClick={() => filterData()} className='border-black w-full  border px-2 py-1 hover:bg-emerald-500 hover:text-white'>
                    {children}
                </button>
            </div>

        </form>
    )
}

export default FilterBtn