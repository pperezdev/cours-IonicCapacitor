import ViewMessageView from '../views/ViewMessageView';
import { useViewMessage } from '../hooks/useViewMessage';

const ViewMessagePage: React.FC = () => {
  const { message } = useViewMessage();

  return (
    <ViewMessageView message={message} />
  );
};

export default ViewMessagePage;

