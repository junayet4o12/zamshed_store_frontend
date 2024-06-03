import { Outlet, useLocation } from "react-router-dom";
import AddressNavbar from "../Components/AddressNavbar/AddressNavbar";
import MainNavbar from "../Components/MainNavbar/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Shared/Loading/Loading";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { storeUser, toggleLoading } from "../Redux/features/userSlice/userSlice";

const MainLayout = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { isLoadingFullPage } = useSelector(state => state.userSlice)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                dispatch(storeUser({name: user?.displayName, email: user?.email}))
                dispatch(toggleLoading())
            } else {
                dispatch(toggleLoading()) 
            }
        })
    }, [])
    if (isLoadingFullPage) {
        return <Loading />
    }


    return (
        <div className="relative pb-10">
            {
                pathname === '/' && <section className="hidden subxl:block">
                    <AddressNavbar />
                </section>
            }
            <section className="sticky top-0 z-10">
                <MainNavbar />
            </section>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;