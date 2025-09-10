const SearchBar = ( props ) => {
    const { search, handleNewSearch } = props

    return (
        <div>
            <>find countries: </>  
            <input value={search} onChange={handleNewSearch} />
        </div>
    )
}

export default SearchBar