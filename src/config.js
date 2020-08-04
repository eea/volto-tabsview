/* MOSAIC */
import MosaicForm from 'volto-mosaic/components/manage/Form';
/* LOCAL SETTINGS */
import * as addonReducers from './reducers';
import addonRoutes from './routes.js';
/* VIEWS */
import TabsMosaicView from './components/theme//View';
import TabsMosaicChildView from './components/theme/View';
/* BLOCKS */
import chartIcon from '@plone/volto/icons/world.svg';
//  NAVIGATION BLOCK
import NavigationBlockView from './components/theme/NavigationBlock/View';
import NavigationBlockEdut from './components/theme/NavigationBlock/Edit';
//  SIDEBAR BLOCK
import SidebarBlockView from './components/theme/SidebarBlock/View';
import SidebarBlockEdit from './components/theme/SidebarBlock/Edit';

export function applyConfig(config) {
  return {
    ...config,
    addonReducers: {
      ...config.addonReducers,
      ...addonReducers,
    },
    views: {
      ...config.views,
      layoutViews: {
        ...config.views.layoutViews,
        tabs_mosaic_view: TabsMosaicView,
        tabs_mosaic_child_view: TabsMosaicChildView,
      },
    },
    editForms: {
      ...config.editForms,
      byLayout: {
        ...config.editForms?.byLayout,
        tabs_mosaic_view: MosaicForm,
        tabs_mosaic_child_view: MosaicForm,
      },
    },
    blocks: {
      ...config.blocks,
      blocksConfig: {
        ...config.blocks.blocksConfig,
        navigation_block: {
          id: 'navigation_block',
          title: 'Navigation Block',
          view: NavigationBlockView,
          edit: NavigationBlockEdut,
          icon: chartIcon,
          group: 'custom_addons',
        },
        sidebar_block: {
          id: 'sidebar_block',
          title: 'Sidebar Block',
          view: SidebarBlockView,
          edit: SidebarBlockEdit,
          icon: chartIcon,
          group: 'custom_addons',
        },
      },
    },
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
  };
}
