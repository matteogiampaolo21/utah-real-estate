
import { readFileSync, createReadStream } from 'fs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faBath, faBed } from '@fortawesome/free-solid-svg-icons';

import TextCard from './TextCard'



async function fetchData(){
    
    let rawdata = readFileSync('./public/utah.json');
    let data = JSON.parse(rawdata);
    return data;
    // function processLine(line) { // here's where we do something with a line
    
    //     if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)
    
    //     if (line.length > 0) { // ignore empty lines
    //         var obj = JSON.parse(line); // parse the JSON
    //         console.log(obj); // do something with the data here!
    //     }
    // }
    
    // function pump(){
    //     var pos;
    
    //     while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
    //         if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
    //             buf = buf.slice(1); // discard it
    //             continue; // so that the next iteration will start with data
    //         }
    //         processLine(buf.slice(0,pos)); // hand off the line
    //         buf = buf.slice(pos+1); // and slice the processed data off the buffer
    //     }
    // }


    // let stream = createReadStream('./public/utah.json', {flags: 'r', encoding: 'utf-8'});
    // let buf = '';

    // stream.on('data', (d) => {
    //     console.log(d)
    //     buf +=  d.toString();
    //     pump();
    // })

   
}

async function PropertyPage() {
  
    const data = await fetchData();

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



  return (
    <div className="m-5 p-5 ">
        <header className='flex justify-between'>
            <h2 className='text-xl font-bold'>Property Page</h2>
            <button className='font-bol px-2 bg-neutral-700 text-white py-1 rounded hover:bg-neutral-900' >Previous Page</button>
        </header>

        
        {/* <main>
            <h2 className='text-xl mb-5'>Utah Property List</h2>
            <ul className='grid grid-cols-4 gap-5'>
                {data.map((home, index) => {
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

        </main>       */}
    </div>
  )
}

export default PropertyPage;