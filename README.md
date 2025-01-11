### Group members

- Aymane Aâzouz 1073235
- Amer Alhasoun 0992644
- Max Bretherton 1057231
- Jordy Mahn 1035230

---

### GitHub link

https://github.com/ItzGalaxy15/WebDev


<!-- ------------IMPORTANT------------- -->

<!-- INFO: -->

To make sure you can download all the packages, make sure to have node updated to v20 or higher. 

<!-- HOW TO RUN -->

HAVE 2 TERMINALS OPEN ON COMMAND PROMPT
In one of the terminals use the following commands:

1. cd client-side
2. yarn (this downloads yarn with all the packages and dependencies in our project)
3. dotnet run

This should be enough. If blank page returns do the following down here: 

1. cd client-side
2. yarn
3. yarn fe-watch

4. Go to the bottom of Spa.bundle.js in wwwroot\spa.bundle.js

Replace the following:

<!-- __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./App.tsx");




var rootElement = document.getElementById('root');
if (rootElement) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement);
  root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
}
})();

spa = __webpack_exports__;
/******/ })()
; -->

with:

<!-- __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   main: () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./App.tsx");


  
  var main = function main(){
    var rootElement = document.getElementById('root');
    if (rootElement) {
      var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement);
      root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
    }
  }
  })();
  
  spa = __webpack_exports__;
  /******/ })()
  ; -->


Make sure to do this BEFORE using fe-watch, 

In the other terminal run the following to launch the localhost:

5. dotnet run  

To check it went correctly make sure the spa.bundle.js HAS the function main() so the website loads on a homepage with registration and login.
If the function main doesn't exist then the website will be blank, because function main is being called to load the website.
