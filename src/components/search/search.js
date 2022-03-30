import PropTypes from 'prop-types';
import './search.scss';

const Search = ({
  setSearchStatus,
  searchStatus,
}) => {
  const findHandler = (e) => {
    setSearchStatus(e.target.value);
  };
  return (
    <form>
      <div className="search">
        <input
          value={searchStatus}
          onChange={findHandler}
          type="text"
          placeholder="Search announcement"
          className="search_input"
        />
      </div>
    </form>
  );
};

export default Search;

Search.propTypes = {
  searchStatus: PropTypes.string,
  setSearchStatus: PropTypes.func,
};

Search.defaultProps = {
  searchStatus: '',
  setSearchStatus: () => {},
};
