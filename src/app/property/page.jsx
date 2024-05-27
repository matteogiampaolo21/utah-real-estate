'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="m-5 p-5 border-black bg-neutral-200 border">
      <header className='flex justify-between'>
        <h2 className='text-xl font-bold'>Property Page</h2>
        <button className='border border-black px-2 bg-white hover:bg-neutral-300' onClick={() => router.back()}>Previous Page</button>
      </header>
      
      {isLoading ?
        <div>Loading ...</div>
      :
        <main>
          <h2 className='text-xl mb-5'>Utah Property List</h2>
          <ul className='grid grid-cols-4 gap-5'>
            {estates.map((home, index) => {
              return(
                <li className='border-black border shadow bg-white p-3' key={index}>
                  <div className='flex flex-row justify-between'>
                    <h3 className='font-bold text-lg'>${formatNumber(home.listPrice)}</h3>
                    <p>{home.sqft} ft²</p>
                  </div>

                  <h4 className={`${home.type} font-bold w-max px-2 py-1 mb-3 bg-neutral-500 text-white`}>{formatTag(home.type)}</h4>

                  <div>
                    <p>{limitTxt(home.text)}</p>
                    {home.text.length < 300 ? <></>:
                      <button onClick={() => {}} className='border-black border mt-5 bg-neutral-200 hover:bg-neutral-300 px-2'>Read more</button>
                    } 
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