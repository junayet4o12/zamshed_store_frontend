import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardSideBar from "./DashboardSideBar";
import { useEffect } from "react";
import DashBoardNavBar from "./DashBoardNavBar";

const DashBoard = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        if (pathname === '/dashboard') {
            navigate('/dashboard/adminProfile')
        }
    }, [pathname])
    return (
        <div className="flex gap-6 flex-col lg:flex-row">
            <div className="min-w-64 hidden lg:block">
                <DashboardSideBar />
            </div>
            <div className=" block lg:hidden">
                <DashBoardNavBar />
            </div>
            <div className="w-full lg:max-w-[calc(100vw-300px)] lg:py-4"> <div className="w-full"><Outlet /></div></div>
        </div>
    );
};

export default DashBoard;