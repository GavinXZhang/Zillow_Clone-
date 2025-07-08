import Navbar from "./components/NavBar";
import Searchbar from "./components/SearchBar";
import Map from "./components/Map";
import Card from "./components/Card";

const getProperties= async () => {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined in the environment variables.");
  }
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      query: `
      query PropertyS {
        propertyS {
          description
          elevator
          inUnitDryer
          images {
            fileName
            url
          }
          parking
          petFriendly
          pool
          rentalPrice
          managingBroker {
            name
            phoneNumber
          }
          location {
            latitude
            longitude
          }
          slug
          id
          name
        }
      }
        `
    })
  })
  const json = await response.json();
  return json.data.propertyS; 
}
  const Home  = async () => {
    const properties = await getProperties();
  return (
    <>
    <Navbar/>  
    <Searchbar/>  
    <main>
      <article>
        <Map/>
      </article>
      <article className = "listings">
        <h2>
          Rental Listings
        </h2>
        <div className= "card-container">
          {properties.map (property => <Card
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
  )}

  export default Home;