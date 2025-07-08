import ImageCard from '@/app/components/ImageCard';
import Link from 'next/link';
const getProperties = async (slug) => {
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
    if (!HYGRAPH_ENDPOINT) {
        throw new Error("HYGRAPH_ENDPOINT is not defined in the environment variables.");
    }
    const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `query Property ($slug: String) {
                propertyS(where: {slug: $slug}) {
                    id,
                    name,
                    description,
                    rentalPrice,
                    parking,
                    petFriendly,
                    pool,
                    inUnitDryer,
                    elevator,
                    images{
                    id,
                    url,
                    fileName
                    },
                    managingBroker{
                    name,
                    phoneNumber
                    }
                }
            }`,
            variables: { slug: slug }, 
        })
    })
    const data = await response.json();

    return data.data.propertyS;
};
const Property = async ({params}) => {
    const property = await getProperties(params.slug);
    console.log(property);

    return (
        <div className="property">
            <div className = "property-image-container">
                {property.images && (
                    <ImageCard
                        key={image.id}
                        url={image.url}
                        fileName={image.fileName}
                        width={2000}
                        height={550}
                    />
                )}
            </div>
            <div className = "property-info-container">
                <h1>{property.name}</h1>
                <h2><span>${property.rentalPrice}</span></h2>
                <br />
                <h2>Overview</h2>
                <p>{property.description}</p>
                <br />
                <h2>Amenities</h2>
                <ul>
                    {property.parking && <li>Parking</li>} 
                    {console.log(property.parking)}
                    {property.petFriendly && <li>Pet Friendly</li>}
                    {property.inUnitDryer && <li>In Unit Dryer</li>}
                    {property.elevator && <li>Elevator</li>}
                    {property.pool && <li>Pool</li>}
                </ul>
                <br />
                <h3>Licenced Brokerage</h3>
                <p>managingBroker: {property.managingBroker.name}</p>
                <p>Phone: {property.managingBroker.phoneNumber}</p>
                <br />
               <Link href= {"/"}><button>Go back</button></Link> 

            </div>
        </div>
    )
} 
export default Property;