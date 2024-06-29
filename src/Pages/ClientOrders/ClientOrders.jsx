import { NavLink, Outlet } from "react-router-dom";
import { useGetClientOrdersCountQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";

const ClientOrders = () => {
    const { data, isLoading } = useGetClientOrdersCountQuery()
    if (isLoading) {
        return <Loading />
    }
    console.log(data);
    const LinkStyle = `flex items-center gap-2 cursor-pointer navLinkParent transition-all duration-300 relative`
    const StylingComponents = <div className="w-1.5 h-1.5 bg-primary navLinkStyle absolute left-0"></div>
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle />
            <Title text={`Client Products (${data?.all})`} />
            <div>
                <ul className="flex gap-4">
                    <NavLink to={'/clientOrders/pending'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Pending ({data?.pending})
                        </li>
                    </NavLink>
                    <NavLink to={'/clientOrders/onProcessing'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            On Processing ({data?.onProcessing})
                        </li>
                    </NavLink>
                    <NavLink to={'/clientOrders/completed'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Completed ({data?.completed})
                        </li>
                    </NavLink>
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default ClientOrders;