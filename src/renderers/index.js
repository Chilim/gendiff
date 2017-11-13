import renderToString from './renderToString';
import renderToPlain from './renderToPlain';
import renderToJSON from './renderToJSON';

const renderFormats = {
  tree: renderToString,
  plain: renderToPlain,
  json: renderToJSON,
};

export default format => renderFormats[format];
