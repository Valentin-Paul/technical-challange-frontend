import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import image0 from "../src/assets/images/Galaxy_S7.png"
import image1 from "../src/assets/images/Honor_10.png"
import image2 from "../src/assets/images/IPhone_7.png"
import image3 from "../src/assets/images/Moto_G6.png"
import image4 from "../src/assets/images/Nokia_7.1.jpg"
import image5 from "../src/assets/images/P10_Lite.jpg"
import image6 from "../src/assets/images/Xiaomi_MI_A2.jpeg"
import image7 from "../src/assets/images/ZenPhone_5.jpg"



function App() {
  const[phones, setPhones] = useState(null)
  const[details, setDetails] = useState(null);

    useEffect(() => {
      fetchDetails();
      fetchPhones();
      console.log(details)
      }, [details]);
    
    const fetchPhones = ()=> {
        axios
        .get('http://localhost:5005/phones')
        .then(response=>{setPhones(response.data); console.log(response)})
        .catch((err)=>console.log('error loading phones...',err))
    }

    const fetchDetails = (id) =>{
      axios
      .get(`http://localhost:5005/phones/${id}`)
      .then(response=>{setDetails(response.data); console.log("details set")})
      .catch((err)=>console.log('error loading phones...',err))

  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Phones</h1>
      <img src='../src/assets/images/Galaxy_S7.png'></img>
      <>
      {phones === null? <p>loading...</p> : 
        phones.map((element)=>{
          return(
            <>
            <div>
            <img src={`../src/assets/images/${element.imageFileName}`}/>
            <p>{element.name}</p>
            <p>{element.price} €</p>
            <p>{element.id}</p>
            </div>
           
          
            <button onClick={()=>{fetchDetails(element._id)}}>Details</button>

            {/* {console.log("element...", element.id, "details...", details.id)} */}
            {details === null? console.log("details not set") : 
              
              details.id === element.id? <div>
              <p>{details.color}</p>
              <p>{details.description}</p>
              <p>{details.manufacturer}</p>
              </div> : 
              null
            }
          </>
          )
        
        })}
       
        </>
      </header>
    </div>
  
  );
}

export default App;
