import React from "react";
import PlanCard from "./PlanCard";
import EmptyPlansState from "./EmptyPlansState";
import LoadingSpinner from "../common/LoadingSpinner";

const PlansList = ({
  plans,
  loading,
  searchQuery,
  onEdit,
  onDelete,
  onSelect,
  onAddPlan,
}) => {
  if (loading) {
    return <LoadingSpinner message="Ładowanie planów..." />;
  }

  if (plans.length === 0) {
    return <EmptyPlansState searchQuery={searchQuery} onAddPlan={onAddPlan} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default PlansList;
