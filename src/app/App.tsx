import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import Notifications from '@/shared/ui/Notification/Notification';

const App = () => {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
      <Notifications />
    </Router>
  )
}

export default App
