// pages/SignUpPage.tsx

import React, { FormEvent, useState } from "react";
import { SignUp } from "../components/SignUp/SignUp";
import Header from "../components/layout/Header/Header";
import { useSignUp } from "../hooks/useSignUp";

const SignUpPage: React.FC = () => {
  // 폼 상태 관리
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 전화번호와 주소 상태 추가
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // 🌟 훅 사용
  const { signUp, isLoading, error, isSuccess } = useSignUp();

  // 1. 실제 회원가입 로직 (인자를 받지 않음: onRegister에 적합)
  const executeSignUp = () => {
    // 1. 프론트엔드 비밀번호 확인
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    // 2. API 호출을 위한 데이터 준비
    const signUpData = {
      email: email,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };

    // 3. API 호출
    signUp(signUpData);
  };


  // 2. 폼 제출 이벤트 핸들러 (FormEvent를 인자로 받음: onSubmit에 적합)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    executeSignUp(); // 실제 로직 실행
  };

  // 회원가입 성공 시 UI
  if (isSuccess) {
    return (
      <SignUp>
        <p style={{ textAlign: "center", fontSize: "18px", color: "green", padding: "40px" }}>
          ✅ 会員登録が完了しました。ログインしてください。
        </p>
      </SignUp>
    );
  }

  const handleCancel = () => {
    console.log("会員登録取消");
    // 실제로는 홈페이지나 로그인 페이지로 이동하는 로직을 추가합니다.
  };
  

  return (
    <>
    <Header/>
    <SignUp>
      {/* 🌟 onSubmit에 handleSubmit 연결 */}
      <SignUp.Form onSubmit={handleSubmit}>
        {/* 🌟 에러 메시지 표시 */}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
            🚨 {error}
          </p>
        )}
        
        <SignUp.InputGrid>
          {/* 1. 이메일 주소 */}
          <SignUp.FieldGroup label="E-mailアドレス (ID)" hasCheck>
            <SignUp.InputWrapper>
              <SignUp.Input
                type="email"
                placeholder="E-mailを入力してください (例: arto@arto.com)"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading} // 로딩 중에는 비활성화
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>

          {/* 2. 이름 */}
          <SignUp.FieldGroup label="名前" hasCheck>
            <SignUp.InputWrapper>
              <SignUp.Input
                placeholder="名前"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>

          {/* 3. 비밀번호 */}
          <SignUp.FieldGroup label="パスワード" hasCheck>
            <SignUp.InputWrapper>
              <SignUp.Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>

          {/* 4. 비밀번호 확인 */}
          <SignUp.FieldGroup label="パスワード確認" hasCheck>
            <SignUp.InputWrapper>
              <SignUp.Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>

          {/* 5. 전화번호 (추가) */}
          <SignUp.FieldGroup label="電話番号" hasCheck>
            <SignUp.InputWrapper>
              <SignUp.Input
                placeholder="電話番号"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>

          {/* 6. 주소 (추가) */}
          <SignUp.FieldGroup label="住所" hasCheck>
            <SignUp.InputWrapper>
              {/* 주소 검색 버튼이 있다고 가정하고 Input에 값만 연결 */}
              <SignUp.Input
                placeholder="住所"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
            </SignUp.InputWrapper>
          </SignUp.FieldGroup>
          
        </SignUp.InputGrid>

        {/* 7. 약관 동의 */}
        <SignUp.Terms />

        {/* 8. 등록/취소 버튼 */}
        <SignUp.Actions
          registerText={isLoading ? "登録中..." : "登録"} 
          onRegister={executeSignUp} 
          onCancel={handleCancel}
          registerDisabled={isLoading}
        />
      </SignUp.Form>
    </SignUp>
    </>
  );
};

export default SignUpPage;