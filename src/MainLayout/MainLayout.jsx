import { Outlet } from "react-router-dom";
import AddressNavbar from "../Components/AddressNavbar/AddressNavbar";

const MainLayout = () => {
    return (
        <div>
            <section className="hidden lg:block">
                <AddressNavbar />
            </section>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;