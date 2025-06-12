import React, { useState } from "react";

const DIET_TYPES = [
  { value: "", label: "Brak wybranej diety" },
  { value: "vegetarian", label: "Wegetariańska" },
  { value: "vegan", label: "Wegańska" },
  { value: "ketogenic", label: "Ketogeniczna" },
  { value: "paleo", label: "Paleo" },
  { value: "gluten free", label: "Bezglutenowa" },
  { value: "pescetarian", label: "Pescetariańska" },
  { value: "primal", label: "Pierwotna" },
];

const MEAL_TYPES = {
  breakfast: {
    emoji: "🌅",
    label: "Śniadanie",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  lunch: {
    emoji: "☀️",
    label: "Obiad",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  dinner: {
    emoji: "🌙",
    label: "Kolacja",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
};

const showErrorMessage = (message) => {
  const notification = document.createElement("div");
  const baseClasses = "fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50";
  const typeClasses = "bg-red-500 text-white";

  notification.className = `${baseClasses} ${typeClasses}`;
  notification.textContent = message;

  document.body.appendChild(notification);
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
};

const usePlanForm = (initialData = null) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    breakfast: initialData?.breakfast || "",
    lunch: initialData?.lunch || "",
    dinner: initialData?.dinner || "",
    dailyCalories: initialData?.dailyCalories || "",
    dietType: initialData?.dietType || "",
    breakfastImage: initialData?.breakfastImage || "",
    lunchImage: initialData?.lunchImage || "",
    dinnerImage: initialData?.dinnerImage || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, mealType) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showErrorMessage("Proszę wybrać plik obrazu!");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          [`${mealType}Image`]: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (mealType) => {
    setFormData((prev) => ({
      ...prev,
      [`${mealType}Image`]: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      dailyCalories: "",
      dietType: "",
      breakfastImage: "",
      lunchImage: "",
      dinnerImage: "",
    });
  };

  const updateFormData = (data) => {
    setFormData({
      name: data.name || "",
      breakfast: data.breakfast || "",
      lunch: data.lunch || "",
      dinner: data.dinner || "",
      dailyCalories: data.dailyCalories || "",
      dietType: data.dietType || "",
      breakfastImage: data.breakfastImage || "",
      lunchImage: data.lunchImage || "",
      dinnerImage: data.dinnerImage || "",
    });
  };

  return {
    formData,
    handleInputChange,
    handleImageUpload,
    removeImage,
    resetForm,
    updateFormData,
  };
};

export default usePlanForm;
