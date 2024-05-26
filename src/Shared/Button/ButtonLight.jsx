/* eslint-disable react/prop-types */

const ButtonLight = ({text}) => {
    return (
        <button className='px-8 py-3 rounded-full bg-primary/10  hover:bg-primary text-primary hover:text-white font-medium transition-all duration-200'>{text}</button>
    );
};

export default ButtonLight;