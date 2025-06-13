import React, { useState } from "react";
import WelcomePageBackground from "../components/common/WelcomePageBackground";
import { Link } from "react-router-dom";
import Logo1 from "../components/common/Logo1";
import Button from "../components/auth/Button";
import Input from "../components/common/Input";
import NavbarNotAuth from "../components/nav/NavbarNotAuth";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { login, error, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden px-4">
      <WelcomePageBackground />
      <Logo1 />
      <NavbarNotAuth />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative items-center w-full max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-[#ffffff] rounded-[20px] sm:rounded-[30px] px-4 sm:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-10 xl:py-13 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] mt-8 sm:mt-12 lg:mt-15"
      >
        <p className="text-[#000000] font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] pb-3 sm:pb-4 lg:pb-5 text-center">
          Logowanie
        </p>
        <p className="text-[#979797] font-medium text-sm sm:text-base lg:text-xl xl:text-[24px] text-center mb-4 sm:mb-6">
          Witaj ponownie! Zaloguj się do swojego konta
        </p>

        {error && (
          <div className="w-full p-3 sm:p-4 my-2 sm:my-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <Input
          label={"Email"}
          name={"email"}
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label={"Hasło"}
          name={"password"}
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          value={isLoading ? "LOGOWANIE..." : "ZALOGUJ SIĘ"}
          disabled={isLoading}
          extraClasses={isLoading ? "opacity-70 cursor-not-allowed" : ""}
        />
        <p className="text-[#000000] font-semibold text-sm sm:text-base lg:text-[20px] mt-4 sm:mt-6 lg:mt-8 text-center">
          Nie masz jeszcze konta?
          <Link to="/register" className="font-extrabold cursor-pointer ml-1">
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
