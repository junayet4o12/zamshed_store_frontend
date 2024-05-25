import { Outlet } from "react-router-dom";
import AddressNavbar from "../Components/AddressNavbar/AddressNavbar";
import MainNavbar from "../Components/MainNavbar/MainNavbar";

const MainLayout = () => {
    return (
        <div>
            <section className="hidden subxl:block">
                <AddressNavbar />
            </section>
            <section className="">
                <MainNavbar/>
            </section>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;