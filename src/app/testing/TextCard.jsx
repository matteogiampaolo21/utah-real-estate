'use client'
import React from 'react'

function TextCard({text,index}) {

    const limitTxt = (txt) => {
        if (txt.length < 300) {
            return txt;
        }else{
            return txt.substring(0,300) + "..."
        }
    }

    const readMore = (index) => {
        console.log(index,document.getElementById(`text-desc-${index}`))
        const shortTxt = document.getElementById(`text-desc-limit-${index}`)
        const longTxt = document.getElementById(`text-desc-${index}`);

        shortTxt.classList.toggle('hide');
        longTxt.classList.toggle('hide');
        // if (document.getElementById(`text-desc-${index}`).style.display === 'none'){
        //     document.getElementById(`text-desc-${index}`).style.display = 'block'
        //     document.getElementById(`text-desc-limit-${index}`).style.display = 'none'
        //     console.log('1')
        // }else{
        //     document.getElementById(`text-desc-${index}`).style.display = 'none'
        //     document.getElementById(`text-desc-limit-${index}`).style.display = 'block'
        //     console.log('2')
        // }
    }

    return (
        <div className='mb-5'>
            <p id={`text-desc-limit-${index}`}>{limitTxt(text)}</p>
            <p id={`text-desc-${index}`} className='hide'>{text}</p>
            {text.length < 300 ? <></>:
                <button onClick={() => {readMore(index)}} className='  mt-5 bg-neutral-200 shadow border border-neutral-300 hover:bg-neutral-300 px-2'>Read more</button>
            } 
        </div>
    )
}

export default TextCard