import Home from "./Pages/Home";
import Films from "./Pages/Films";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/films" element={<Films/>} />
    </Routes>
  </Router>
  );
}
