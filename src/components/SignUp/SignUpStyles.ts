// src/components/SignUp/SignUpStyles.ts
import styled, { css } from "styled-components";
import {
  FormContainer,
  Title,
  Form,
  InputField,
  LoginButton,
} from "../Login/LoginStyles"; // 기존 로그인 스타일 재사용

// --- 기본 레이아웃 및 폼 ---
export const PageWrapper = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  padding: 120px 20px;
  background-color: #fff;
  font-family: Arial, sans-serif;
`;

export const SignUpFormContainer = styled(FormContainer)`
  max-width: 800px;
  text-align: left;
`;

export const SignUpTitle = styled(Title)`
  text-align: left;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 500;
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
`;

export const SignUpForm = styled(Form)`
  gap: 20px;
`;

// --- 입력 필드 확장 (2단 그리드) ---

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* 체크 아이콘을 위한 공간 */
  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const InputBlock = styled(InputField)`
  flex-grow: 1;
`;

export const PostcodeButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #333;
  background: #333;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
`;

export const CheckIcon = styled.span`
  color: #333;
  margin-right: 5px;
  font-size: 16px;
`;

// --- 약관 동의 ---

export const TermsContainer = styled.div`
  margin-top: 30px;
`;

export const AgreeAllRow = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

export const TermItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const TermLink = styled.a`
  margin-left: 10px;
  color: #666;
  text-decoration: underline;
  font-size: 12px;
`;

// --- 버튼 ---
export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
  padding-top: 20px;
`;

export const SubmitButton = styled(LoginButton)`
  width: 150px;
  margin-top: 0;
`;

export const CancelButton = styled(SubmitButton)`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;

  &:hover {
    background-color: #eee;
  }
`;
