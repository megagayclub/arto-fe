// src/declarations.d.ts

declare module 'locomotive-scroll' {
  // LocomotiveScroll 클래스의 생성자 시그니처를 간략하게 정의합니다.
  interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    // 필요한 다른 옵션들을 여기에 추가할 수 있습니다.
    [key: string]: any;
  }

  // LocomotiveScroll 클래스를 정의합니다.
  class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    // 자주 사용하는 메서드를 정의합니다.
    destroy(): void;
    update(): void;
    scrollTo(target: any, options?: any): void;
    on(event: 'scroll', callback: (args: any) => void): void;

    // 기타 모든 속성 및 메서드를 허용합니다.
    [key: string]: any;
  }

  // 모듈의 기본 내보내기(default export)가 이 클래스임을 선언합니다.
  export default LocomotiveScroll;
}