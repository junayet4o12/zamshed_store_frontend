import { Outlet } from "react-router-dom";
import AddressNavbar from "../Components/AddressNavbar/AddressNavbar";
import MainNavbar from "../Components/MainNavbar/MainNavbar";

const MainLayout = () => {
    return (
        <div className="relative pb-10">
            <section className="hidden subxl:block">
                <AddressNavbar />
            </section>
            <section className="sticky top-0 z-10">
                <MainNavbar />
            </section>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;