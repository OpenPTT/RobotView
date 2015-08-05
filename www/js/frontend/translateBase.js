define(function(require, exports, module) {

// FIXME: swichable language support
var lang = window.navigator.userLanguage || window.navigator.language || "";
lang = lang.toLowerCase().match(/^zh/) ? 'zh_TW' : 'en';
console.log('lang = ' + lang);
var translations = ['gettextCatalog', function (gettextCatalog) {
  gettextCatalog.currentLanguage = lang;
  gettextCatalog.debug = true;
}];

return translations;

});
