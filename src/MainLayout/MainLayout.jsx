import { Outlet, useLocation } from "react-router-dom";
import AddressNavbar from "../Components/AddressNavbar/AddressNavbar";
import MainNavbar from "../Components/MainNavbar/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Shared/Loading/Loading";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { storeUser, toggleLoading } from "../Redux/features/userSlice/userSlice";
import { useCreateTokenMutation } from "../Redux/features/api/allBaseApi";
import Footer from "../Shared/Footer/Footer";

const MainLayout = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { isLoadingFullPage, user } = useSelector(state => state.userSlice)
    const [createToken, { data: token }] = useCreateTokenMutation()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }

                dispatch(storeUser(data))
                dispatch(toggleLoading())
            } else {
                localStorage.removeItem('token')
                dispatch(toggleLoading())
            }
        })
    }, [])

    useEffect(() => {
        if (user) {
            createToken({ email: user?.email })
        }
    }, [user])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token?.token)
        }
    }, [token])
    if (isLoadingFullPage) {
        return <Loading />
    }

    return (
        <div className="relative">
            {
                pathname.split('/')[1] !== 'dashboard' && <>
                    {
                        pathname === '/' && <section className="hidden subxl:block ">
                            <AddressNavbar />
                        </section>
                    }
                    <section className="sticky top-0 z-10">
                        <MainNavbar />
                    </section>
                </>
            }



            <div className="min-h-[73vh]"><Outlet></Outlet></div>
            {
                pathname.split('/')[1] == 'login' || pathname.split('/')[1] == 'register' || pathname.split('/')[1] == 'dashboard' ? '' : <Footer />
            }

        </div>
    );
};

export default MainLayout;