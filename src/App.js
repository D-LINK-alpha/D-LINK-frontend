import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </div>
  );
};
export default App;
