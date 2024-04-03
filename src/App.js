import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage/onboardingPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
      </Routes>
    </div>
  );
};
export default App;
