import React from "react";

const Input = ({label, name}) => {
    return (
    <p className="w-full">
        <p className="text-[#000000] font-semibold text-[22px] self-start pt-8 pb-2">{label}</p>
        <input type={name} id={name} name={name} required className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4"/>
    </p>
    );
}

export default Input;