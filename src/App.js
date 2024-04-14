import './App.css';
import { Route, Routes } from 'react-router-dom';
import ResultPage from './pages/ResultPage/resultPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ResultPage />} />
      </Routes>
    </div>
  );
};
export default App;
