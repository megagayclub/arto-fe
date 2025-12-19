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
              <span>絵画購入開始, Arto</span> 
            </StyledH1>
            <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0
    }}
  >
    <source src="/videos/mainpage_video.mp4" type="video/mp4" />
    ブラウザはビデオをサポートしていません。
  </video>
            <StyledP data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
              大衆が直接選択した青年·新進画家の作品に会ってみましょう。
            </StyledP>
          </div>
        </StyledSection>

        {/* Section 2: Horizontal Pinning Section */}
        <StyledSectionPin>
          <PinWrap ref={pinWrapRef}>
            <StyledH2>
              空間デザインの専門家が提案するアートスタイリング
ブルースペクトル インテリア
涼しいブルートーンで飾った私だけの安息所、
心身を鎮静させる感性的な役割だけでなく、空間の中心を整えてくれます
            </StyledH2>
            <StyledImage
              src="https://plus.unsplash.com/premium_photo-1664272436668-78437b92929e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First Image"
            />
            <StyledImage
              src="https://images.unsplash.com/photo-1548811579-017cf2a4268b?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second Image"
            />
            <StyledImage
              src="https://images.unsplash.com/photo-1529432337323-223e988a90fb?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1652172264794-a83fe7c190f3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Last Image"
          />
          <CreditH2 data-scroll data-scroll-speed="1">
            私たちが共有するこの小さなキャンバスが、<br />
            あなたの世界をより輝かしく、美しい色彩で彩ることでしょう。
          </CreditH2>
        </StyledSection>
      </PageContainer>
    </>
  );
};

export default MainPageLayout;