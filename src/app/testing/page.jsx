
import { readFileSync } from 'fs';
import BarChart from './BarChart';
import Scatterplot from './Scatterplot';
// {type,min_sqft,max_sqft,beds,baths,max_price,status}
// {single_family,1000,5000,2,1,100_000,for_sale}
function fetchData(){
    
    let rawdata = readFileSync('./public/utah.json');
    let data = JSON.parse(rawdata);
    console.log("1")
    return data;

   
}


function Test() {
  

  const utahData = fetchData();

  return (
    <div className='m-5 border-black border p-5'>
      <h2 className='text-xl font-bold'>Testing Page</h2>
      <p className='text-lg'>D3 Graphs</p>

      <div className='grid grid-cols-1 gap-5'>
        <BarChart data={utahData}/>
        <Scatterplot data={utahData}/>

      </div>
    </div>
  )
}

export default Test