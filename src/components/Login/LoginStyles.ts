// src/components/Login/LoginStyles.ts
import styled from "styled-components";

// --- 기본 레이아웃 ---
export const PageWrapper = styled.div`
  margin-top: 30px;
  min-height: calc(100vh - 100px); /* 헤더/푸터를 제외한 최소 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  background-color: #fff;
  font-family: Arial, sans-serif;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px; /* 로그인 폼의 최대 너비 */
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 40px;
`;

// --- 폼 요소 ---
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
`;

// --- 버튼 요소 ---
export const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #333; /* 이미지 속 진한 회색 */
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

export const RegisterButton = styled(LoginButton)`
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  margin-top: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ForgotPasswordLink = styled.a`
  display: block;
  font-size: 12px;
  color: #666;
  text-decoration: none;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;
