import { useState ,useEffect } from 'react';
import searchicon from './assets/search.png';
import windIcon from './assets/wind.png';
import hum from './assets/hum.png'

import clearIcon from './assets/sun.png';
import rainIcon from './assets/rain.png';
import cloudIcon from './assets/cloudy.png';
import drizzleIcon from './assets/drizzle.png';
import snowIcon from './assets/snow.png'




export default function App() {
  const [text, setText] = useState("Krishnagiri")
  const [loading, setLoading] = useState(false)
  const [citynotfound, setCitynotfound] = useState(false)
  const [icon, setIcon] = useState(clearIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("Krishnagiri")
  const [country, setCountry] = useState("IN")
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [humi, setHumi] = useState(0)
  const [wspeed, setWspeed] = useState(0)

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  async function search() {
    setLoading(true)
    let api = "7019602ccaf55a9a30526617957200dd";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api}`
    try {
      let res = await fetch(url)
      let data = await res.json()
      if (data.cod == 404) {
        setCitynotfound(true)
        setLoading(false)
      }
      setHumi(data.main.humidity)
      setWspeed(data.wind.speed)
      setCity(data.name)
      setLat(data.coord.lat)
      setLong(data.coord.lon)
      setCountry(data.sys.country)
      setTemp(Math.floor(data.main.temp - 273.15, 10))
      const Icon = data.weather[0].icon;
      setIcon(weatherIconMap[Icon] || clearIcon)
      setCitynotfound(false)
    } catch (error) {
      console.log("error", error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleCity(e) {
    setText(e.target.value)
  }

  const handlekey = (e) => {
    if (e.key === "Enter") {
      search()
    }

  }

  useEffect(function () {
    search(); 
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded p-5 py-5">
          <div className='rounded-lg border-[3px] border-[#8ECAE6]'>
            <div className='flex'>
              <input type="text"
                onChange={handleCity} onKeyDown={handlekey}
                value={text} placeholder="Search City"
                className="text-black focus:outline-none h-8 w-72 p-2 " />
              <img src={searchicon} onClick={() => search()} alt="search icon" className='bg-white h-[32px]' />
            </div>
          </div>
          <div >
            <img className='mt-4 mx-auto w-20 ' src={icon} alt="weather icon" />

          </div>

          <div className='text-center text-3xl mt-4'>
            <h1>{temp}°C</h1>
            <strong className='text-[#FFB703]' >{city}</strong>
            <h1>{country}</h1>
          </div>
          <div className="flex justify-center gap-x-2 text-xl mt-2 ">
            <div className="flex flex-col items-center">
              <span> Latitude </span><span>{lat}</span>
            </div>
            <div className="flex flex-col items-center">
              <span> Longitude </span><span>{long}</span>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div>
              <img src={hum} alt="img" className='h-[60px]' />
              <div className='text-center mt-2'>
                <h1>{humi}%</h1>
                <h1>Humidity</h1>
              </div>
            </div>
            <div >
              <img src={windIcon} alt="img" className='h-[60px]' />
              <div className='text-center mt-2'>
                <h1>{wspeed} Km/h </h1>
                <h1>Windspeed</h1>
              </div>
            </div>
          </div>
          {loading && <p className='text-black text-center mt-3'>Loading.....</p>}
          {citynotfound && <p className='text-black text-center mt-3'>City Not Found</p>}
          <p className='text-center mt-5'>Developed by <span><a href="https://mdinesh.netlify.app/" target='_blank' className='text-[#126782]'>Dinesh</a></span></p>
        </div>
      </div>
    </>
  );
}
