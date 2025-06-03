import React, { useState, useEffect } from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import { Link } from "react-router-dom";

const BackgroundImages = () => (
    <>
      <img
        src="dashboardpage/green-ellipse.png"
        alt="green ellipse"
        className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
      />
    </>
);

const AddPlanModal = ({ isOpen, onClose, onAddPlan }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    calories: "",
    type: "",
    duration: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.calories) {
      alert("Wypełnij wszystkie wymagane pola");
      return;
    }
    
    onAddPlan({
      ...formData,
      calories: parseInt(formData.calories),
      liked: false,
      createdAt: new Date().toLocaleDateString(),
      id: Date.now()
    });
    
    setFormData({
      name: "",
      description: "",
      calories: "",
      type: "",
      duration: ""
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dodaj nowy plan</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nazwa planu *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Np. Mój plan na masę"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Opis planu *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Opisz swój plan diety..."
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Kalorie dziennie *
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                placeholder="2000"
                min="800"
                max="5000"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Typ diety
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Wybierz typ</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="vegetarian">Wegetariańska</option>
                <option value="vegan">Wegańska</option>
                <option value="mediterranean">Śródziemnomorska</option>
                <option value="balanced">Zrównoważona</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Czas trwania planu
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Wybierz okres</option>
              <option value="1 tydzień">1 tydzień</option>
              <option value="2 tygodnie">2 tygodnie</option>
              <option value="1 miesiąc">1 miesiąc</option>
              <option value="3 miesiące">3 miesiące</option>
              <option value="6 miesięcy">6 miesięcy</option>
              <option value="bezterminowo">Bezterminowo</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#EFBD4C] hover:bg-yellow-500 text-black py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Dodaj plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyPlansSection = () => {
  const [myPlans, setMyPlans] = useState([
    {
      id: 1,
      name: 'Mój plan na masę',
      description: 'Spersonalizowany plan na budowanie masy mięśniowej z wysoką zawartością białka.',
      calories: 2800,
      type: 'balanced',
      duration: '3 miesiące',
      liked: true,
      createdAt: '15.03.2024'
    },
    {
      id: 2,
      name: 'Plan redukcji',
      description: 'Niskokaloryczny plan stworzony specjalnie na okres redukcji.',
      calories: 1600,
      type: 'balanced',
      duration: '2 miesiące',
      liked: false,
      createdAt: '10.03.2024'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleAddPlan = (newPlan) => {
    setMyPlans(prev => [newPlan, ...prev]);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten plan?")) {
      setMyPlans(prev => prev.filter(plan => plan.id !== planId));
    }
  };

  const handleToggleLike = (planId) => {
    setMyPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, liked: !plan.liked } : plan
    ));
  };

  const filteredPlans = myPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || plan.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Moje plany diet</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-6 py-3 rounded-3xl font-semibold flex items-center gap-2 transition-colors"
        >
          <span className="text-xl">+</span>
          Dodaj nowy plan
        </button>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="search" className="text-gray-700 font-semibold">Szukaj w moich planach:</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Szukaj po nazwie lub opisie..."
              className="border-[#858585] border bg-white rounded-xl px-4 py-3 w-full mt-2 text-[13px]"
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="text-gray-700 font-semibold">Filtruj po typie:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border-[#858585] border bg-white rounded-xl px-4 py-3.5 w-full mt-2 text-[13px]"
            >
              <option value="">Wszystkie typy</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
              <option value="vegetarian">Wegetariańska</option>
              <option value="vegan">Wegańska</option>
              <option value="mediterranean">Śródziemnomorska</option>
              <option value="balanced">Zrównoważona</option>
            </select>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-300 border-2"/>
      </div>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm || filterType ? "Brak planów spełniających kryteria" : "Nie masz jeszcze żadnych planów"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterType ? "Spróbuj zmienić kryteria wyszukiwania" : "Rozpocznij swoją przygodę z dietą tworząc pierwszy plan"}
          </p>
          {!searchTerm && !filterType && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-8 py-3 rounded-3xl font-semibold"
            >
              Stwórz pierwszy plan
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white shadow rounded-lg p-6 relative">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl">{plan.name}</h3>
                    {plan.type && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {plan.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>📅 Utworzono: {plan.createdAt}</span>
                    {plan.duration && <span>⏱️ Czas trwania: {plan.duration}</span>}
                  </div>
                </div>
                
                <div className="flex flex-col items-end justify-between h-full min-h-[120px]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleLike(plan.id)}
                      className="text-xl hover:scale-110 transition-transform"
                    >
                      {plan.liked ? "❤️" : "🖤"}
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Usuń plan"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[#FFC440] font-semibold mb-3">
                      Kalorie: {plan.calories} kcal
                    </p>
                    <div className="flex gap-2">
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-2xl text-xs font-semibold">
                        EDYTUJ
                      </button>
                      <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-4 py-2 rounded-2xl text-xs font-semibold">
                        SZCZEGÓŁY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddPlanModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPlan={handleAddPlan}
      />
    </main>
  );
};

const MyPlansPage = () => {
    return (
        <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden relative">
          <Logo2 />
          
          <div className="absolute top-0 left-0 w-full z-20">
            <NavbarAuth />
          </div>
          
          <div className="relative w-full pb-10">
            <BackgroundImages />
            
            <div className="relative w-full flex justify-center mb-16">
              <MyPlansSection />
            </div>
          </div>
        </div>
    );
};

export default MyPlansPage;