// src/components/Login/Login.tsx
import React, { ReactNode, FormEvent } from "react";
import {
  PageWrapper,
  FormContainer,
  Title,
  Form,
  InputField,
  CheckboxGroup,
  LoginButton,
  RegisterButton,
  ForgotPasswordLink,
} from "./LoginStyles";

// --- 하위 컴포넌트 정의 ---

// 1. 레이아웃 (Base Component)
interface LayoutProps {
  children: ReactNode;
}
const LoginComponentBase: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <FormContainer>
        <Title>로그인</Title>
        {children}
      </FormContainer>
    </PageWrapper>
  );
};

// 2. 폼 컨테이너
interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}
const LoginForm: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

// 3. 입력 필드 (ID/Password)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const Input: React.FC<InputProps> = (props) => {
  // 플레이스홀더를 사용하여 이미지와 동일하게 구현
  return <InputField {...props} />;
};

// 4. 로그인 유지 체크박스
const RememberMe: React.FC = () => (
  <CheckboxGroup>
    <label>
      <input type="checkbox" name="rememberMe" />
      <span>로그인 상태 유지</span>
    </label>
    <label>
      <input type="checkbox" name="keepLoggedIn" />
      <span>ID를 저장합니다</span>
    </label>
  </CheckboxGroup>
);

// 5. 버튼 및 링크
interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
  isPrimary?: boolean; // 로그인 버튼과 회원가입 버튼을 구분
  href?: string; // 링크인 경우
  disabled?: boolean;
}

const Action: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  type = "button",
  isPrimary = false,
  href,
}) => {
  if (type === "submit" && isPrimary) {
    return <LoginButton type="submit">{children}</LoginButton>;
  }
  if (!isPrimary && href) {
    return <ForgotPasswordLink href={href}>{children}</ForgotPasswordLink>;
  }
  if (!isPrimary && type === "button") {
    return (
      <RegisterButton type="button" onClick={onClick}>
        {children}
      </RegisterButton>
    );
  }

  // 기본은 로그인 버튼
  return (
    <LoginButton type={type} onClick={onClick}>
      {children}
    </LoginButton>
  );
};

// --- Compound Component 연결 ---

export const Login = Object.assign(LoginComponentBase, {
  Form: LoginForm,
  Input: Input,
  RememberMe: RememberMe,
  Action: Action,
});
