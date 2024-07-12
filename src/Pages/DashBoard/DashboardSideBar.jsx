import DashBoardMenu from "./DashBoardMenu";

const DashboardSideBar = () => {

    return (
        <div className="fixed left-0 top-0 w-64 h-screen shadow-xl  bg-primary">
            <div className="w-full min-h-full bg-base-200 text-base-content">

                <DashBoardMenu />

            </div>
        </div>
    );
};

export default DashboardSideBar;