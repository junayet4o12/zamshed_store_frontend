/* eslint-disable react/prop-types */

const StylishName = ({ text }) => {
    console.log(text);
    return (
        <h2 className="text-primary uppercase text-xl font-bold px-2 flex gap-2">
            {
                text.split(' ').map((item, idx) => (
                    <span key={idx}>
                        <span className="text-4xl">{item.charAt(0)}</span>
                        {item.slice(1)}
                    </span>
                ))
            }


        </h2>
    );
};

export default StylishName;