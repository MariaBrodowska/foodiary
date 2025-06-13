import React, { useState } from "react";
import ContactPageBackground from "../components/common/ContactPageBackground";
import NavbarNotAuth from "../components/nav/NavbarNotAuth";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState({ success: null, error: null });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, error: null });

    try {
      await axios.post("http://localhost:3000/api/contact", formData);
      setStatus({ success: "Wiadomość została wysłana!", error: null });
      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        success: null,
        error: "Wystąpił błąd przy wysyłce. Spróbuj ponownie później.",
      });
    }
  };

  return (
    <div className="bg-[#F6F2E9] h-screen w-full relative flex">
      <ContactPageBackground />
      <NavbarNotAuth />

      <p className="text-black absolute flex items-center top-1/5 left-1/5 font-extrabold lg:text-[54px]">
        Skontaktuj się z nami
        <span className="text-[#717B84] text-[90px] pb-6">.</span>
      </p>

      <div className="flex flex-row items-center justify-evenly absolute top-2/5 rounded-3xl w-full pl-40">
        <div className="lg:text-[24px] sm:text-[22px] font-semibold flex flex-col">
          <div className="mt-15 mb-20">
            <p className="text-[#B7B7B7] mb-5">Adres</p>
            <p className="text-white">
              Foodiary Sp. z o.o.
              <br />
              Nadbystrzycka 38A,
              <br />
              20-618 Lublin
            </p>
          </div>
          <div>
            <p className="text-[#B7B7B7] mb-5">Dane kontaktowe</p>
            <p className="text-white">
              +48 123 456 789
              <br />
              kontakt@foodiary.com
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-white rounded-[30px] lg:px-10 lg:pt-2 lg:pb-10 sm:p-15 w-xl shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] ml-40"
        >
          <p className="text-[#000000] font-semibold text-[18px] self-start pt-8 pb-2">
            Email*
          </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4"
          />

          <p className="text-[#000000] font-semibold text-[18px] self-start pt-5 pb-2">
            Wiadomość*
          </p>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Napisz wiadomość (max. 500 znaków)"
            maxLength="500"
            required
            className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4 h-40"
          />

          <input
            type="submit"
            className="bg-[#091B2B] w-full self-center text-white py-5 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer mt-8"
            value="WYŚLIJ WIADOMOŚĆ"
          />

          {status.success && (
            <p className="text-green-600 font-semibold mt-4">
              {status.success}
            </p>
          )}
          {status.error && (
            <p className="text-red-600 font-semibold mt-4">{status.error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
