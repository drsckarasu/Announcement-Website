import PropTypes from 'prop-types';
import './list.scss';
import ListItem from './listItem';

const List = ({
  filterAnnouncements,
  announcements,
  setAnnouncements,
}) => (
  <div className="list">
    {(filterAnnouncements.length === 0 && (
    <p className="list_empty">There are no content</p>
    ))
      || filterAnnouncements
        .sort((a, b) => a.time - b.time)
        .map((item) => (
          <ListItem
            title={item.title}
            time={item.time}
            description={item.description}
            key={item.id}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            item={item}
          />
        ))}
  </div>
);

export default List;

List.propTypes = {
  announcements: PropTypes.array,
  filterAnnouncements: PropTypes.array,
  setAnnouncements: PropTypes.func,
};

List.defaultProps = {
  announcements: [],
  filterAnnouncements: [],
  setAnnouncements: () => {},
};
