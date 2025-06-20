import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import SamplePlans from "./pages/SamplePlans";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import MealPlansPage from "./pages/MealPlansPage";
import MyPlansPage from "./pages/MyPlansPage";
import ShoppingList from "./pages/ShoppingList";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import FavoritePlansPage from "./pages/FavoritePlansPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* publiczne */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sampleplans" element={<SamplePlans />} />

        {/* dla niezalogowanycyh */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* chronione */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mealplans"
          element={
            <ProtectedRoute>
              <MealPlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myplans"
          element={
            <ProtectedRoute>
              <MyPlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shoppinglist"
          element={
            <ProtectedRoute>
              <ShoppingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourite"
          element={
            <ProtectedRoute>
              <FavoritePlansPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
