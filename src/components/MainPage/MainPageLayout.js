"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var locomotive_scroll_1 = __importDefault(require("locomotive-scroll"));
require("locomotive-scroll/dist/locomotive-scroll.css");
// 스타일 파일에서 Styled Components 임포트
var MainPageLayoutStyles_1 = require("./MainPageLayoutStyles");
// GSAP 플러그인 등록
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
var MainPageLayout = function () {
    var pageContainerRef = (0, react_1.useRef)(null);
    var pinWrapRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var pageContainer = pageContainerRef.current;
        var pinWrap = pinWrapRef.current;
        var scroller = null;
        if (pageContainer && pinWrap) {
            /* 1. Initialize Locomotive Scroll */
            scroller = new locomotive_scroll_1["default"]({
                el: pageContainer,
                smooth: true
            });
            /* 2. ScrollTrigger Integration */
            scroller.on('scroll', ScrollTrigger_1.ScrollTrigger.update);
            ScrollTrigger_1.ScrollTrigger.scrollerProxy(pageContainer, {
                scrollTop: function (value) {
                    return arguments.length
                        ? scroller === null || scroller === void 0 ? void 0 : scroller.scrollTo(value, { duration: 0, disableLerp: true })
                        : (scroller === null || scroller === void 0 ? void 0 : scroller.scroll.instance.scroll.y) || 0;
                },
                getBoundingClientRect: function () {
                    return {
                        left: 0,
                        top: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                },
                pinType: pageContainer.style.transform ? 'transform' : 'fixed'
            });
            /* 3. Horizontal Scroll Logic */
            var setupHorizontalScroll = function () {
                var pinWrapWidth = pinWrap.scrollWidth;
                var horizontalScrollLength = pinWrapWidth - window.innerWidth;
                if (horizontalScrollLength < 0)
                    horizontalScrollLength = 0;
                gsap_1.gsap.to(pinWrap, {
                    scrollTrigger: {
                        scroller: pageContainer,
                        scrub: true,
                        trigger: '#sectionPin',
                        pin: true,
                        start: 'top top',
                        end: "+=" + horizontalScrollLength
                    },
                    x: -horizontalScrollLength,
                    ease: 'none'
                });
                ScrollTrigger_1.ScrollTrigger.addEventListener('refresh', function () { return scroller === null || scroller === void 0 ? void 0 : scroller.update(); });
                ScrollTrigger_1.ScrollTrigger.refresh();
            };
            setupHorizontalScroll();
        }
        /* 4. Cleanup Function */
        return function () {
            ScrollTrigger_1.ScrollTrigger.getAll().forEach(function (t) { return t.kill(); });
            ScrollTrigger_1.ScrollTrigger.scrollerProxy(pageContainer, undefined);
            scroller === null || scroller === void 0 ? void 0 : scroller.destroy();
            scroller = null;
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.GlobalStyle, {}, void 0), (0, jsx_runtime_1.jsxs)(MainPageLayoutStyles_1.PageContainer, __assign({ ref: pageContainerRef }, { children: [(0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledSection, __assign({ "data-bgcolor": "#bcb8ad", "data-textcolor": "#032f35", style: { '--bg-color': '#bcb8ad', '--text-color': '#032f35' } }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledH1, __assign({ "data-scroll": true, "data-scroll-speed": "1" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Arto" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledP, __assign({ "data-scroll": true, "data-scroll-speed": "2", "data-scroll-delay": "0.2" }, { children: "with GSAP ScrollTrigger & Locomotive Scroll" }), void 0)] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledSectionPin, { children: (0, jsx_runtime_1.jsxs)(MainPageLayoutStyles_1.PinWrap, __assign({ ref: pinWrapRef }, { children: [(0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledH2, { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledImage, { src: "https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900", alt: "First Image" }, void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledImage, { src: "https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900", alt: "Second Image" }, void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledImage, { src: "https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900", alt: "Third Image" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsxs)(MainPageLayoutStyles_1.StyledSection, __assign({ "data-bgcolor": "#e3857a", "data-textcolor": "#f1dba7", style: { '--bg-color': '#e3857a', '--text-color': '#f1dba7' } }, { children: [(0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.StyledImage, { src: "https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", alt: "Last Image" }, void 0), (0, jsx_runtime_1.jsx)(MainPageLayoutStyles_1.CreditH2, __assign({ "data-scroll": true, "data-scroll-speed": "1" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://thisisadvantage.com", target: "_blank", rel: "noopener noreferrer" }, { children: "Made by Advantage" }), void 0) }), void 0)] }), void 0)] }), void 0)] }, void 0));
};
exports["default"] = MainPageLayout;
