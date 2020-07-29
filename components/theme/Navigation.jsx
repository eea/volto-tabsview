/* REACT */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
/* SEMANTIC UI */
import { Menu } from 'semantic-ui-react';
/* HELPERS */
import { isActive, getNavigation, removeValue, getBasePath } from '../../helpers';

const Navigation = ({ content, ...props }) => {
  const [state, setState] = useState({
    activeItem: '',
  });
  const history = useHistory();
  return props.navigation?.items?.length ? (
    <div className="tabs-view-menu">
      <Menu fluid widths={props.navigation.items.length}>
        {props.navigation.items.map((item, index) => {
          const url = getBasePath(item.url);
          const urlArray = removeValue(url.split('/'), '');
          const name = urlArray[urlArray.length - 1];
          if (isActive(url, props.pathname) && url !== state.activeItem) {
            setState({
              ...state,
              activeItem: url,
            });
          } else if (
            !isActive(url, props.pathname) &&
            url === state.activeItem
          ) {
            setState({
              ...state,
              activeItem: '',
            });
          }
          return (
            <Menu.Item
              name={name}
              key={url}
              active={state.activeItem === url}
              onClick={() => {
                history.push(url);
              }}
            />
          );
        })}
      </Menu>
    </div>
  ) : (
    ''
  );
};

export default connect((state, props) => ({
  content:
    state.prefetch?.[state.router.location.pathname] || state.content.data,
  pathname: state.router.location.pathname,
  navigation: getNavigation(
    state.navigation.items,
    state.router.location.pathname,
    state.prefetch?.[state.router.location.pathname] || state.content.data,
  ),
}))(Navigation);
