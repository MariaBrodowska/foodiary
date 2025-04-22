import React, { useState } from "react";
import WelcomePageBackground from "../components/WelcomePageBackground";
import { Link } from "react-router-dom";
import Logo1 from "../components/Logo1";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarNotAuth from "../components/NavbarNotAuth";

const RegisterPage = () => {
    return (
        <div className='bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden'>
            <WelcomePageBackground />
            <Logo1/>
            <NavbarNotAuth/>

            <form onSubmit={handleSubmit} className="flex flex-col relative items-center w-2/3 max-w-3xl bg-[#ffffff] rounded-[30px] lg:px-20 lg:py-13 sm:p-15 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] mt-30 mb-20">
                <p className="text-[#000000] font-bold lg:text-[48px] sm:text-[38px] pb-5">Rejestracja</p>
                <p className="text-[#979797] font-medium lg:text-[24px] sm:text-[20px] text-center">
                    Witaj! Uzupełnij swoje dane, aby zarządzać dietą
                </p>

                <Input label={"Email"} name={"email"} value={formData.email} onChange={handleChange} />
                <Input label={"Hasło"} name={"password"} value={formData.password} onChange={handleChange} />

                <div className="flex justify-between w-full space-x-10">
                    <div className="flex flex-col w-1/4">
                        <label htmlFor="sex" className="text-[#000000] font-semibold text-[22px] self-start pt-8 pb-2">Płeć</label>
                        <select name="sex" id="sex" value={formData.sex} onChange={handleChange} className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4">
                            <option value="">Wybierz</option>
                            <option value="female">Kobieta</option>
                            <option value="male">Mężczyzna</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-3/4">
                        <label htmlFor="activity" className="text-[#000000] font-semibold text-[22px] self-start pt-8 pb-2">Aktywność fizyczna</label>
                        <select name="activity" id="activity" value={formData.activity} onChange={handleChange} className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4">
                            <option value="">Wybierz</option>
                            <option value="high">Wysoka (treningi 5-7 razy w tygodniu)</option>
                            <option value="moderate">Umiarkowana (treningi 1-3 razy w tygodniu)</option>
                            <option value="low">Niska (siedzący tryb życia)</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between w-full space-x-10">
                    <div className="flex flex-col w-1/2">
                        <p className="text-black font-semibold text-[22px] self-start pt-8 pb-2">Wzrost</p>
                        <div className="flex items-center rounded-[20px] p-4 w-full border-1 border-solid border-[#000000]">
                            <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className="flex-grow outline-none text-black bg-transparent" />
                            <span className="ml-2 font-semibold text-black">cm</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <p className="text-black font-semibold text-[22px] self-start pt-8 pb-2">Waga</p>
                        <div className="flex items-center rounded-[20px] p-4 w-full border-1 border-solid border-[#000000]">
                            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="flex-grow outline-none text-black bg-transparent" />
                            <span className="ml-2 font-semibold text-black">kg</span>
                        </div>
                    </div>
                </div>

                <Button value={"ZAŁÓŻ KONTO"} />

                <p className="text-[#000000] font-semibold text-[20px] mt-8 text-center">
                    Masz już konto?
                    <Link to="/login" className="font-extrabold cursor-pointer"> Zaloguj się</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;