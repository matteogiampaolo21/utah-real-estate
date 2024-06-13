

import { readFileSync } from 'fs';
import BackBtn from '../../components/BackBtn'
import FilterForm from "../../components/FilterForm"

function fetchData(){
    
    let rawdata = readFileSync('./public/utah.json');
    let data = JSON.parse(rawdata);
    console.log("1")
    return data;

   
}

function PropertyPage() {
  
    let data = fetchData();


    return (
        <div className="lg:m-5 lg:p-5 ">
            <header className='flex justify-between'>
                <h2 className='text-xl font-bold'>Property Page</h2>
                <BackBtn className='font-bol px-2 bg-neutral-700 text-white py-1 rounded hover:bg-neutral-900' >Previous Page</BackBtn>
                
            </header>
            
            <FilterForm utahData={data} >Click</FilterForm>
            
                
        </div>
    )
}

export default PropertyPage;