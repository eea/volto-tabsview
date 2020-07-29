/* MOSAIC */
import MosaicForm from 'volto-mosaic/components/manage/Form';
/* LOCAL SETTINGS */
import * as addonReducers from './reducers';
import addonRoutes from './routes.js';
/* VIEWS */
import TabsMosaicView from './components/theme//View';
import TabsMosaicChildView from './components/theme/View';

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
        tabs_view_mosaic: MosaicForm,
        tabs_mosaic_child_view: MosaicForm,
      },
    },
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
  };
}
