import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './listItem.scss';
import ModalEdit from '../modal/modalEdit';

const ListItem = ({
  title,
  time,
  description,
  announcements,
  setAnnouncements,
  item,
}) => {
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const deleteHandler = () => {
    setAnnouncements(announcements.filter((el) => el.id !== item.id));
  };
  const updateHandler = () => {
    setAnnouncements(
      announcements.map((el) => {
        if (el.id === item.id) {
          return el;
        }
        return el;
      }),
    );
    setOpenModalInfo(true);
  };

  return (
    <div className="list-item">
      <div className="list-item_info">
        <Link
          to={`/page_announcement/${item.id}`}
          state={{
            title,
            description,
            time,
            item,
          }}
          className="text"
        >
          {title}
        </Link>
      </div>
      <div className="list-item_btns">
        <button className="delete-btn" type="button" onClick={deleteHandler}>
          Delete
        </button>
        <Link to={`/edit-modal/${item.id}`}>
          <button type="button" onClick={updateHandler}>
            Edit
          </button>
        </Link>
        {openModalInfo && (
        <ModalEdit
          closeModalInfo={setOpenModalInfo}
          title={title}
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          item={item}
          description={description}
        />
        )}
      </div>
    </div>
  );
};

export default ListItem;

ListItem.propTypes = {
  announcements: PropTypes.array,
  item: PropTypes.object,
  setAnnouncements: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.number,
};

ListItem.defaultProps = {
  announcements: [],
  item: {},
  setAnnouncements: () => {},
  title: '',
  description: '',
  time: null,
};
