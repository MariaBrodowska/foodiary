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
    searchQuery,
    setSearchQuery,
    createPlan,
    updatePlan,
    deletePlan,
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

    let success = false;
    if (editingPlan) {
      success = await updatePlan(editingPlan._id, formData);
    } else {
      success = await createPlan(formData);
    }

    if (success) {
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
  };

  const handleAddPlan = () => {
    setShowForm(true);
  };

  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Moje plany żywieniowe
        </h1>
        <button
          onClick={handleAddPlan}
          className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-6 py-3 rounded-3xl font-semibold"
        >
          + Dodaj nowy plan
        </button>
      </div>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Szukaj po nazwie..."
      />

      <Modal
        isOpen={showForm}
        onClose={handleCancelForm}
        title={editingPlan ? "Edytuj plan" : "Dodaj nowy plan"}
      >
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

  const { deletePlan } = useMyPlans();

  const handleEdit = () => {
    setSelectedPlan(null);
  };

  const handleDelete = async (planId, planName) => {
    if (window.confirm(`Czy na pewno chcesz usunąć plan "${planName}"?`)) {
      const success = await deletePlan(planId);
      if (success) {
        setSelectedPlan(null);
      }
    }
  };

  if (selectedPlan) {
    return (
      <PageLayout>
        <PlanDetails
          plan={selectedPlan}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={() => setSelectedPlan(null)}
        />
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
