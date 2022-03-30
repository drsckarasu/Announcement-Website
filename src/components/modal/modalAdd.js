import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './modalAdd.scss';

const ModalAdd = ({
  closeModal,
  setAnnouncements,
  announcements,
}) => {
  const ERROR_INPUT = 'This field cannot be empty';
  const [inputTitle, setInputTitle] = useState('');
  const [textareaText, setTextareaText] = useState('');
  const [titleInputDirty, setTitleInputDirty] = useState(false);
  const [titleInputError, setTitleInputError] = useState(ERROR_INPUT);
  const [textAreaInputDirty, setTextAreaInputDirty] = useState(false);
  const [textAreaInputError, setTextAreaInputError] = useState(ERROR_INPUT);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const closeModalURL = () => {
    navigate('./');
    closeModal(false);
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
    setInputTitle(e.target.value);
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
    setTextareaText(e.target.value);
    if (e.target.value.length < 20) {
      setTextAreaInputError('Description must be at least 20 characters');
      if (!e.target.value) {
        setTextAreaInputError('This field cannot be empty');
      }
    } else {
      setTextAreaInputError('');
    }
  };

  const submitAnnouncementsHandler = (e) => {
    e.preventDefault();
    setAnnouncements([
      ...announcements,
      {
        title: inputTitle,
        description: textareaText,
        time: new Date().getTime(),
        id: Math.random() * 1000,
      },
    ]);
    setInputTitle('');
    setTextareaText('');
    closeModalURL();
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

  return (
    <div
      className="modal-add_background"
      onClick={closeModalURL}
      role="button"
      tabIndex="0"
      onKeyPress={() => {}}
    >
      <div
        className="modal-add_container"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
      >
        <div className="modal-add_container_close-btn">
          <button
            type="button"
            className="close-btn"
            onClick={closeModalURL}
          >
            <span className="icon-cross" />
          </button>
        </div>
        <div className="modal-add_container_title">
          <h2>New Announcement</h2>
        </div>
        <form
          onSubmit={submitAnnouncementsHandler}
          className="modal-add_container_form"
        >
          <input
            value={inputTitle}
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
            value={textareaText}
            onChange={textareaTextHandler}
            onBlur={blurHandler}
            placeholder="Description"
            maxLength="200"
            name="textArea"
          />
          {textAreaInputDirty && textAreaInputError && (
            <p style={{ color: 'red' }}>{textAreaInputError}</p>
          )}
          <div className="modal-add_container_form_btns">
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

export default ModalAdd;

ModalAdd.propTypes = {
  announcements: PropTypes.array,
  closeModal: PropTypes.func,
  setAnnouncements: PropTypes.func,
};

ModalAdd.defaultProps = {
  announcements: [],
  closeModal: () => {},
  setAnnouncements: () => {},
};
