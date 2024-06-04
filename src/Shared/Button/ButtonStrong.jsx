/* eslint-disable react/prop-types */

const ButtonStrong = ({text}) => {
    return (
        <p className='px-8 py-3 rounded-full bg-primary/90  hover:bg-primary text-white font-medium transition-all duration-200 cursor-pointer'>{text}</p>
    );
}; 

export default ButtonStrong;