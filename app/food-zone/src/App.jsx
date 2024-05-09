
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {

const [data,setData] = useState(null);
const [loading,setLoading] = useState(false)
const [error,setError] = useState(null)
const [filterData,setFilterData] = useState(null)
const [selectBtn, setSelectBtn] = useState("all")



// ----------------------------------------------------

useEffect(() => {

const fetchFoodData = async () => {
  setLoading(true)
  try{
    const response = await fetch(BASE_URL)
    // const json_d = response.json()
    const json_d = await response.json()

    setData(json_d)
    setFilterData(json_d)
    setLoading(false)
  }
  catch (error) {
    setError("Unable to fetch Data")

  }
}

fetchFoodData();
// agr useEffect me no dalenge toh fetchFoodData() function baar baar chlega and loop me fss jata hai 
// and useEffect me koi dependecny array or Empty array ni dalenge toh v again and agian chlega
},[])

// console.log(data);

const searchFood = (e) => {

  const searchValue = e.target.value;
  
  console.log(searchValue);

  if(searchValue == ""){
    setFilterData(null)
  }

 
  const filtered = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  )
// ************************------includes applies on only string 
  setFilterData(filtered)
}


const filterFood = (type) => {
  if(type == "all") {
    setFilterData(data)
    setSelectBtn("all")
    return ;
  }

  
  const filtered = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase())
  )

  setFilterData(filtered)
  setSelectBtn(type)


}

const filterBtns = [
  {
    name: "All",
    type: "all"
  },
  {
    name: "Breakfast",
    type: "breakfast"
  },
  {
    name: "Lunch",
    type: "lunch"
  },
  {
    name: "Dinner",
    type: "dinner"
  },

]


if (error) return <div>{error}</div>
if (loading) return <div>Loading.....</div>



  return(
   <Container>
    <TopContainer>
      <div className="logo">
        <img src="/src/assets/Foody Zone.png" alt="" />

      </div>

      <div className="search">
        <input onChange={searchFood} placeholder="Search Food" />

      </div>

    </TopContainer>

    <FilterContainer>

      {filterBtns.map((value) => (
        <Button key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
      ))}

       
    </FilterContainer>

    <SearchResult data={filterData}/>

  </Container>

  );
}

export default App;


 export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;
`;
const TopContainer = styled.section`
min-height: 170px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
    background-color: transparent;
    border:1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;

  }
}

`;

const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom:30px ;
`;

 export const Button = styled.button`
background-color: #ff4343;
border-radius: 5px;
padding: 6px 12px;
color: whitesmoke;
border: none;
cursor: pointer;
&:hover{
  background-color: whitesmoke;
  color: black;
}
`;



 {/* ******** OR---- WE CAN DO IT LIKE THIS ALSO   */}
      {/* <Button onClick={() => filterFood("all")}>All</Button>
      <Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
      <Button >Lunch</Button>
      <Button>Dinner</Button> */}


// const FoodCardContainer = styled.section`
//   height: calc(100vh - 170px);
//   background-image: url("/src/assets/bg.png");
//   background-size: cover;
// `;



// const FoodCards = styled.div``;

// const FoodCard = styled.div``;


// --------------------------------------------------------------------

// import { useState } from "react";
// import styled from "styled-components";

// const BASE_URL = "http://localhost:9000/"

// const App = () => {

// const [data,setData] = useState(null);

// const fetchFoodData = async () => {
//   const response = await fetch(BASE_URL)

//   const json = response.json()
//   // console.log(json);
// }

// fetchFoodData();


// --------------------------- something I mportant -------------------------------


// const BASE_URL = "http://localhost:9000/"

// const App = () => {
  
  // const [data,setData] = useState(null);
  // const [loading,setLoading] = useState(false)
  // const [error,setError] = useState(null)
  
  
  
  // const fetchFoodData = async () => {
    //   setLoading(true)
    //   try{
      //     const response = await fetch(BASE_URL)
      //     const json = response.json()
      //     setData(json)
      //     setLoading(false)
      //   }
      //   catch (error) {
        //     setError("Unable to fetch Data")
        
        //   }
        // }
        
        // fetchFoodData();
        
        // if (error) return <div>{error}</div>
// if (loading) return <div>Loading.....</div>

 // ********* here we use useEffect becoz fetchFoodData repetadily call ho rha hai 