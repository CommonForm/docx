// var Immutable = require('immutable');
var flatten = require('commonform-flatten');
var resolve = require('commonform-resolve');
var number = require('commonform-number');
var decimal = require('decimal-numbering');
var title = require('./title');
var paragraph = require('./paragraph');

var DOCUMENT_XMLNS = (
/* jscs:disable maximumLineLength */
/* jshint ignore: start */
  'xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" ' +
  'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ' +
  'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
  'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
  'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" ' +
  'xmlns:v="urn:schemas-microsoft-com:vml" ' +
  'xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" ' +
  'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ' +
  'xmlns:w10="urn:schemas-microsoft-com:office:word" ' +
  'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
  'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" ' +
  'xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" ' +
  'xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" ' +
  'xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" ' +
  'xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" ' +
  'xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" '
/* jshint ignore: end */
/* jscs:enable maximumlinelength */
);

module.exports = function(project) {
  var form = project.form;
  var resolved = resolve(form, project.values, number(form));
  var flattened = flatten(resolved);
  var paragraphs = flattened.map(function(element) {
    return paragraph(element, decimal);
  }).join('');
  var titleParagraph = title(project.metadata.title);
  return (
    '<w:document ' + DOCUMENT_XMLNS + '>' +
      '<w:body>' +
        titleParagraph +
        paragraphs +
      '</w:body>' +
    '</w:document>'
  );
};
