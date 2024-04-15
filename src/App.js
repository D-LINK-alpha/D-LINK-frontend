import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage/onboardingPage';
import SignInPage from './pages/SignInPage/signInPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
      </Routes>
    </div>
  );
};
export default App;