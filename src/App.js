import './App.css';
import { Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import PromptPage from './pages/PromptPage';
import Join from './pages/Join';
import SignInPage from './pages/SignInPage/signInPage';
import ResultPage from './pages/ResultPage/resultPage';
import LandingPage from './pages/LandingPage/landingPage';
import RecommendingPage from './pages/RecommendingPage/recommendingPage';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoadingPage from './pages/LoadingPage/loadingPage';
import CommunityPage from './pages/CommunityPage/index';
import UploadPage from './pages/CommunityPage/uploadPage';
import PostPage from './pages/CommunityPage/postPage';
import HistoryPage from './pages/HistoryPage/historyPage';
import SettingPage from './pages/SettingPage/index';
import PromptLoadingPage from './pages/PromptPage/promptLoading';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login/callback" element={<LoadingPage />} />
        {/*<Route path="/auth/*" element={<LoadingPage />} />*/}
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/main" element={<LandingPage />} />
        <Route path="/" element={<SplashScreen />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/recommendingPage" element={<RecommendingPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/promptloading" element={<PromptLoadingPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/upload" element={<UploadPage />} />
        <Route path="/community/post" element={<PostPage />} />
        <Route path="/community/post/:postId" element={<PostPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </div>
  );
};
export default App;
