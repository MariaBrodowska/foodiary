import React from "react";

const Button = ({ value, onClick, disabled, extraClasses }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            type="submit" 
            className={`
                bg-[#242424] text-[#FFFFFF] font-semibold text-[24px] py-5 px-16 
                rounded-[50px] mt-10 w-full md:w-auto hover:bg-[#444444] 
                transition-colors duration-300 
                ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
                ${extraClasses || ''}
            `}
        >
            {value}
        </button>
    );
};

export default Button;