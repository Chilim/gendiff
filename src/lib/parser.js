import yaml from 'js-yaml';
import ini from 'ini';

export default {
  '.json': arg => JSON.parse(arg),
  '.yaml': arg => yaml.safeLoad(arg),
  '.ini': arg => ini.parse(arg),
};
