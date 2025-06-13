import React, { useState, useEffect } from "react";
import NavbarAuth from "../components/nav/NavbarAuth";
import Logo2 from "../components/common/Logo2";
import useUserData from "../hooks/useUserData";
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

const ProfileSection = () => {
  const { userData, isLoading, refetch } = useUserData();
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    sex: "",
    activity: "",
    height: "",
    weight: "",
    goal: "",
    age: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email || "",
        sex: userData.sex || "",
        activity: userData.activity || "",
        height: userData.height || "",
        weight: userData.weight || "",
        goal: userData.goal || "",
        age: userData.age || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //ja wpisujemy to czyscimy bledy walidacji
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    //czyszczenie komunikatow bledu i sukcesu
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3000/api/user/profile", formData, {
        withCredentials: true,
      });

      setEditMode(false);
      setSuccess("Dane zostały pomyślnie zaktualizowane");
      setError(null);
      setValidationErrors({});

      //odswiezenie zmian
      await refetch();

      //usuwanie komunikatu po 3s
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Błąd aktualizacji profilu:", error);

      let errorMessage = "Wystąpił błąd podczas aktualizacji danych";
      let fieldErrors = {};

      if (error.response?.data) {
        const { error: serverError, fieldErrors: serverFieldErrors } =
          error.response.data;

        if (serverFieldErrors) {
          fieldErrors = serverFieldErrors;
          errorMessage = "Proszę poprawić błędy w formularzu";
        } else if (serverError) {
          errorMessage = serverError;
        }
      }

      setError(errorMessage);
      setValidationErrors(fieldErrors);
      setSuccess(null);
    }
  };

  const handleCancel = () => {
    //przywrocenie ogryginalnych dannych
    if (userData) {
      setFormData({
        email: userData.email || "",
        sex: userData.sex || "",
        activity: userData.activity || "",
        height: userData.height || "",
        weight: userData.weight || "",
        goal: userData.goal || "",
        age: userData.age || "",
      });
    }

    setEditMode(false);
    setError(null);
    setSuccess(null);
    setValidationErrors({});
  };

  if (isLoading) {
    return <div className="text-center py-10">Ładowanie...</div>;
  }

  return (
    <main className="relative mt-20 sm:mt-24 lg:mt-30 z-10 bg-[#EDEDED] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto rounded-2xl shadow-2xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Mój Profil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              TDEE
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-[#FFC440]">
              {userData?.additionalData?.tdee || 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">kcal/dzień</p>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Cel Kaloryczny
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-[#FFC440]">
              {userData?.additionalData?.targetCalories || 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">kcal/dzień</p>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Nawodnienie
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-[#FFC440]">
              {userData?.additionalData?.waterIntake || 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">ml/dzień</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Dane osobowe
            </h2>
            <button
              onClick={() => (editMode ? handleSave() : setEditMode(true))}
              className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-4 sm:px-6 py-2 rounded-3xl font-semibold text-sm w-full sm:w-auto"
            >
              {editMode ? "ZAPISZ" : "EDYTUJ"}
            </button>
            {editMode && (
              <button
                onClick={handleCancel}
                className="px-4 sm:px-6 py-2 rounded-3xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm w-full sm:w-auto"
              >
                ANULUJ
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.email
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Płeć
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.sex
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
              </select>
              {validationErrors.sex && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.sex}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Wiek
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.age
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              />
              {validationErrors.age && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.age}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Wzrost (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.height
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              />
              {validationErrors.height && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.height}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Waga (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.weight
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              />
              {validationErrors.weight && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.weight}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Aktywność
              </label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.activity
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="low">Niska aktywność</option>
                <option value="moderate">Umiarkowana aktywność</option>
                <option value="high">Wysoka aktywność</option>
              </select>
              {validationErrors.activity && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.activity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Cel
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-sm ${
                  validationErrors.goal
                    ? "border-red-500"
                    : editMode
                    ? "border-[#858585] bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="maintainWeight">Utrzymanie wagi</option>
                <option value="loseWeight">Utrata wagi</option>
                <option value="gainWeight">Przyrost wagi</option>
              </select>
              {validationErrors.goal && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.goal}
                </p>
              )}
            </div>
          </div>

          {/* {editMode && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-4 sm:px-6 py-2 rounded-3xl font-semibold text-sm order-2 sm:order-1"
              >
                ZAPISZ
              </button>
              <button
                onClick={handleCancel}
                className="px-4 sm:px-6 py-2 rounded-3xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm order-1 sm:order-2"
              >
                ANULUJ
              </button>
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
};

const ProfilePage = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
        <NavbarAuth />
      </div>

      <div className="relative w-full pb-10">
        <BackgroundImages />

        <div className="relative w-full flex justify-center mb-16">
          <ProfileSection />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
