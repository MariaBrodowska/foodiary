import React, { useState } from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import axios from "axios";

const BackgroundImages = () => (
  <>
    <img
      src="dashboardpage/green-ellipse.png"
      alt="green ellipse"
      className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
    />
  </>
);

const SettingsSection = () => {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Hasła nie są identyczne");
      return;
    }

    try {
      console.log("Zmiana hasła:", passwordData.newPassword);
      alert("Hasło zostało zmienione");
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Błąd zmiany hasła:", error);
    }
  };

  const handleDeactivateAccount = async () => {
    if (
      window.confirm(
        "Czy na pewno chcesz dezaktywować konto? Będziesz mógł je reaktywować poprzez ponowne zalogowanie."
      )
    ) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/deactivate",
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert("Konto zostało dezaktywowane");
          await axios.post(
            "http://localhost:3000/api/user/logout",
            {},
            {
              withCredentials: true,
            }
          );
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Błąd dezaktywacji konta:", error);
        alert("Wystąpił błąd podczas dezaktywacji konta");
      }
    }
  };

  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-6xl mx-auto rounded-2xl shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Ustawienia konta
        </h1>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Zmiana hasła
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nowe hasło
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Wprowadź nowe hasło"
                      className="w-full px-4 py-3 rounded-xl border border-[#858585] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Potwierdź hasło
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Potwierdź nowe hasło"
                      className="w-full px-4 py-3 rounded-xl border border-[#858585] bg-white text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={handlePasswordSave}
                  className="mt-4 bg-[#EFBD4C] hover:bg-yellow-500 text-black px-6 py-2 rounded-3xl font-semibold text-sm"
                >
                  ZMIEŃ HASŁO
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  Dezaktywacja konta
                </h3>
                <p className="text-gray-600 mb-4">
                  Dezaktywacja konta spowoduje wylogowanie i tymczasowe
                  wyłączenie dostępu. Możesz reaktywować konto poprzez ponowne
                  zalogowanie.
                </p>
                <button
                  onClick={handleDeactivateAccount}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-3xl font-semibold text-sm"
                >
                  DEZAKTYWUJ KONTO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const SettingsPage = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
        <NavbarAuth />
      </div>

      <div className="relative w-full pb-10">
        <BackgroundImages />

        <div className="relative w-full flex justify-center mb-16">
          <SettingsSection />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
