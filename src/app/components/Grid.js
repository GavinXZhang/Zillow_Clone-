"use client"
import {useState} from 'react';
import Card from './Card';
import Map from './Map';
const Grid = ({properties}) => {
        const [input, setInput] = useState('');
        const [houses, setHouses] = useState(properties);
        const [locations, setLocations] = useState(properties.map(property => property.location));
        console.log("properties", properties);

        const setInputAndMapLocations = (value) => {
        setInput(value);
        setHouses(properties.filter(property => property.name.toLowerCase().includes(value.toLowerCase())));
        setLocations(houses.map(property => property.location));
        }
        
    return (
        <>
        
            <div className = "search-bar">
                <input
                    placeholder="Search Location, Neighborhood, City, or Zip"
                    onChange={(e) => setInputAndMapLocations(e.target.value)}
                    value = {input}
                />
                <button>Search</button>
            </div>
            <main>
      <article>
        <Map locations = {locations}/>
      </article>
      <article className = "listings">
        <h2>
          Rental Listings
        </h2>
        <div className= "card-container">
          {houses.map (property => <Card
          key = {property.id} 
          propertyname = {property.name}
          slug = {property.slug}
          rentalPrice = {property.rentalPrice}
          images = {property.images}
          />)}
        </div>
      </article>
    </main>
        </>
    )
}
export default Grid;