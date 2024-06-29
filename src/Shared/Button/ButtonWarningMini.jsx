import React from 'react';

const ButtonWarningMini = ({text}) => {
    return (
        <p className='px-5 py-2 rounded-full bg-[#9f7816]/90  hover:bg-[#9f7816] text-white font-medium transition-all duration-200 cursor-pointer text-center'>{text}</p>
    );
};

// Amber: #FFBF00
// Dark Yellow: #FFD700
// Gold: #DAA520

export default ButtonWarningMini;