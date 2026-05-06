import HomeView from '../views/HomeView';
import { useHome } from '../hooks/useHome';

const HomePage: React.FC = () => {
  const { messages, onRefresh } = useHome();

  return (
    <HomeView messages={messages} onRefresh={onRefresh} />
  );
};

export default HomePage;

