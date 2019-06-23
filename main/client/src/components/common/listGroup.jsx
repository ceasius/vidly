import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = props => {
  const {
    items,
    onItemSelect,
    selectedItem,
    valueProperty,
    keyProperty
  } = props;
  const listItem = 'list-group-item list-group-item-action';
  return (
    <div className="list-group">
      {items.map(item => {
        const active = item[keyProperty] === selectedItem[keyProperty];
        return (
          <button
            type="button"
            key={item[keyProperty]}
            className={active ? listItem + ' active' : listItem}
            onClick={() => {
              if (!active) onItemSelect(item);
            }}
          >
            {item[valueProperty]}
          </button>
        );
      })}
    </div>
  );
};

ListGroup.defaultProps = {
  keyProperty: 'key',
  valueProperty: 'value'
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  keyProperty: PropTypes.string,
  valueProperty: PropTypes.string
};

export default ListGroup;
