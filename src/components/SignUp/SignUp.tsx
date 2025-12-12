// src/components/SignUp/SignUp.tsx (수정된 최종 코드)

import React, { ReactNode, FormEvent } from "react";
import {
  PageWrapper,
  SignUpFormContainer,
  SignUpTitle,
  SignUpForm,
  InputGrid,
  InputGroup,
  InputWrapper,
  InputBlock,
  PostcodeButton,
  TermsContainer,
  AgreeAllRow,
  TermItem,
  TermLink,
  SubmitButton,
  CancelButton,
  ActionRow,
  CheckIcon,
} from "./SignUpStyles";

// 아이콘 대체
const ICON_CHECK = "✓"; // 체크 아이콘

// --- 하위 컴포넌트 정의 ---

// 1. 레이아웃 (Base Component) (생략 없음)
interface LayoutProps {
  children: ReactNode;
}
const SignUpComponentBase: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <SignUpFormContainer>
        <SignUpTitle>会員登録</SignUpTitle>
        {children}
      </SignUpFormContainer>
    </PageWrapper>
  );
};

// 2. 폼 컨테이너 (생략 없음)
interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}
const RegistrationForm: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <SignUpForm onSubmit={onSubmit}>{children}</SignUpForm>;
};

// 3. 필드 그룹 (생략 없음)
interface FieldGroupProps {
  label: string;
  children: ReactNode;
  hasCheck?: boolean; // 이미지 속 체크 아이콘 유무
}
const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  children,
  hasCheck = false,
}) => {
  return (
    <InputGroup>
      <label>
        {hasCheck && <CheckIcon>{ICON_CHECK}</CheckIcon>}
        {label}
      </label>
      {children}
    </InputGroup>
  );
};

// 4. 약관 동의 섹션 (생략 없음)
const TermsSection: React.FC = () => (
  <TermsContainer>
    <AgreeAllRow>
      <label>
        <input type="checkbox" />
        <span>すべてに同意</span>
      </label>
      <p style={{ fontSize: "12px", fontWeight: "normal", marginLeft: "20px" }}>
        私は14歳以上であり、artoサービス利用規約および個人情報の収集・利用案内等に同意します。
      </p>
    </AgreeAllRow>

    <TermItem>
      <label>
        <input type="checkbox" required />
        <span>(必須) artoサービス利用規約</span>
      </label>
      <TermLink href="#">[内容を見る]</TermLink>
    </TermItem>
    <TermItem>
      <label>
        <input type="checkbox" required />
        <span>(必須) 個人情報収集・利用案内</span>
      </label>
      <TermLink href="#">[内容を見る]</TermLink>
    </TermItem>
  </TermsContainer>
);

// 5. 버튼 액션 그룹
// 🌟 ActionProps 인터페이스 수정
interface ActionProps {
  onRegister: () => void;
  onCancel: () => void;
  // 💡 SignUpPage.tsx에서 전달하는 속성을 추가합니다.
  registerText: string;
  registerDisabled: boolean;
}

// 🌟 ActionGroup 컴포넌트 수정
const ActionGroup: React.FC<ActionProps> = ({
  onRegister,
  onCancel,
  registerText, // 추가
  registerDisabled, // 추가
}) => (
  <ActionRow>
    <SubmitButton
      type="button"
      onClick={onRegister}
      disabled={registerDisabled} // 비활성화 속성 적용
    >
      {registerText} {/* 텍스트 속성 적용 */}
    </SubmitButton>
    <CancelButton type="button" onClick={onCancel}>
      キャンセル
    </CancelButton>
  </ActionRow>
);

// --- Compound Component 연결 (생략 없음) ---

export const SignUp = Object.assign(SignUpComponentBase, {
  Form: RegistrationForm,
  InputGrid: InputGrid,
  FieldGroup: FieldGroup,
  InputWrapper: InputWrapper,
  Input: InputBlock,
  Postcode: PostcodeButton,
  Terms: TermsSection,
  Actions: ActionGroup,
});