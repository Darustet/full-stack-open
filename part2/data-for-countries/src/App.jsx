import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import countriesService from './services/countries'
import ListCountries from './components/ListCountries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])

   useEffect(() => {
    if (search === '') {
      setFilteredCountries([])
      return
    }
    if (countries != undefined) {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredCountries(results)
    }
  }, [search]) 

  const handleNewSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchBar search={search} handleNewSearch={handleNewSearch}/>
      <ListCountries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
