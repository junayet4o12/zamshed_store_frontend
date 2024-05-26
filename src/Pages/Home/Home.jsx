import CategoryMarque from "../../Components/CategoryMarque/CategoryMarque";
import ProductGallery from "../../Components/ProductGallery/ProductGallery";

const Home = () => {
    
    return (
        <div className="space-y-10 py-5">
            <CategoryMarque/>
            <ProductGallery/>
            
        </div>
    );
};

export default Home;