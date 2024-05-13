import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
export default function CommunityPage() {
  return (
    <div>
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen px-7">
        <p className="text-amber-50">Community</p>
      </div>
      <Footer />
    </div>
  );
}
