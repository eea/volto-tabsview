/* REACT */
import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
/* ROOT */
import { settings } from '~/config';
/* HELPERS */
import { getNavigationByParent } from '../../../helpers';

import './style.css';
const sidebarRef = React.createRef();

const View = ({ content, ...props }) => {
  const { data } = props;
  const [state, setState] = useState({
    sidebar: [],
    sidebarOpened: true,
  });
  const parent = data.parent?.value;

  useEffect(() => {
    if (props.navigation) {
      const sidebar = [];
      sidebar.push(...getSidebar(props.navigation, 1));
      setState({
        ...state,
        sidebar,
      });
    }
    /* eslint-disable-next-line */
  }, [ props.data, props.navigation]);

  const getSidebar = (item, depth) => {
    const sidebar = [];
    item?.items?.length &&
      item.items.forEach(nextItem => {
        sidebar.push(
          <NavLink
            to={nextItem.url === '' ? `/}` : nextItem.url}
            exact={
              settings.isMultilingual
                ? nextItem.url === `/${props.lang}}`
                : nextItem.url === ''
            }
            key={nextItem.url}
            className={`tabs__item depth__${depth}`}
            activeClassName="tabs__item_active"
          >
            {nextItem.title}
          </NavLink>,
        );
        sidebar.push(...getSidebar(nextItem, depth + 1));
      });
    return sidebar;
  };
  return (
    <div className="sidebar-block-container">
      {/* <button
        style={{
          display: 'block',
          position: 'absolute',
        }}
        onClick={() => {
          const event = new Event('sidebarToggle');
          sidebarRef.current.dispatchEvent(event);
          const sidebarOpened = !state.sidebarOpened;
          setState({ ...state, sidebarOpened });
        }}
      >
        Toggle sidebar
      </button> */}
      <div
        ref={sidebarRef}
        className={`sidebar ${
          state.sidebarOpened === true ? 'show' : 'hidden'
        }`}
      >
        {props.navigation?.items?.length && parent && (
          <nav className="tabs">{state?.sidebar?.map(item => item)}</nav>
        )}
      </div>
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    query: state.router.location.search,
    content:
      state.prefetch?.[state.router.location.pathname] || state.content.data,
    pathname: state.router.location.pathname,
    lang: state.intl.locale,
    navigation: getNavigationByParent(
      state.navigation.items,
      props.data?.parent?.value,
    ),
  })),
)(View);
