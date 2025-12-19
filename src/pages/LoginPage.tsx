// LoginPage.tsx (수정된 코드)

import React, { FormEvent, useState } from "react";
// 🌟 useNavigate 훅을 가져옵니다.
import { useNavigate } from "react-router-dom"; 
import Header from "../components/layout/Header/Header";
import { Login } from "../components/Login/Login";
// 🌟 새로 생성한 useLogin 훅을 가져옵니다.
import { useLogin } from "../hooks/useLogin"; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 
  
  // 🌟 useLogin 훅 사용 및 상태 디스트럭처링
  const { executeLogin, isLoading, error } = useLogin();
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => { // 🌟 async 추가
    e.preventDefault();
    
    console.log("로그인 시도:", { email, password });
    
    // 🌟 API 호출 및 인증 처리
    const success = await executeLogin({ email, password });

    if (success) {
      console.log("ログイン成功！ トークン 저장 완료.");
      // 로그인 성공 시 마이페이지로 이동
      navigate('/mypage'); 
    }
  };

  const handleRegister = () => {
    console.log("회원가입 페이지로 이동");
    navigate('/register'); 
  };

  const handleForgotPassword = () => {
    console.log("비밀번호 찾기 페이지로 이동");
    navigate('/forgot-password');
  };

  return (
    <>
      <Header />
      <Login> 
        <Login.Form onSubmit={handleSubmit}>
            
            {/* 🌟 에러 메시지 표시 */}
            {error && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

          <Login.Input
            type="email"
            placeholder="ID(E-mail)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // 로딩 중에는 입력 비활성화
          />

          <Login.Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // 로딩 중에는 입력 비활성화
          />

          <Login.RememberMe />

          <Login.Action type="submit" isPrimary disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"} 
          </Login.Action>

          <Login.Action type="button" onClick={handleRegister} disabled={isLoading}>
            会員登録
          </Login.Action>
            
            <Login.Action onClick={handleForgotPassword}>パスワードを忘れた方</Login.Action>
        </Login.Form>
      </Login>
    </>
  );
};

export default LoginPage;