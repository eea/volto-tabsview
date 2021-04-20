import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _uniqueId from 'lodash/uniqueId';
import RenderFields from 'volto-addons/Widgets/RenderFields';
import View from './View';
import config from '@plone/volto/registry';

const getSchema = (props) => {
  return {
    parent: {
      title: 'Parent page',
      type: 'link',
    },
    className: {
      title: 'Classname',
      type: 'text',
    },
  };
};

const Edit = (props) => {
  const [state, setState] = useState({
    schema: getSchema({ ...props, providerUrl: config.settings.providerUrl }),
    id: _uniqueId('block_'),
  });
  useEffect(() => {
    setState({
      ...state,
      schema: getSchema({
        ...props,
      }),
    });
    /* eslint-disable-next-line */
  }, [state.item, props.data.components])
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
