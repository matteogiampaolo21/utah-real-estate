
'use client'

import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';

import TextCard from './TextCard'

function FilterForm({utahData, children}) {
    const [data, setData] = useState(utahData);
    const [listLimiter, setLimit] = useState(0);


    const [homeType, setType] = useState("any");
    const [minSqft, setMinSqft] = useState(0);
    const [homeBeds, setBeds] = useState(0);
    const [homeBaths, setBaths] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [homeStatus, setStatus] = useState('any');




    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const formatTag = (type) => {
        type = type.replaceAll("_"," ");
        return type.charAt(0).toUpperCase() + type.slice(1);
    }


    
    function filterData(e){
        e.preventDefault()
        let filteredData = utahData;

        filteredData = filteredData.filter((d) => {
            if(d.sqft >= minSqft && d.beds >= homeBeds && d.baths >= homeBaths ){
                return true;
            }else{
                return false
            }
        });

        if (maxPrice !== 0){
            filteredData = filteredData.filter((d) => d.listPrice <= maxPrice);
        }

        if (homeType !== "any"){
            filteredData = filteredData.filter((d) => d.type.includes(homeType));
        }

        if(homeStatus !== "any"){
            filteredData = filteredData.filter((d) => d.status === homeStatus);
        }

        console.log(filteredData)
        setData(filteredData)


    }

    return (
        <>
            <form className='shadow grid grid-cols-9 gap-3 my-5 bg-white rounded-t rounded-b p-5'>
                <label className='flex flex-col col-span-2'>
                    <h4 className='font-bold mb-2'>Property Type</h4>
                    <select defaultValue={'any'} onChange={e => setType(e.target.value)} className='border border-black px-2 py-1 '>
                        <option value="single_family">Single Family</option>
                        <option value="land">Land</option>
                        <option value="mobile">Mobile</option>
                        <option value="town">Townhouse</option>
                        <option value="condo">Condos</option>
                        <option value="farm">Farm</option>
                        <option value="other">Other</option>
                        <option value="any">Any</option>
                    </select>
                </label>

                <label className='flex flex-col'>
                    <h4 className='font-bold mb-2'>Minimum ft²</h4>
                    <input onChange={e => setMinSqft(e.target.value)} placeholder='0' className='border border-black px-2 py-1 ' type="number" />

                </label>

                <label className='flex flex-col'>
                    <h4 className='font-bold mb-2'>Minimum Beds</h4>
                    <input onChange={e => setBeds(e.target.value)} placeholder='0' className='border border-black px-2 py-1 ' type="number" />

                </label>

                <label className='flex flex-col'>
                    <h4 className='font-bold mb-2'>Minimum Baths</h4>
                    <input onChange={e => setBaths(e.target.value)} placeholder='0' className='border border-black px-2 py-1 ' type="number" />

                </label>

                <label className='flex flex-col col-span-2'>
                    <h4 className='font-bold mb-2'>Maximum List Price</h4>
                    <input onChange={e => setMaxPrice(e.target.value)} placeholder='0' className='border border-black px-2 py-1 ' type="number" />

                </label>


                <label className='flex flex-col'>
                    <h4 className='font-bold mb-2'>Property Status</h4>
                    <select defaultValue={'any'} onChange={(e) => setStatus(e.target.value)} className='border border-black px-2 py-1 '>
                        <option value="for_sale">For Sale</option>
                        <option value="ready_to_build">Ready to Build</option>
                        <option value="any">Any</option>
                    </select>
                </label>

                

                <div>
                    <div className='h-6 mb-2'></div>
                    <button onClick={(e) => filterData(e)} className='border-black w-full  border px-2 py-1 hover:bg-emerald-500 hover:text-white'>
                        {children}
                    </button>
                </div>

            </form>

            <main>
                <h2 className='text-xl mb-5'>Utah Property List</h2>

                <div className='flex flex-row gap-5 justify-start mb-5'>
                    <button className='border-neutral-800 rounded border-2 px-2 py-1 bg-neutral-700 text-white hover:bg-neutral-600 disabled:bg-neutral-400 disabled:text-neutral-500 disabled:border-neutral-500' disabled={listLimiter === 0 ? true : false} onClick={() => { listLimiter-36  <= 0 ? setLimit(0) : setLimit(listLimiter-36)}}>Previous Page</button>
                    <button className='border-neutral-800 rounded border-2 px-2 py-1 bg-neutral-700 text-white hover:bg-neutral-600 disabled:bg-neutral-400 disabled:text-neutral-500 disabled:border-neutral-500' disabled={listLimiter+36 >= data.length ? true :false}  onClick={() => setLimit(listLimiter+36)}>Next Page</button>
                </div>

                <ul className='grid grid-cols-4 gap-5'>
                    {data.slice(listLimiter,listLimiter+36).map((home, index) => {
                        return(

                            <li className='shadow flex flex-col justify-between bg-white rounded-t rounded-b pt-5' key={index}>
                                <div className='px-5'>
                                    <div className='flex flex-row justify-between'>
                                        <h3 className='font-bold text-lg'>${formatNumber(home.listPrice)}</h3>
                                        <p>{home.sqft} ft²</p>
                                    </div>

                                    <div className='flex flex-row justify-between mt-2 mb-5'>
                                        <h4 className={`${home.type} font-bold w-max px-2 py-1  bg-neutral-500 text-white`}>{formatTag(home.type)}</h4>
                                        <div className='flex flex-row gap-2 items-center'>
                                        {home.beds}
                                        <FontAwesomeIcon className='text-neutral-500' icon={faBed} />
                                        {home.baths}
                                        <FontAwesomeIcon className='text-neutral-500' icon={faBath} />
                                        </div>
                                    </div>

                                    <div className='mb-5'>
                                    <TextCard text={home.text} index={index} /> 
                                    </div>
                                </div>

                                
                                <div className={`rounded-b font-bold ${home.status} text-center text-white`}>
                                <p className="py-2 ">{formatTag(home.status)}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div className='flex flex-row gap-5 justify-end mt-10'>
                    <button className='border-neutral-800 rounded border-2 px-2 py-1 bg-neutral-700 text-white hover:bg-neutral-600 disabled:bg-neutral-400 disabled:text-neutral-500 disabled:border-neutral-500' disabled={listLimiter === 0 ? true : false} onClick={() => { listLimiter-36  <= 0 ? setLimit(0) : setLimit(listLimiter-36)}}>Previous Page</button>
                    <button className='border-neutral-800 rounded border-2 px-2 py-1 bg-neutral-700 text-white hover:bg-neutral-600 disabled:bg-neutral-400 disabled:text-neutral-500 disabled:border-neutral-500' disabled={listLimiter+36 >= data.length ? true :false}  onClick={() => setLimit(listLimiter+36)}>Next Page</button>
                </div>

            </main>
        </>
    )
}

export default FilterForm