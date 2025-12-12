import React, { FormEvent, useState } from "react";
// 🌟 useNavigate 훅을 가져옵니다. (react-router-dom 설치 필요)
import { useNavigate } from "react-router-dom"; 
import Header from "../components/layout/Header/Header";
import { Login } from "../components/Login/Login";


const LoginPage: React.FC = () => {
  // 🌟 페이지 이동을 위한 useNavigate 훅을 초기화합니다.
  const navigate = useNavigate(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
    // 실제 로그인 성공 후 navigate('/mypage') 등으로 이동
  };

  // 🌟 수정: 회원가입 페이지 경로 '/register'로 이동
  const handleRegister = () => {
    console.log("회원가입 페이지로 이동");
    // AppRouter.tsx에 정의된 회원가입 경로로 이동합니다.
    navigate('/register'); 
  };

  const handleForgotPassword = () => {
    // 비밀번호 찾기 페이지로 이동 (Login.Action href와 일치)
    navigate('/forgot-password');
  };

  return (
    <>
      <Header />
      {/* Login.LayoutBase를 렌더링 */}
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

        </Login.Form>
      </Login>
    </>
  );
};

export default LoginPage;