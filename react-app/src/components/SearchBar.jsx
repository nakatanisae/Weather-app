import { useState } from 'react'

function SearchBar({ results, onSelectLocation }) {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input type="text" placeholder="Search Location"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            {query.length >= 3 && (
                <div>
                    {results.map((result) => (
                        <button 
                            key={result.name}
                            type="button"
                            onClick={() => {
                                onSelectLocation(result);
                                setQuery("");
                            }}
                        >
                            {result.name}, { result.city } - { result.administrative }
                        </button>
                    ))}
                </div>
            )}   
        </div >
    )
}

export default SearchBar;