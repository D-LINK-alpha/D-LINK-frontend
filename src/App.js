import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import PromptPage from './pages/PromptPage';
import Join from './pages/Join';
import SignInPage from './pages/SignInPage/signInPage';
import ResultPage from './pages/ResultPage/resultPage';
import LandingPage from './pages/LandingPage/landingPage';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoadingPage from './pages/LoadingPage/loadingPage';
import CommunityPage from './pages/CommunityPage/index';


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
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </div>
  );
};
export default App;
