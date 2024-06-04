'use client'
import React from 'react'

// {type,min_sqft,max_sqft,beds,baths,max_price,status}
// {single_family,1000,5000,2,1,100_000,for_sale}


const testData = [
  {
    "type": "single_family",
    "text": "Escape to tranquility with this off-grid, unfinished cabin nestled on a spacious 1.64-acre lot on a dead-end road. This unique AS-IS property offers breathtaking panoramic views, perfect for those seeking a peaceful retreat or a blank canvas to create their dream home. A prime opportunity for the handyman, this cabin provides the ideal foundation to customize and complete to your specifications. Surrounded by nature, the property offers a secluded haven with endless potential. A shed is included for buyers convivence. Whether you're looking to craft your perfect getaway or simply enjoy the raw beauty of the land, this is an opportunity not to be missed. Water needs to be hauled and power would be by generator or solar.",
    "year_built": 2020,
    "beds": 1,
    "baths": 1,
    "baths_full": 1,
    "baths_half": 1,
    "garage": 2,
    "lot_sqft": 71438,
    "sqft": 696,
    "stories": 2,
    "lastSoldOn": "2018-05-31",
    "listPrice": 90000,
    "status": "for_sale"
  },
  {
    "type": "single_family",
    "text": "Beautiful home in the desirable Oak Hills and Tree streets area of Provo. Large living room and front porch with views of the valley, that make for amazing sunsets. Updated eat in kitchen, with office/work space. Large bedrooms and bathrooms throughout. Daylight basement windows make for a bright space with more gathering spaces. Beautiful landscaped yard with over an acre of land.",
    "year_built": 1968,
    "beds": 4,
    "baths": 3,
    "baths_full": 2,
    "baths_half": 1,
    "garage": 2,
    "lot_sqft": 56628,
    "sqft": 3700,
    "stories": 2,
    "lastSoldOn": "2018-05-31",
    "listPrice": 799000,
    "status": "for_sale"
  },
  {
    "type": "single_family",
    "text": "Welcome to your new home, nestled in the heart of Cedar City's sought-after neighborhood cedar knolls. Enjoy the convenience of being just minutes away from downtown, shopping, and schools, while still savoring the tranquility of a serene environment. This charming home features a unique secondary entrance for the basement, complete with 2 bedrooms, a kitchenette, a living room, and a bathroom. Whether you're looking for a rental opportunity or extra living space for a large family, this basement offers versatility and comfort. Designed with thoughtful consideration, the home offers a row of windows on the south side, serving as a natural solar heater, while also flooding the interior with beautiful sunlight. Meticulously maintained by its sole owner, this property exudes pride of ownership and is ready to welcome its new residents!",
    "year_built": 1985,
    "beds": 4,
    "baths": 3,
    "baths_full": 3,
    "baths_half": 1,
    "garage": 1,
    "lot_sqft": 10019,
    "sqft": 3528,
    "stories": 2,
    "lastSoldOn": "2018-05-31",
    "listPrice": 389900,
    "status": "for_sale"
  },
]

const checkType = (filter,data) => {
  if (filter === "any"){
    return data;
  }else{
    return data.filter((d) => d.type === filter);
  }
}
const checkMinSqft = (filter,data) => {
  if (filter === 0){
    return data;
  }else{
    return data.filter((d) => d.sqft >= filter);
  }
}


function filterData(type="single_family",min_sqft=3600,beds=0,baths=0,max_price=100_000_000,status="any"){
  let filteredData = testData;
  filteredData = checkType(type, filteredData);
  filteredData = checkMinSqft(min_sqft,filteredData);
  console.log(filteredData)

}

function Test() {
  return (
    <div>
      Testing Page
      <button onClick={() => filterData()}>Click</button>
    </div>
  )
}

export default Test