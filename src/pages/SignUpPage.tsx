// pages/SignUpPage.tsx (수정된 코드)
import React, { FormEvent } from "react";
import { SignUp } from "../components/SignUp/SignUp";
import Header from "../components/layout/Header/Header";

const SignUpPage: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("회원 등록 폼 제출 완료");
  };

  const handleRegister = () => {
    const formElement = document.getElementById(
      "registration-form"
    ) as HTMLFormElement;
    if (formElement) {
      formElement.requestSubmit();
    }
  };

  const handleCancel = () => {
    console.log("회원가입 취소 및 이전 페이지로 이동");
  };

  const handleAddressSearch = () => {
    console.log("주소 검색 팝업 실행");
  };

  return (
    <>
      <Header />
      <SignUp>
        <SignUp.Form onSubmit={handleSubmit}>
          {/* <SignUp.Form onSubmit={handleSubmit} id="registration-form"> */}

          {/* 🌟 2단 그리드 대신 세로 일렬 배치 🌟 */}
          <>
            {/* 1. 이메일 주소 */}
            <SignUp.FieldGroup label="E-mailアドレス (ID)" hasCheck>
              <SignUp.InputWrapper>
                <SignUp.Input
                  placeholder="E-mailを入力してください (例: arto@arto.com)"
                  type="email"
                  required
                />
              </SignUp.InputWrapper>
            </SignUp.FieldGroup>

            {/* 2. 이름 (한 줄에 나열) */}
            <SignUp.FieldGroup label="名前" hasCheck>
              <SignUp.InputWrapper>
                <SignUp.Input placeholder="名" type="text" required />
                <SignUp.Input placeholder="姓" type="text" required />
              </SignUp.InputWrapper>
            </SignUp.FieldGroup>

            {/* 3. 비밀번호 */}
            <SignUp.FieldGroup label="パスワード" hasCheck>
              <SignUp.InputWrapper>
                <SignUp.Input
                  placeholder="6~15文字で入力してください。"
                  type="password"
                  required
                />
              </SignUp.InputWrapper>
              <p
                style={{ fontSize: "12px", color: "#999", marginTop: "-10px" }}
              >
                * 英字・数字・記号を組み合わせて6~15文字以内で入力してください。
              </p>
            </SignUp.FieldGroup>

            {/* 4. 전화번호 */}
            <SignUp.FieldGroup label="電話番号">
              <SignUp.InputWrapper>
                <SignUp.Input placeholder="電話番号" type="tel" />
              </SignUp.InputWrapper>
            </SignUp.FieldGroup>

            {/* 5. 비밀번호 확인 */}
            <SignUp.FieldGroup label="パスワード確認" hasCheck>
              <SignUp.InputWrapper>
                <SignUp.Input
                  placeholder="上記で入力したパスワードをもう一度入力してください。"
                  type="password"
                  required
                />
              </SignUp.InputWrapper>
            </SignUp.FieldGroup>

            {/* 6. 주소 */}
            <SignUp.FieldGroup label="住所">
              <SignUp.InputWrapper>
                <SignUp.Input
                  placeholder="우편번호"
                  style={{ maxWidth: "100px" }}
                  readOnly
                />
                <SignUp.Postcode type="button" onClick={handleAddressSearch}>
                  住所を検索
                </SignUp.Postcode>
              </SignUp.InputWrapper>
              <SignUp.InputWrapper style={{ marginTop: "5px" }}>
                <SignUp.Input placeholder="基本住所" type="text" />
              </SignUp.InputWrapper>
              <SignUp.InputWrapper style={{ marginTop: "5px" }}>
                <SignUp.Input placeholder="詳細住所" type="text" />
              </SignUp.InputWrapper>
            </SignUp.FieldGroup>
          </>
          {/* 🌟 2단 그리드 사용 종료 🌟 */}

          {/* 7. 약관 동의 */}
          <SignUp.Terms />

          {/* 8. 등록/취소 버튼 */}
          <SignUp.Actions onRegister={handleRegister} onCancel={handleCancel} />
        </SignUp.Form>
      </SignUp>
    </>
  );
};

export default SignUpPage;
