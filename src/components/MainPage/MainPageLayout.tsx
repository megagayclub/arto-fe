import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import './MainPageLayout.css';
gsap.registerPlugin(ScrollTrigger);


// Ensure you have a corresponding CSS file or styles for this component.
// For example, styles for .container, #sectionPin, .pin-wrap, etc.,
// and most importantly, styles to make the images and .pin-wrap large enough
// to cause horizontal overflow/scrolling.

const MainPageLayout: React.FC = () => {
  // 1. DOM References
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageContainer = pageContainerRef.current;
    const pinWrap = pinWrapRef.current;
    let scroller: LocomotiveScroll | null = null;

    if (pageContainer && pinWrap) {
      /* 2. SMOOTH SCROLL - Initialize Locomotive Scroll */
      scroller = new LocomotiveScroll({
        el: pageContainer,
        smooth: true,
        // Assuming the container fills the viewport and is the main scrollable element
      });

      // 3. Update ScrollTrigger on Locomotive Scroll
      scroller.on('scroll', ScrollTrigger.update);

      // 4. Set up the ScrollTrigger Scroller Proxy
      ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
          return arguments.length
            ? scroller?.scrollTo(value, 0)
            : scroller?.scroll.instance.scroll.y || 0;
        },
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // Using transform for pinning allows for smooth scrolling integration
        pinType: pageContainer.style.transform ? 'transform' : 'fixed',
      });

      // 5. Horizontal Scroll Logic
      const setupHorizontalScroll = () => {
        // Recalculate dimensions on resize/refresh
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;

        // Pinning and horizontal scrolling
        gsap.to(pinWrap, {
          scrollTrigger: {
            scroller: pageContainer, // The Locomotive Scroll container
            scrub: true,
            trigger: '#sectionPin',
            pin: true,
            start: 'top top',
            // The end position is the width of the content that needs to be scrolled horizontally
            end: pinWrapWidth,
          },
          x: -horizontalScrollLength,
          ease: 'none',
        });

        // 6. Refreshing on update
        ScrollTrigger.addEventListener('refresh', () => scroller?.update());
        ScrollTrigger.refresh();
      };

      // Set up the scroll when all elements are ready (like "load")
      setupHorizontalScroll();
    }

    /* 7. Cleanup Function */
    return () => {
      // Destroy ScrollTriggers associated with the proxy
      ScrollTrigger.getAll().forEach(t => t.kill());
      // Revert the Scroller Proxy
      ScrollTrigger.scrollerProxy(pageContainer, undefined);
      // Destroy Locomotive Scroll instance
      scroller?.destroy();
      scroller = null;
    };
  }, []); // Run only once on mount

  // 8. Render the HTML Structure
  return (
    <div className="container" ref={pageContainerRef}>
      {/* Section 1 */}
      <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
        <div>
          <h1 data-scroll data-scroll-speed="1">
            <span>Arto</span> 
          </h1>
          <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
            with GSAP ScrollTrigger & Locomotive Scroll
          </p>
        </div>
      </section>

      {/* Section 2: Horizontal Pinning Section */}
      <section id="sectionPin">
        <div className="pin-wrap" ref={pinWrapRef}>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          <img
            src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="First Image"
          />
          <img
            src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Second Image"
          />
          <img
            src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Third Image"
          />
        </div>
      </section>

      {/* Section 3 */}
      <section data-bgcolor="#e3857a" data-textcolor="#f1dba7">
        <img
          src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Last Image"
        />
        <h2 data-scroll data-scroll-speed="1" className="credit">
          <a href="https://thisisadvantage.com" target="_blank" rel="noopener noreferrer">
            Made by Advantage
          </a>
        </h2>
      </section>
    </div>
  );
};

export default MainPageLayout;