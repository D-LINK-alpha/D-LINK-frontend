import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage/onboardingPage';
import SignInPage from './pages/SignInPage/signInPage';
import LandingPage from './pages/LandingPage/landingPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
};
export default App;
