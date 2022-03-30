import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Main from './pages/main';
import AnnouncementPage from './pages/announcementPage';
import ModalAdd from './components/modal/modalAdd';
import ModalEdit from './components/modal/modalEdit';

const App = () => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const getLocalAnnouncements = () => {
      if (!JSON.parse(localStorage.getItem('announcements'))) {
        localStorage.setItem('announcements', JSON.stringify([]));
      } else {
        const announcementLocal = JSON.parse(localStorage.getItem('announcements'));
        setAnnouncements(announcementLocal);
      }
    };
    getLocalAnnouncements();
  }, []);

  useEffect(() => {
    const saveLocalAnnouncements = () => {
      localStorage.setItem('announcements', JSON.stringify(announcements));
    };
    saveLocalAnnouncements();
  }, [announcements]);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main announcements={announcements} setAnnouncements={setAnnouncements} />}>
            <Route path="/add_announcement" element={<ModalAdd />} />
            <Route path="/edit-modal/:id" element={<ModalEdit />} />
          </Route>
          <Route path="/page_announcement/:id" element={<AnnouncementPage announcements={announcements} setAnnouncements={setAnnouncements} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
