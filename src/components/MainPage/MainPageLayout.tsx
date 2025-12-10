import React, { useEffect, useRef } from "react";
// 1. Install these packages:
// npm install gsap locomotive-scroll
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

// Register the GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

// Import your styles
import "./HorizontalScrollLayout.css";
// NOTE: You will need CSS for this to work properly, especially
// to style the .pin-wrap to be wide enough for horizontal scrolling.

const HorizontalScrollLayout = () => {
  // Use a ref to target the main container for Locomotive Scroll initialization
  const scrollContainerRef = useRef(null);

  // Use a ref for the Locomotive Scroll instance
  const scrollerInstance = useRef(null);

  useEffect(() => {
    // Ensure the container element is available
    const pageContainer = scrollContainerRef.current;
    if (!pageContainer) return;

    // --- 1. INITIALIZE LOCOMOTIVE SCROLL ---
    scrollerInstance.current = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
      // You might need to add a class to the body/html to avoid layout shifts
    });

    const scroller = scrollerInstance.current;

    // --- 2. CONNECT LOCOMOTIVE SCROLL TO SCROLLTRIGGER ---
    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // You must use pinType: 'transform' when using Locomotive Scroll
      pinType: pageContainer.style.transform ? "transform" : "fixed",
    });

    // --- 3. SETUP HORIZONTAL PINNING AND SCROLLING (ON WINDOW LOAD/COMPONENT MOUNT) ---
    const setupHorizontalScroll = () => {
      // Find the elements inside the pin-wrap. The total width of these
      // determines the scroll distance.
      const pinWrap = pageContainer.querySelector(".pin-wrap");

      // Stop if the required element is missing
      if (!pinWrap) return;

      // We must calculate the total width of the elements inside the pin-wrap
      // to determine how far to scroll.
      const pinWrapWidth = pinWrap.offsetWidth;
      const horizontalScrollLength = pinWrapWidth - window.innerWidth;

      // Pinning and horizontal scrolling animation
      gsap.to(pinWrap, {
        scrollTrigger: {
          scroller: pageContainer, // Tell ScrollTrigger to use the Locomotive Scroll scroller
          scrub: true,
          trigger: "#sectionPin",
          pin: true,
          start: "top top",
          // The end point determines how long the pinning/horizontal scroll lasts
          end: pinWrapWidth, // The vertical scroll distance is equal to the pin-wrap width
        },
        x: -horizontalScrollLength, // Move the pin-wrap container horizontally
        ease: "none",
      });

      // Update ScrollTrigger and Locomotive Scroll on refresh/resize
      ScrollTrigger.addEventListener("refresh", () => scroller.update());
      ScrollTrigger.refresh();
    };

    // Run the setup after a short delay to ensure DOM is fully painted
    // or run it directly since it's inside useEffect which runs after mount.
    setupHorizontalScroll();

    // --- 4. CLEANUP FUNCTION ---
    // Destroy instances and remove event listeners when the component unmounts
    return () => {
      if (scroller) {
        scroller.destroy();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", () => scroller.update());
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    // The main container for Locomotive Scroll
    <div className="container" data-scroll-container ref={scrollContainerRef}>
      {/* First Section */}
      <section
        data-bgcolor="#bcb8ad"
        data-textcolor="#032f35"
        data-scroll-section
      >
        <div data-scroll>
          <h1 data-scroll data-scroll-speed="1">
            <span>Horizontal</span> <span>scroll</span> <span>section</span>
          </h1>
          <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
            with GSAP ScrollTrigger & Locomotive Scroll
          </p>
        </div>
      </section>

      {/* Second Section: Horizontal Scroll/Pinning Container */}
      <section id="sectionPin" data-scroll-section>
        <div className="pin-wrap">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          <img
            src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Abstract view of mountains"
          />
          <img
            src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Person standing on rock face"
          />
          <img
            src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Coastal landscape with waves"
          />
        </div>
      </section>

      {/* Third Section */}
      <section
        data-bgcolor="#e3857a"
        data-textcolor="#f1dba7"
        data-scroll-section
      >
        <img
          src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Abstract pattern of colors"
        />
        <h2 data-scroll data-scroll-speed="1" className="credit">
          <a
            href="https://thisisadvantage.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Advantage
          </a>
        </h2>
      </section>
    </div>
  );
};

export default HorizontalScrollLayout;
