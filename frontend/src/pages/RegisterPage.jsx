import React, { useState } from "react";
import WelcomePageBackground from "../components/common/WelcomePageBackground";
import { Link } from "react-router-dom";
import Logo1 from "../components/common/Logo1";
import Button from "../components/auth/Button";
import Input from "../components/common/Input";
import NavbarNotAuth from "../components/nav/NavbarNotAuth";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const { signup, isLoading, error } = useRegister();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    sex: "",
    activity: "",
    height: "",
    weight: "",
    goal: "",
    age: "",
  });
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    //gdy zaczyna wprowadzac czyscimy bledy
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.sex ||
      !formData.activity ||
      !formData.height ||
      !formData.weight ||
      !formData.goal ||
      !formData.age
    ) {
      setValidationError("Wszystkie pola są wymagane");
      return;
    }

    console.log("Przeslane dane:", formData);

    await signup(
      formData.email,
      formData.password,
      formData.sex,
      formData.activity,
      formData.height,
      formData.weight,
      formData.goal,
      formData.age
    );
  };

  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden px-4">
      <WelcomePageBackground />
      <Logo1 />
      <NavbarNotAuth />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative items-center w-full max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-[#ffffff] rounded-[20px] sm:rounded-[30px] px-4 sm:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-10 xl:py-13 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] mt-8 sm:mt-12 lg:mt-30 mb-8 sm:mb-12 lg:mb-20"
      >
        <p className="text-[#000000] font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] pb-3 sm:pb-4 lg:pb-5 text-center">
          Rejestracja
        </p>
        <p className="text-[#979797] font-medium text-sm sm:text-base lg:text-xl xl:text-[24px] text-center mb-4 sm:mb-6">
          Witaj! Uzupełnij swoje dane, aby zarządzać dietą
        </p>

        {(error || validationError) && (
          <div className="w-full p-3 sm:p-4 my-2 sm:my-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error || validationError}
          </div>
        )}

        <Input
          label={"Email"}
          name={"email"}
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

        <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-10">
          <div className="flex flex-col w-full lg:w-1/4">
            <label
              htmlFor="sex"
              className="text-[#000000] font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2"
            >
              Płeć
            </label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-3 sm:p-4 text-sm sm:text-base"
            >
              <option value="">Wybierz</option>
              <option value="female">Kobieta</option>
              <option value="male">Mężczyzna</option>
            </select>
          </div>

          <div className="flex flex-col w-full lg:w-3/4">
            <label
              htmlFor="activity"
              className="text-[#000000] font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2"
            >
              Aktywność fizyczna
            </label>
            <select
              name="activity"
              id="activity"
              value={formData.activity}
              onChange={handleChange}
              className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-3 sm:p-4 text-sm sm:text-base"
            >
              <option value="">Wybierz</option>
              <option value="high">
                Wysoka (treningi 5-7 razy w tygodniu)
              </option>
              <option value="moderate">
                Umiarkowana (treningi 1-3 razy w tygodniu)
              </option>
              <option value="low">Niska (siedzący tryb życia)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-10">
          <div className="flex flex-col w-full sm:w-1/2">
            <p className="text-black font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2">
              Wzrost
            </p>
            <div className="flex items-center rounded-[20px] py-3 sm:py-4 px-3 sm:px-4 w-full border-1 border-solid border-[#000000]">
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="flex-grow outline-none text-black bg-transparent text-sm sm:text-base"
              />
              <span className="px-2 font-semibold text-black text-sm sm:text-base">
                cm
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2">
            <p className="text-black font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2">
              Waga
            </p>
            <div className="flex items-center rounded-[20px] py-3 sm:py-4 px-3 sm:px-4 w-full border-1 border-solid border-[#000000]">
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="flex-grow outline-none text-black bg-transparent text-sm sm:text-base"
              />
              <span className="px-2 font-semibold text-black text-sm sm:text-base">
                kg
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-10">
          <div className="flex flex-col w-full sm:w-1/2">
            <p className="text-black font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2">
              Wiek
            </p>
            <div className="flex items-center rounded-[20px] py-3 sm:py-4 px-3 sm:px-4 w-full border-1 border-solid border-[#000000]">
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="flex-grow outline-none text-black bg-transparent text-sm sm:text-base"
              />
              <span className="px-2 font-semibold text-black text-sm sm:text-base">
                lat(a)
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="goal"
              className="text-[#000000] font-semibold text-lg sm:text-xl lg:text-[22px] self-start pt-4 sm:pt-6 lg:pt-8 pb-2"
            >
              Cel
            </label>
            <select
              name="goal"
              id="goal"
              value={formData.goal}
              onChange={handleChange}
              className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-3 sm:p-4 text-sm sm:text-base"
            >
              <option value="">Wybierz</option>
              <option value="maintainWeight">Utrzymać wagę</option>
              <option value="loseWeight">Schudnąć</option>
              <option value="gainWeight">Przytuć</option>
            </select>
          </div>
        </div>
        <Button
          value={isLoading ? "PRZETWARZANIE..." : "ZAŁÓŻ KONTO"}
          disabled={isLoading}
          extraClasses={isLoading ? "opacity-70 cursor-not-allowed" : ""}
        />
        <p className="text-[#000000] font-semibold text-sm sm:text-base lg:text-[20px] mt-4 sm:mt-6 lg:mt-8 text-center">
          Masz już konto?
          <Link to="/login" className="font-extrabold cursor-pointer ml-1">
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
