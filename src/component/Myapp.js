import React, { useState } from "react";
import "./index.css";
import cloud from "../images/Clouds.png"
import clear from "../images/Clear.png"
import rain from "../images/Rain.png"
import err from "../images/error.png"
import mist from "../images/mist.png"

const Myapp = () => {
  const [search, setSearch] = useState("");
  const [data, setData]=useState()
  const [error, setError]=useState()
  const API_KEY = "ab7ea1aadf518e40b0bece9dc6c5dd22"
  const API ="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

  const handleInput = (event) =>{
    setSearch(event.target.value)
    console.log(event.target.value);
  }
  const myFun = async () => {
      const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
      const jsonData= await get.json()
      console.log(jsonData);
      setData(jsonData);

      if(search === ""){
        //alert("PLEASE ENTER CITY/COUNTRY NAME")
        setError("PLEASE ENTER NAME")
      }
      else if(jsonData.cod == '404'){
        setError("PLEASE ENTER VALID NAME !")
      
    }else{
          setError("")
    }
    setSearch("")
  }

  return (
    <>
      <div className="container">
        <div className="inputs">
          <input placeholder="Enter City/Country" value={search} onChange={handleInput} />
          <button onClick={myFun}> <i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div>
          {
            error ?
            <div className="errorPage">
              <p>{error}</p>
              <img src={err} />
            </div> : ""
          }
          {
              data && data.weather ?
              <div className="weathers">
                <h2 className="cityName">{data.name}</h2>
                <img src={data.weather[0].main == "Clouds" ? cloud : "" }/>
                <img src={data.weather[0].main == "Rain" ? rain : "" }/>
                <img src={data.weather[0].main == "Clear" ? clear : ""} />
                <img src={data.weather[0].main == "mist" ? mist : "" } />
                <img src={data.weather[0].main == "Haze" ? cloud : ""}  /> 

                <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
                <p className="climate">{data.weather[0].description}</p>
              </div>: ""

          }
          </div>
      </div>

    </>
  );
};
export default Myapp;
