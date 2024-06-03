/* eslint-disable react/prop-types */

const InputLabel = ({text}) => {
    return (
        <label>{text} <span className="text-red-500 font-bold">*</span></label>
    );
};

export default InputLabel;