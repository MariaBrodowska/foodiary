import React, { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PlanDetails from "../components/plans/PlanDetails";
import PlansList from "../components/plans/PlansList";
import Modal from "../components/modals/Modal";
import PlanForm from "../components/forms/PlanForm";
import SearchInput from "../components/forms/SearchInput";
import useMyPlans from "../hooks/useMyPlans";
import usePlanForm from "../hooks/usePlanForm";

const MyPlansSection = ({ setSelectedPlan }) => {
  const {
    plans,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    createPlan,
    updatePlan,
    deletePlan,
    clearError,
  } = useMyPlans();

  const {
    formData,
    handleInputChange,
    handleImageUpload,
    removeImage,
    resetForm,
    updateFormData,
  } = usePlanForm();

  const [editingPlan, setEditingPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = null;
    if (editingPlan) {
      result = await updatePlan(editingPlan._id, formData);
    } else {
      result = await createPlan(formData);
    }

    if (result.success) {
      resetForm();
      setShowForm(false);
      setEditingPlan(null);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    updateFormData(plan);
    setShowForm(true);
  };

  const handleDelete = async (planId, planName) => {
    if (window.confirm(`Czy na pewno chcesz usunąć plan "${planName}"?`)) {
      await deletePlan(planId);
    }
  };

  const handleCancelForm = () => {
    resetForm();
    setEditingPlan(null);
    setShowForm(false);
    clearError(); //anulowanie czysciemy bledy
  };

  const handleAddPlan = () => {
    clearError(); //nowy plan czyscimy bledy
    setShowForm(true);
  };

  return (
    <main className="relative mt-20 sm:mt-24 lg:mt-30 z-10 bg-[#EDEDED] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-full sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Moje plany żywieniowe
        </h1>
        <button
          onClick={handleAddPlan}
          className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-3xl font-semibold text-sm sm:text-base w-full sm:w-auto"
        >
          + Dodaj nowy plan
        </button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Szukaj po nazwie..."
        />
      </div>

      <Modal
        isOpen={showForm}
        onClose={handleCancelForm}
        title={editingPlan ? "Edytuj plan" : "Dodaj nowy plan"}
      >
        {error && (
          <div className="w-full p-3 sm:p-4 mb-3 sm:mb-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <PlanForm
          formData={formData}
          editingPlan={editingPlan}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onImageRemove={removeImage}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      </Modal>

      <PlansList
        plans={plans}
        loading={loading}
        searchQuery={searchQuery}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={setSelectedPlan}
        onAddPlan={handleAddPlan}
      />
    </main>
  );
};

const MyPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (selectedPlan) {
    return (
      <PageLayout>
        <PlanDetails plan={selectedPlan} onBack={() => setSelectedPlan(null)} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <MyPlansSection setSelectedPlan={setSelectedPlan} />
    </PageLayout>
  );
};

export default MyPlansPage;
