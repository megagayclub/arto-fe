import React, { FormEvent, useState } from "react";
import { Login } from "../components/Login/Login";
import Header from "../components/layout/Header/Header";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("로그인 시도:", { email, password });

    // 성공 시 페이지 이동 (예: 마이페이지)
    // 실패 시 에러 메시지 표시
  };

  const handleRegister = () => {
    console.log("회원가입 페이지로 이동");
  };

  return (
    <>
      <Header />
      <Login>
        <Login.Form onSubmit={handleSubmit}>
          <Login.Input
            type="email"
            placeholder="ID(E-mail)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Login.Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Login.RememberMe />

          <Login.Action type="submit" isPrimary>
            로그인
          </Login.Action>

          <Login.Action type="button" onClick={handleRegister}>
            회원 등록
          </Login.Action>

          <Login.Action href="/forgot-password">비밀번호 찾기</Login.Action>
        </Login.Form>
      </Login>
    </>
  );
};

export default LoginPage;
