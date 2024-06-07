/* eslint-disable react/prop-types */

const ButtonLight = ({text}) => {
    return (
        <p className='px-8 py-3 rounded-full bg-primary/10  hover:bg-primary text-primary hover:text-white font-medium transition-all duration-200 cursor-pointer'>{text}</p>
    );
};  

export default ButtonLight;