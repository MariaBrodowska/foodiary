import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import SamplePlans from './pages/SamplePlans'
import DashboardPage from './pages/DashboardPage'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// const Card = ({title}) => {
//   const [count, setCount] = useState(0);
//   const [hasLiked, setHasLiked] = useState(false);
  
//   useEffect(() => {
//     console.log(`${title} has been liked: ${hasLiked}`);
//   }, [hasLiked]);

//   useEffect(() => {
//     console.log("CARD RENDERED")
//   }, []); //pojawia sie tylko raz keidy komponent jest renderowany

//   return(
//     <div onClick={() => setCount((prevState) => prevState = prevState + 1)}>
//       {/* <h2>{title} {count}</h2> */}
//       {/* <h2>{title} {count ? count : null}</h2> */}
//       <h2>{title} {count || null}</h2> 
//       {/* conditional rendering */}

//       {/* <h2>Card Component</h2> */}
//       <button onClick={()=>setHasLiked(!hasLiked)}>
//         {hasLiked ? 'Liked' : 'Like'}
//         </button>
//     </div>
//   )
// }

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/sampleplans" element={<SamplePlans />}/>
        <Route path="/sg" element={<DashboardPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
