import { BrowserRouter, Routes, Route} from 'react-router-dom';

//pages and components
import Home from './pages/home';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={<Home />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
