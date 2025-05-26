import React, { useState } from "react";
import WelcomePageBackground from "../components/WelcomePageBackground";
import { useNavigate, Link } from "react-router-dom";
import Logo1 from "../components/Logo1";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarNotAuth from "../components/NavbarNotAuth";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error, isLoading } = useLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.email, formData.password);
    };

    return (
        <div className='bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden'>
            <WelcomePageBackground />
            <Logo1/>
            <NavbarNotAuth/>

            <form onSubmit={handleSubmit} className="flex flex-col relative items-center w-2/3 max-w-3xl bg-[#ffffff] rounded-[30px] lg:px-20 lg:py-13 sm:p-15 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] mt-15">
                <p className="text-[#000000] font-bold lg:text-[48px] sm:text-[38px] pb-5">Logowanie</p>
                <p className="text-[#979797] font-medium lg:text-[24px] sm:text-[20px] text-center">
                    Witaj ponownie! Zaloguj się do swojego konta</p>

                {error && (
                    <div className="w-full p-4 my-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <Input label={"Email"} name={"email"} value={formData.email} onChange={handleChange} />
                <Input label={"Hasło"} name={"password"} type="password" value={formData.password} onChange={handleChange} />

                <Link to="/forgot-password" className="text-[#979797] font-semibold text-[22px] self-end pt-2 cursor-pointer">
                    Zapomniałeś hasła?
                </Link>

                <Button 
                    value={isLoading ? "PRZETWARZANIE..." : "ZALOGUJ SIĘ"} 
                    disabled={isLoading}
                    extraClasses={isLoading ? "opacity-70 cursor-not-allowed" : ""}
                />

                <p className="text-[#000000] font-semibold text-[20px] mt-8 text-center">
                    Nie masz konta? 
                    <Link to="/register" className="font-extrabold cursor-pointer"> Zarejestruj się</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;