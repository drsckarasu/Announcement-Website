import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalAdd from '../components/modal/modalAdd';
import Search from '../components/search/search';
import List from '../components/list/list';
import './main.scss';

const Main = ({
  announcements,
  setAnnouncements,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [filterAnnouncements, setFilterAnnouncements] = useState([]);

  useEffect(() => {
    setFilterAnnouncements(announcements
      .filter((announcement) => (
        announcement.title.toLowerCase().includes(searchStatus.toLowerCase()))));
  }, [searchStatus, announcements]);

  return (
    <div className="main">
      <div className="content">
        <div className="content_inputs">
          <Search searchStatus={searchStatus} setSearchStatus={setSearchStatus} />
          <Link to="/Announcement-Website/add_announcement">
            <button type="button" onClick={() => setOpenModal(true)} className="open-btn">
              <span className="icon-cross" />
            </button>
          </Link>
          {openModal && (
            <ModalAdd
              closeModal={setOpenModal}
              announcements={announcements}
              setAnnouncements={setAnnouncements}
            />
          )}
        </div>
        <List
          filterAnnouncements={filterAnnouncements}
          announcements={announcements}
          setAnnouncements={setAnnouncements}
        />
      </div>
    </div>
  );
};

export default Main;

Main.propTypes = {
  announcements: PropTypes.array,
  setAnnouncements: PropTypes.func,
};

Main.defaultProps = {
  announcements: [],
  setAnnouncements: () => {},
};
