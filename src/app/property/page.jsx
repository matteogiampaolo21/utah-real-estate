'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faBath, faBed } from '@fortawesome/free-solid-svg-icons';

function PropertyPage() {
  
  const router = useRouter();
  const [estates, setEstates] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  const fetchData = async () => {
    const response = await fetch("./utah.json")

    if (!response.ok) {
      throw new Error("Could fetch data.")
    }
    const data = await response.json();

    // const tempArray = [];

    // data.map((d) => {
    //   if (tempArray.includes(d.status)){
    //     return
    //   }else{
    //     tempArray.push(d.status);
    //   }
    // })

    // console.log(tempArray)

    
    setEstates(data);
    setLoading(false)

  }

  const limitTxt = (txt) => {
    if (txt.length < 300) {
      return txt;
    }else{
      return txt.substring(0,300) + "..."
    }
  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatTag = (type) => {
    type = type.replaceAll("_"," ");
    return type.charAt(0).toUpperCase() + type.slice(1);
  }


  const readMore = (index) => {
    console.log(index,document.getElementById(`text-desc-${index}`))
    if (document.getElementById(`text-desc-${index}`).style.display === 'none'){
      document.getElementById(`text-desc-${index}`).style.display = 'block'
      document.getElementById(`text-desc-limit-${index}`).style.display = 'none'
      console.log('1')
    }else{
      document.getElementById(`text-desc-${index}`).style.display = 'none'
      document.getElementById(`text-desc-limit-${index}`).style.display = 'block'
      console.log('2')
    }
  }


  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="m-5 p-5 ">
      <header className='flex justify-between'>
        <h2 className='text-xl font-bold'>Property Page</h2>
        <button className='font-bol px-2 bg-neutral-700 text-white py-1 rounded hover:bg-neutral-900' onClick={() => router.back()}>Previous Page</button>
      </header>
      
      {isLoading ?
        <div>Loading ...</div>
      :
        <main>
          <h2 className='text-xl mb-5'>Utah Property List</h2>
          <ul className='grid grid-cols-4 gap-5'>
            {estates.map((home, index) => {
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
                      <p id={`text-desc-limit-${index}`}>{limitTxt(home.text)}</p>
                      <p id={`text-desc-${index}`} className='hidden'>{home.text}</p>
                      {home.text.length < 300 ? <></>:
                        <button onClick={() => {readMore(index)}} className='  mt-5 bg-neutral-200 shadow border border-neutral-300 hover:bg-neutral-300 px-2'>Read more</button>
                      } 
                    </div>
                  </div>


                  <div className={`rounded-b font-bold ${home.status} text-center text-white`}>
                    <p className="py-2 ">{formatTag(home.status)}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </main>
      }

      
    </div>
  )
}

export default PropertyPage;