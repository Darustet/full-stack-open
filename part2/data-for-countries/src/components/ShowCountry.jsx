const ShowCountry = ({ country }) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <span>capital {country.capital}</span><br/>
        <span>area {country.area}</span>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} width='200' />
    </div>
  )
}

export default ShowCountry