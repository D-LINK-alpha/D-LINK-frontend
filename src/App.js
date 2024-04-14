import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import PromptPage from './pages/PromptPage';
import Join from './pages/Join';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
};
export default App;
