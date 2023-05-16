import { useState, useEffect } from "react";
import FullInfo from "./components/FullInfo";
import CountriesServices from "./services/countries"


function App() {
  const [search, setSearch] = useState()
  const [searchList, setSearchList] = useState([])
  const [error, setError] = useState(false)
  const [fullInfo, setFullInfo] = useState(false)

  const handleSearch = (event) => {
    setSearch(event.target.value)

    if(!!event.target.value) {
      CountriesServices
        .getAll()
        .then(response => {
          const list = response.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) >= 1)
          setSearchList(list)

          if(list.length === 1) {
            setFullInfo(true)
          } else if (list.length > 10) {
            setError(true)
            setFullInfo(false)
          } else {
            setFullInfo(false)
            setError(false)
          }

        })
    } else {
      setSearchList([])
      setFullInfo(false)
      setError(false)
    }
  }

  const handleFullInfo = (event) => {
    const selectedCountry = searchList[event.target.value]
    CountriesServices
        .getAll()
        .then(response => {
          const country = response.filter(country => country.name.common.toLowerCase().includes(selectedCountry.name.common.toLowerCase()) >= 1)
          setSearchList(country)
          setFullInfo(true)
        })
  }
  

  return (
    <div className="App">
      <form>
        <span>find countries</span>
        <input type="text" value={search} onChange={handleSearch}/>
      </form>
      {
        fullInfo ? 
        <FullInfo 
          name={searchList[0].name.common}
          capital={searchList[0].capital}
          area={searchList[0].area}
          languages={searchList[0].languages}
          flag={searchList[0].flags.png}
        />
        :
        <>
          {error ?
            <p>Too many matches, specify another filter</p>
          : 
            <ul>
              {
                searchList.map((country, index)=> {
                  return (
                    <>
                      <li key={index}>
                        {country.name.common}
                        <button onClick={handleFullInfo} value={index}>show</button>
                      </li>
                      
                    </>
                  )
                })
              }
            </ul> 
          }
        </> 
      }
    </div>
  );
}

export default App;
