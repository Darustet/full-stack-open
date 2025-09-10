import ShowCountry from './ShowCountry.jsx'

const ListCountries = ({ filteredCountries }) => {

  if (filteredCountries.length === 0) {
    return
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 1) {
    return <ShowCountry country={filteredCountries[0]} />
  }

  return (
    <div>
      {filteredCountries.map(country => (
        <ul key={country.cca3}>
          <li>{country.name.common}</li>
        </ul>
      ))}
    </div>
  )
}

export default ListCountries