import { Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default App
