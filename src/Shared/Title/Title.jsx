/* eslint-disable react/prop-types */

const  Title = ({ text }) => {
    return (
        <div className=" pb-5 w-max flex gap-4 items-center">
            <div className="w-2 h-2 bg-primary"></div>
            <h2 className="text-2xl font-bold">{text}</h2>
        </div>
    );
};

export default Title;