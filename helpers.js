/* PLUGINS */
import { isMatch } from 'lodash';
/* ROOT */
import { settings } from '~/config';
/* PLONE VOLTO */
import { getBaseUrl } from '@plone/volto/helpers';

export const isActive = (url, pathname) => {
  return (
    (url === '' && pathname === '/') ||
    (url !== '' && isMatch(pathname?.split('/'), url?.split('/')))
  );
};

export const getNavigation = (items, pathname, content) => {
  if (items) {
    const parentPathname =
      content?.parent?.['@id'] && getBasePath(content.parent['@id']);
    const pathnameArray = removeValue(pathname.split('/'), '');
    const parentPathnameArray = removeValue(parentPathname.split('/'), '');
    const isChild = content?.layout === 'tabs_mosaic_child_view';
    const location = !isChild ? pathnameArray : parentPathnameArray;
    const depth = !isChild ? pathnameArray.length : parentPathnameArray.length;
    return deepSearch({
      inputArray: items,
      location,
      depth,
    });
  }
  return {};
};

export const deepSearch = ({ inputArray = [], location, depth, start = 1 }) => {
  for (let index = 0; index < inputArray.length; index++) {
    if (
      depth === 1 &&
      inputArray[index].url?.includes(location.slice(0, start).join('/'))
    )
      return inputArray[index] || {};
    if (inputArray[index].url?.includes(location.slice(0, start).join('/'))) {
      return deepSearch({
        inputArray: inputArray[index].items,
        location,
        depth: depth - 1,
        start: start + 1,
      });
    }
  }

  return null;
};

export function removeValue(arr) {
  if (!arr || arr.length === 0) return [];
  let what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

export function getBasePath(url) {
  return getBaseUrl(url)
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
}