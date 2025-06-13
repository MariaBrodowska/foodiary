import React, { useState } from "react";
import NavbarAuth from "../components/nav/NavbarAuth";
import Logo2 from "../components/common/Logo2";
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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //czyscimy bledy i komunikaty
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (success) setSuccess(null);
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const validatePasswordData = () => {
    const newErrors = {};

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "Nowe hasło jest wymagane";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Hasło musi mieć co najmniej 6 znaków";
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Potwierdzenie hasła jest wymagane";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne";
    }

    return newErrors;
  };

  const handlePasswordSave = async () => {
    const validationErrors = validatePasswordData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await axios.put(
        "http://localhost:3000/api/user/change-password",
        { newPassword: passwordData.newPassword },
        { withCredentials: true }
      );

      setSuccess("Hasło zostało pomyślnie zmienione");
      setPasswordData({ newPassword: "", confirmPassword: "" });

      //usuwanie komunikatu po 5s
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      console.error("Błąd zmiany hasła:", error);

      let errorMessage = "Wystąpił błąd podczas zmiany hasła";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    if (
      window.confirm(
        "Czy na pewno chcesz dezaktywować swoje konto? Ta operacja jest nieodwracalna."
      )
    ) {
      try {
        await axios.delete("http://localhost:3000/api/user/deactivate", {
          withCredentials: true,
        });

        alert("Konto zostało dezaktywowane. Zostaniesz wylogowany.");
        window.location.href = "/login";
      } catch (error) {
        console.error("Błąd dezaktywacji konta:", error);
        alert("Wystąpił błąd podczas dezaktywacji konta. Spróbuj ponownie.");
      }
    }
  };

  return (
    <main className="relative mt-20 sm:mt-24 lg:mt-30 z-10 bg-[#EDEDED] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto rounded-2xl shadow-2xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Ustawienia Konta
        </h1>

        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <div className="border-b border-gray-200 pb-4 sm:pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
              Zmiana hasła
            </h3>

            {errors.general && (
              <div className="mb-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Nowe hasło
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Wprowadź nowe hasło"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                    errors.newPassword
                      ? "border-red-500 bg-red-50"
                      : "border-[#858585] bg-white"
                  }`}
                  disabled={loading}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Potwierdź hasło
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Potwierdź nowe hasło"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-[#858585] bg-white"
                  }`}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handlePasswordSave}
              className={`mt-3 sm:mt-4 px-4 sm:px-6 py-2 rounded-3xl font-semibold text-sm ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-[#EFBD4C] hover:bg-yellow-500 text-black"
              }`}
              disabled={loading}
            >
              {loading ? "ZMIENIANIE..." : "ZMIEŃ HASŁO"}
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3 sm:mb-4">
              Dezaktywacja konta
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Dezaktywacja konta spowoduje wylogowanie i tymczasowe zablokowanie
              dostępu do aplikacji. Ta operacja jest nieodwracalna.
            </p>
            <button
              onClick={handleDeactivateAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-3xl font-semibold text-sm transition-colors"
            >
              DEZAKTYWUJ KONTO
            </button>
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
