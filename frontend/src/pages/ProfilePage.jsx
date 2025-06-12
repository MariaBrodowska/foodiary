import React, { useState, useEffect } from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
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
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditMode(false);
      refetch();
    } catch (error) {
      console.error("Błąd aktualizacji profilu:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Ładowanie...</div>;
  }

  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-6xl mx-auto rounded-2xl shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mój Profil
        </h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">TDEE</h3>
              <p className="text-3xl font-bold text-[#FFC440]">
                {userData?.additionalData?.tdee || 0}
              </p>
              <p className="text-sm text-gray-500">kcal/dzień</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Cel Kaloryczny
              </h3>
              <p className="text-3xl font-bold text-[#FFC440]">
                {userData?.additionalData?.targetCalories || 0}
              </p>
              <p className="text-sm text-gray-500">kcal/dzień</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nawodnienie
              </h3>
              <p className="text-3xl font-bold text-[#FFC440]">
                {userData?.additionalData?.waterIntake || 0}
              </p>
              <p className="text-sm text-gray-500">ml/dzień</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Dane osobowe
              </h2>
              <button
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-6 py-2 rounded-3xl font-semibold text-sm"
              >
                {editMode ? "ZAPISZ" : "EDYTUJ"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Płeć
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                >
                  <option value="male">Mężczyzna</option>
                  <option value="female">Kobieta</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Wiek
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Wzrost (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Waga (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Aktywność
                </label>
                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                >
                  <option value="low">Niska aktywność</option>
                  <option value="moderate">Umiarkowana aktywność</option>
                  <option value="high">Wysoka aktywność</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cel
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editMode
                      ? "border-[#858585] bg-white"
                      : "border-gray-300 bg-gray-100"
                  } text-sm`}
                >
                  <option value="maintainWeight">Utrzymanie wagi</option>
                  <option value="loseWeight">Utrata wagi</option>
                  <option value="gainWeight">Przyrost wagi</option>
                </select>
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 rounded-3xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm"
                >
                  ANULUJ
                </button>
              </div>
            )}
          </div>
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
