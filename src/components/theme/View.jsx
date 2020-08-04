/* REACT IMPORTS */
import React from 'react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
/* ROOT IMPORTS */
import { settings } from '~/config';
/* MOSAIC VIEW */
import MosaicView from 'volto-mosaic/components/theme/View';
/* PLONE VOLTO IMPORTS */
import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon } from '@plone/volto/components';
/* LOCAL IMPORTS */
import Navigation from './Navigation';
/* =================================================== */

const View = ({ content, ...props }) => {
  const hasClonedBlocksLayout = content?.cloned_blocks_layout ? true : false;
  const cloneUseMosaic = content?.cloned_blocks_layout?.mosaic_layout
    ? true
    : false;
  const clonedSource = content['@components']?.['cloned_source'];
  const path = (clonedSource?.['@id'] || '')
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
  return (
    <>
      {props.token && (
        <Portal
          node={__CLIENT__ && document.querySelector('.toolbar-actions')}
          children={[]}
        >
          {clonedSource?.can_edit && (
            <Link className="edit" to={`${path}/edit`}>
              <Icon name={penSVG} size="30px" className="circled" />
            </Link>
          )}
        </Portal>
      )}

      {hasClonedBlocksLayout && cloneUseMosaic ? (
        <>
          <Navigation />
          <div id="mosaic-tabs-view">
            <MosaicView {...props} />
          </div>
        </>
      ) : (
        <>
          <Navigation />
          <DefaultView content={content} {...props} />
        </>
      )}
    </>
  );
};

// export default View;
export default connect((state, props) => ({
  content:
    state.prefetch?.[state.router.location.pathname] || state.content.data,
}))(View);
