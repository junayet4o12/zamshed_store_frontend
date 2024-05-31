/* eslint-disable react/prop-types */

const ButtonDanger = ({text}) => {
    return (
        <p className='px-8 py-3 rounded-full bg-primary/10  hover:bg-red-500 text-red-500 hover:text-white font-medium transition-all duration-200 cursor-pointer'>{text}</p>
    );
};

export default ButtonDanger;