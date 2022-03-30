import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './announcementPage.scss';
import ListTop from '../components/list/listTop';

const AnnouncementPage = ({
  announcements,
  setAnnouncements,
}) => {
  const location = useLocation();
  const {
    title, description, time, item,
  } = location.state;
  const hourMinutes = new Date(time).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  let day = new Date(time).getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[new Date(time).getMonth()];

  return (
    <div className="page-announcement">
      <div className="page-announcement_container">
        <div className="page-announcement_container_link-time">
          <Link to="/Announcement-Website/" className="link">
            Home
          </Link>
          <p className="time">
            <span>
              {day}
              {' '}
              {month}
            </span>
            <span>{hourMinutes}</span>
          </p>
        </div>
        <div className="page-announcement_container_info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="page-announcement_container_top-alike">
          <ListTop
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            elementItem={item}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;

AnnouncementPage.propTypes = {
  announcements: PropTypes.array,
  setAnnouncements: PropTypes.func,
};

AnnouncementPage.defaultProps = {
  announcements: [],
  setAnnouncements: () => {},
};
