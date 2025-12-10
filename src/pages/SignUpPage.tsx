// pages/SignUpPage.tsx

import React, { FormEvent, useState } from "react";
import { SignUp } from "../components/SignUp/SignUp";
import { useSignUp } from "../hooks/useSignUp"; // 🌟 구현된 커스텀 훅 import

const SignUpPage: React.FC = () => {
  // 폼 상태 관리
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 예시를 위해 전화번호와 주소 상태 추가 (name으로 대체되었던 부분)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // 🌟 훅 사용: API 통신 상태와 함수를 가져옴
  const { signUp, isLoading, error, isSuccess } = useSignUp();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. 프론트엔드 비밀번호 확인
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }
    // else {
    //   alert("ㅇㅋ일단");
    // }

    // 2. API 호출을 위한 데이터 준비
    const signUpData = {
      email: email,
      password: password,
      name: name,
      // 백엔드 DTO에 맞게 실제 상태 값으로 연결
      phoneNumber: phoneNumber, // 📞 실제 상태 사용
      address: address,         // 🏠 실제 상태 사용
    };

    // 3. API 호출
    alert("ㅇㅋ일단2");
    signUp(signUpData);
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
  
  // (참고: handleAddressSearch 함수는 여기에 정의되지 않았으므로 생략합니다.)

  return (
    <SignUp>
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
          // 로딩 상태에 따라 버튼 텍스트를 변경하거나 비활성화할 수 있습니다.
          registerText={isLoading ? "登録中..." : "登録"} 
          onRegister={handleSubmit} // 폼 제출 역할
          onCancel={handleCancel}
          registerDisabled={isLoading} // 로딩 중 버튼 비활성화
        />
      </SignUp.Form>
    </SignUp>
  );
};

export default SignUpPage;