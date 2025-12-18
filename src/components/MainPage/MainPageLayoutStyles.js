"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.CreditH2 = exports.StyledP = exports.StyledH2 = exports.StyledH1 = exports.StyledImage = exports.PinWrap = exports.StyledSectionPin = exports.StyledSection = exports.PageContainer = exports.GlobalStyle = void 0;
var styled_components_1 = __importStar(require("styled-components"));
// CSS Variables for Styled Components
var TEXT_COLOR = '#111';
var BG_COLOR = '#b9b3a9';
// --- Global Styles ---
exports.GlobalStyle = (0, styled_components_1.createGlobalStyle)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  :root {\n    --text-color: ", ";\n    --bg-color: ", ";\n  }\n\n  html {\n    scroll-behavior: auto;\n    overflow: hidden; \n  }\n  \n  body {\n    font-family: termina, sans-serif;\n    color: var(--text-color);\n    background: var(--bg-color);\n    transition: 0.3s ease-out;\n    overflow-x: hidden;\n    max-width: 100%;\n    width: 100%;\n    overscroll-behavior: none;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n"], ["\n  :root {\n    --text-color: ", ";\n    --bg-color: ", ";\n  }\n\n  html {\n    scroll-behavior: auto;\n    overflow: hidden; \n  }\n  \n  body {\n    font-family: termina, sans-serif;\n    color: var(--text-color);\n    background: var(--bg-color);\n    transition: 0.3s ease-out;\n    overflow-x: hidden;\n    max-width: 100%;\n    width: 100%;\n    overscroll-behavior: none;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n"])), TEXT_COLOR, BG_COLOR);
// --- Styled Components ---
exports.PageContainer = styled_components_1["default"].div.attrs({
    className: 'container'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  /* Locomotive Scroll \uCEE8\uD14C\uC774\uB108 \uC2A4\uD0C0\uC77C */\n"], ["\n  /* Locomotive Scroll \uCEE8\uD14C\uC774\uB108 \uC2A4\uD0C0\uC77C */\n"])));
exports.StyledSection = styled_components_1["default"].section(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  min-height: 100vh;\n  width: 100%;\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  grid-gap: 2rem;\n  padding: 50px 10vw;\n  margin: auto;\n  place-items: center;\n"], ["\n  min-height: 100vh;\n  width: 100%;\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  grid-gap: 2rem;\n  padding: 50px 10vw;\n  margin: auto;\n  place-items: center;\n"])));
exports.StyledSectionPin = styled_components_1["default"].section.attrs({
    id: 'sectionPin'
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 100vh;\n  overflow: hidden;\n  display: flex;\n  left: 0;\n  background: var(--text-color);\n  color: var(--bg-color);\n"], ["\n  height: 100vh;\n  overflow: hidden;\n  display: flex;\n  left: 0;\n  background: var(--text-color);\n  color: var(--bg-color);\n"])));
exports.PinWrap = styled_components_1["default"].div.attrs({
    className: 'pin-wrap'
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 100vh;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 50px 10vw;\n  \n  & > * {\n    min-width: 60vw;\n    padding: 0 5vw;\n  }\n"], ["\n  height: 100vh;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 50px 10vw;\n  \n  & > * {\n    min-width: 60vw;\n    padding: 0 5vw;\n  }\n"])));
exports.StyledImage = styled_components_1["default"].img(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 80vh;\n  width: auto;\n  object-fit: cover;\n"], ["\n  height: 80vh;\n  width: auto;\n  object-fit: cover;\n"])));
exports.StyledH1 = styled_components_1["default"].h1(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 5rem;\n  line-height: 1;\n  font-weight: 800;\n  margin-bottom: 1rem;\n  position: absolute;\n  top: 10vw;\n  left: 10vw;\n  z-index: 4;\n  overflow-wrap: break-word;\n  hyphens: auto;\n\n  @media (max-width: 768px) {\n    font-size: 16vw;\n  }\n\n  span {\n    display: block;\n  }\n"], ["\n  font-size: 5rem;\n  line-height: 1;\n  font-weight: 800;\n  margin-bottom: 1rem;\n  position: absolute;\n  top: 10vw;\n  left: 10vw;\n  z-index: 4;\n  overflow-wrap: break-word;\n  hyphens: auto;\n\n  @media (max-width: 768px) {\n    font-size: 16vw;\n  }\n\n  span {\n    display: block;\n  }\n"])));
exports.StyledH2 = styled_components_1["default"].h2(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-size: 2rem;\n  max-width: 400px;\n"], ["\n  font-size: 2rem;\n  max-width: 400px;\n"])));
exports.StyledP = styled_components_1["default"].p(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 10vw;\n  right: 10vw;\n  width: 200px;\n  line-height: 1.5;\n"], ["\n  position: absolute;\n  bottom: 10vw;\n  right: 10vw;\n  width: 200px;\n  line-height: 1.5;\n"])));
exports.CreditH2 = (0, styled_components_1["default"])(exports.StyledH2).attrs({
    className: 'credit'
})(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-family: Termina, sans-serif;\n  \n  a {\n    color: inherit;\n  }\n"], ["\n  font-family: Termina, sans-serif;\n  \n  a {\n    color: inherit;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
