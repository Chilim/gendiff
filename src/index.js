import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';
import getDiff from './lib/ast';
import renderToJSON from './lib/render_formats/renderToJSON';
import renderToPlain from './lib/render_formats/renderToPlain';
import renderToString from './lib/render_formats/renderToString';


const renderFormats = {
  plain: renderToPlain,
  casual: renderToString,
  json: renderToJSON,
};

const formatActions = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getExtenAction = exten => formatActions[exten];

const genDiff = (firstFilePath, secondFilePath, renderFormat = 'plain') => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const exten = path.extname(firstFilePath);
  const extenAction = getExtenAction(exten);
  const firstFileContent = extenAction(firstObj);
  const secondFileContent = extenAction(secondObj);
  const ast = getDiff(firstFileContent, secondFileContent);
  return renderFormats[renderFormat](ast);
};

export default genDiff;
