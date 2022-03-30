import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './listItemTop.scss';

const ListItemTop = ({
  title,
  time,
  description,
  item,
}) => (
  <Link
    to={`/page_announcement/${item.id}`}
    state={{
      title,
      description,
      time,
      item,
    }}
    className="list-item-top"
  >
    {title}
  </Link>
);

export default ListItemTop;

ListItemTop.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.number,
};

ListItemTop.defaultProps = {
  item: {},
  title: '',
  description: '',
  time: null,
};
