import AllProducts from "../../Components/AllProducts/AllProducts";
import CategoryMarque from "../../Components/CategoryMarque/CategoryMarque";

const Home = () => {
    
    return (
        <>
            <div className="space-y-10 py-5">
                <CategoryMarque/>
                <AllProducts/>
                
            </div>
            
        </>
    );
};
export default Home;