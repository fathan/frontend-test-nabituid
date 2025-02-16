import Alert from '@mui/material/Alert';
import { BiCheckCircle } from "react-icons/bi";

const Home: React.FC = () => {
  return (
    <div className="px-8">
      <Alert icon={<BiCheckCircle size={20} />} variant="filled" severity="info">
        Welcome to Invoice Hub Dashboard management system
      </Alert>
    </div>
  );
}

export default Home;

