import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import PromptPage from './pages/PromptPage';
import Join from './pages/Join';
import SignInPage from './pages/SignInPage/signInPage';
import ResultPage from './pages/ResultPage/resultPage';
import LandingPage from './pages/LandingPage/landingPage';
import LoadingPage from './pages/LoadingPage/loadingPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </div>
  );
};
export default App;
