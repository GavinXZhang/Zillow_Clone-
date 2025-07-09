import Navbar from "./components/NavBar";
import Map from "./components/Map";
import Card from "./components/Card";
import Grid from "./components/Grid";

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
    <Grid properties = {properties}/>  

    </>
  )}

  export default Home;