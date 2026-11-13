function FavoriteSelect({ favorites, onSelect }) {
    return (

        <select
            defaultValue=""
            onChange={(e) => onSelect(e.target.value)}>


            <option value="" disabled>Favorite places</option>
            {favorites.map((favorite) => (
                <option key={favorite.city} value={favorite.city}>{favorite.city}</option>
            ))}
        </select>
    )
}

export default FavoriteSelect