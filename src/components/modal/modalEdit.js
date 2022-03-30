import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './modalEdit.scss';

const ModalEdit = ({
  closeModalInfo,
  title,
  description,
  announcements,
  setAnnouncements,
  item,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editText, setEditText] = useState(description);
  const ERROR_INPUT = 'This field cannot be empty';

  const [titleInputDirty, setTitleInputDirty] = useState(false);
  const [titleInputError, setTitleInputError] = useState(ERROR_INPUT);
  const [textAreaInputDirty, setTextAreaInputDirty] = useState(false);
  const [textAreaInputError, setTextAreaInputError] = useState(ERROR_INPUT);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const closeModalURL = () => {
    navigate('./');
    closeModalInfo(false);
  };

  useEffect(() => {
    if (
      titleInputError
          || textAreaInputError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [titleInputError, textAreaInputError]);

  const inputTitleHandler = (e) => {
    setEditTitle(e.target.value);
    if (e.target.value.length < 5) {
      setTitleInputError('Title must be at least 5 characters');
      if (!e.target.value) {
        setTitleInputError(ERROR_INPUT);
      }
    } else {
      setTitleInputError('');
    }
  };

  const textareaTextHandler = (e) => {
    setEditText(e.target.value);
    if (e.target.value.length < 20) {
      setTextAreaInputError('Description must be at least 20 characters');
      if (!e.target.value) {
        setTextAreaInputError(ERROR_INPUT);
      }
    } else {
      setTextAreaInputError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitleInputDirty(true);
        break;
      case 'textArea':
        setTextAreaInputDirty(true);
        break;
      default:
        break;
    }
  };

  const submitEditItemHandler = (e) => {
    e.preventDefault();
    setAnnouncements(announcements.map((el) => {
      if (el.id === item.id) {
        return {
          ...item,
          title: editTitle,
          description: editText,
        };
      }
      return el;
    }));
    closeModalURL();
  };

  return (
    <div
      className="modal-edit_background"
      onClick={closeModalURL}
      role="button"
      tabIndex="0"
      onKeyPress={() => {}}
    >
      <div
        className="modal-edit_container"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
      >
        <div className="modal-edit_container_close-btn">
          <button
            type="button"
            className="close-btn"
            onClick={closeModalURL}
          >
            <span className="icon-cross" />
          </button>
        </div>
        <div className="modal-edit_container_title">
          <h2>New Announcement</h2>
        </div>
        <form
          onSubmit={submitEditItemHandler}
          className="modal-edit_container_form"
        >
          <input
            value={editTitle}
            onChange={inputTitleHandler}
            onBlur={blurHandler}
            type="text"
            placeholder="Title"
            name="title"
          />
          {titleInputDirty && titleInputError && (
            <p style={{ color: 'red' }}>{titleInputError}</p>
          )}
          <textarea
            value={editText}
            onChange={textareaTextHandler}
            onBlur={blurHandler}
            placeholder="Description"
            maxLength="200"
            name="textArea"
          />
          {textAreaInputDirty && textAreaInputError && (
            <p style={{ color: 'red' }}>{textAreaInputError}</p>
          )}
          <div className="modal-edit_container_form_btns">
            <button
              className="cancel-btn"
              type="button"
              onClick={closeModalURL}
            >
              Cancel
            </button>
            <button disabled={!formValid} type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;

ModalEdit.propTypes = {
  announcements: PropTypes.array,
  closeModalInfo: PropTypes.func,
  setAnnouncements: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  item: PropTypes.object,
};

ModalEdit.defaultProps = {
  announcements: [],
  closeModalInfo: () => {},
  setAnnouncements: () => {},
  title: '',
  description: '',
  item: {},
};
