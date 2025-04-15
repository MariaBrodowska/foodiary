import React from "react";
import WelcomePageBackground from "../components/WelcomePageBackground";
import { Link } from "react-router-dom";
import Logo1 from "../components/Logo1";
import Button from "../components/Button";
import Input from "../components/Input";


const LoginPage = () => {
    return (
        <div className='bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden'>
        <WelcomePageBackground />
        <Logo1/>

        <form className="flex flex-col relative items-center w-2/3 max-w-3xl bg-[#ffffff] rounded-[30px] lg:px-20 lg:py-13 sm:p-15 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] mt-15">
            <p className="text-[#000000] font-bold lg:text-[48px] sm:text-[38px] pb-5">Logowanie</p>
            <p className="text-[#979797] font-medium lg:text-[24px] sm:text-[20px] text-center">
                Witaj ponownie! Zaloguj się do swojego konta</p>

            <Input label={"Email"} name={"email"}/>
            <Input label={"Hasło"} name={"password"}/>

            <Link to="forgot-password" className="text-[#979797] font-semibold text-[22px] self-end pt-2 cursor-pointer">Zapomniałeś hasła?</Link>

            <Button value={"ZALOGUJ SIĘ"}/>

            <p className="text-[#000000] font-semibold text-[20px] mt-8 text-center">
                Nie masz konta? 
                <Link to="/register" className="font-extrabold cursor-pointer"> Zarejestruj się</Link>
            </p>

        </form>
    </div>
    );
}

export default LoginPage;