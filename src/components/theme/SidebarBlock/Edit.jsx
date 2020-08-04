import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _uniqueId from 'lodash/uniqueId';
import RenderFields from 'volto-addons/Widgets/RenderFields';
import View from './View';

const getSchema = props => {
  return {
    parent: {
      type: 'link',
      title: 'Parent page',
    },
  };
};

const Edit = props => {
  const [state, setState] = useState({
    schema: getSchema({ ...props }),
    id: _uniqueId('block_'),
  });
  useEffect(() => {
    props.onChangeBlock(props.block, {
      ...props.data,
      hide_block: {
        selector: '.sidebar-block-container .sidebar',
        hiddenClassName: 'hidden',
        event: 'sidebarToggle',
      },
    });
    /* eslint-disable-next-line */
  }, [])
  useEffect(() => {
    setState({
      ...state,
      schema: getSchema({
        ...props,
      }),
    });
    /* eslint-disable-next-line */
  }, [state.item, props.data])
  return (
    <div>
      <RenderFields schema={state.schema} {...props} title="Navigation block" />
      <View {...props} id={state.id} />
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    pathname: state.router.location.pathname,
  })),
)(Edit);
