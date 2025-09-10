const FilterForm = (props) => {
  const { newSearch, handleNewSearch } = props
  return (
    <>
      Filter by name
      <input form="inputs" value={newSearch} onChange={handleNewSearch}/>
    </>
  )
} 

export default FilterForm