import Home from "./Pages/Home";
import Films from "./Pages/Films";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Customers from "./Pages/Customers";

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/films" element={<Films/>} />
      <Route path="/customers" element={<Customers/>} />
    </Routes>
  </Router>
  );
}
