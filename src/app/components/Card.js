import Link from "next/link";
import ImageCard from "./ImageCard";
const Card = ({
    propertyname,
    slug,
    rentalPrice,
    beds,
    images,
            }) => {
    return (
        <Link href={`/property/${slug}`}>
            <div className = "card"> 
                <ImageCard
                    url = {images.url}
                    fileName = {images.fileName}
                    width = {300}
                    height = {150}
                /> 
                <div className = "text-container">
                    <h3> ${rentalPrice} / month</h3>
                    <p>{propertyname}</p>
                </div>   
            </div>
        </Link>
  
    )
}
    export default Card;
