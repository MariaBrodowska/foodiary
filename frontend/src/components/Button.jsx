import React from "react";

const Button = ({value}) => {
    return (
        <input type="submit" className="bg-[#091B2B] self-center text-white py-5 px-15 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer mt-8" value={value}/>
    );
}

export default Button;