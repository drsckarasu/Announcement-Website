import { useState, useEffect } from 'react';
import ListItemTop from './listItemTop';
import './listTop.scss';

const ListTop = ({
  announcements,
  setAnnouncements,
  elementItem,
}) => {
  const [listTopAnnouncement, setListTopAnnouncement] = useState([]);
  const itemTitle = elementItem.title.split(' ');
  const itemDescription = elementItem.description.split(' ');

  useEffect(() => {
    setListTopAnnouncement(announcements
      .filter(({ title, description }) => {
        const titleWords = title.split(' ');
        const descriptionWords = description.split(' ');

        const isTitleSimilar = itemTitle
          .some((word) => titleWords.includes(word));
        const isDescriptionSimilar = itemDescription
          .some((word) => descriptionWords.includes(word));
        const isTitleDescriptionSimilar = itemDescription
          .some((word) => titleWords.includes(word));
        const isDescriptionTitleSimilar = itemTitle
          .some((word) => descriptionWords.includes(word));
        return isTitleSimilar || isDescriptionSimilar
          || isTitleDescriptionSimilar || isDescriptionTitleSimilar;
      })
      .filter((el) => el.id !== elementItem.id)
      .slice(0, 3));
  }, [announcements, elementItem]);

  return (
    <div className="list-top">
      {(listTopAnnouncement.length === 0 && (
        <p className="list-top_empty">There are no content</p>
      ))
      || listTopAnnouncement
        .sort((a, b) => a.time - b.time)
        .map((item) => (
          <ListItemTop
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
};

export default ListTop;
