import ProductGallery from "../../Components/ProductGallery/ProductGallery";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";

const Gallery = () => {
    return (
        <div className="space-y-5 px-2">
            <RoutesTitle />
           <ProductGallery/> 
        </div>
    );
};

export default Gallery;