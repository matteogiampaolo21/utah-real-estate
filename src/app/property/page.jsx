

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
            </header>
            
            <FilterForm utahData={data} >Click</FilterForm>
            
                
        </div>
    )
}

export default PropertyPage;