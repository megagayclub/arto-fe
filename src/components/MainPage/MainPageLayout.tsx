import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// 스타일 파일에서 Styled Components 임포트
import { 
  GlobalStyle, 
  PageContainer, 
  StyledSection, 
  StyledSectionPin, 
  PinWrap, 
  StyledImage, 
  StyledH1, 
  StyledH2, 
  StyledP, 
  CreditH2 
} from './MainPageLayoutStyles'; 

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const MainPageLayout: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageContainer = pageContainerRef.current;
    const pinWrap = pinWrapRef.current;
    let scroller: LocomotiveScroll | null = null;

    if (pageContainer && pinWrap) {
      /* 1. Initialize Locomotive Scroll */
      scroller = new LocomotiveScroll({
        el: pageContainer,
        smooth: true,
      });

      /* 2. ScrollTrigger Integration */
      scroller.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
          return arguments.length
            ? scroller?.scrollTo(value, { duration: 0, disableLerp: true })
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
        pinType: pageContainer.style.transform ? 'transform' : 'fixed',
      });

      /* 3. Horizontal Scroll Logic */
      const setupHorizontalScroll = () => {
        let pinWrapWidth = pinWrap.scrollWidth; 
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;

        if (horizontalScrollLength < 0) horizontalScrollLength = 0;

        gsap.to(pinWrap, {
          scrollTrigger: {
            scroller: pageContainer,
            scrub: true,
            trigger: '#sectionPin',
            pin: true,
            start: 'top top',
            end: `+=${horizontalScrollLength}`, 
          },
          x: -horizontalScrollLength,
          ease: 'none',
        });

        ScrollTrigger.addEventListener('refresh', () => scroller?.update());
        ScrollTrigger.refresh();
      };

      setupHorizontalScroll();
    }

    /* 4. Cleanup Function */
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.scrollerProxy(pageContainer, undefined);
      scroller?.destroy();
      scroller = null;
    };
  }, []); 

  return (
    <>
      <GlobalStyle />
      <PageContainer ref={pageContainerRef}>
        {/* Section 1 */}
        <StyledSection 
          data-bgcolor="#bcb8ad" 
          data-textcolor="#032f35" 
          style={{ '--bg-color': '#bcb8ad', '--text-color': '#032f35' } as React.CSSProperties}
        >
          <div>
            <StyledH1 data-scroll data-scroll-speed="1">
              <span>Arto</span> 
            </StyledH1>
            <StyledP data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
              with GSAP ScrollTrigger & Locomotive Scroll
            </StyledP>
          </div>
        </StyledSection>

        {/* Section 2: Horizontal Pinning Section */}
        <StyledSectionPin>
          <PinWrap ref={pinWrapRef}>
            <StyledH2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </StyledH2>
            <StyledImage
              src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
              alt="First Image"
            />
            <StyledImage
              src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
              alt="Second Image"
            />
            <StyledImage
              src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
              alt="Third Image"
            />
          </PinWrap>
        </StyledSectionPin>

        {/* Section 3 */}
        <StyledSection 
          data-bgcolor="#e3857a" 
          data-textcolor="#f1dba7" 
          style={{ '--bg-color': '#e3857a', '--text-color': '#f1dba7' } as React.CSSProperties}
        >
          <StyledImage
            src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Last Image"
          />
          <CreditH2 data-scroll data-scroll-speed="1">
            <a href="https://thisisadvantage.com" target="_blank" rel="noopener noreferrer">
              Made by Advantage
            </a>
          </CreditH2>
        </StyledSection>
      </PageContainer>
    </>
  );
};

export default MainPageLayout;