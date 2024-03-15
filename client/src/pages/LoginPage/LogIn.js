import { Container } from "../../Layout";
import { useState, useRef } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  LoginInputWrapper,
  LoginInput,
  FindIdPw,
  LoginBtn,
  GoSignup,
  LoginInputForm,
  LoginWrapper,
} from "./LoginStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  const idRef = useRef();
  const [id, setId] = useState("");

  const pwRef = useRef();
  const [pw, setPw] = useState("");

  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const toggleShowPw = () => {
    setShowPw(!showPw);
  };

  const handleSubmit = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleFindIdPw = () => {
    navigate("/findidpw");
  };
  return (
    <Container>
      <Header />
      <hr />
      <LoginWrapper>
        <LoginInputWrapper>
          <LoginInputForm>
            <LoginInput
              placeholder="아이디를 입력하세요."
              value={id}
              ref={idRef}
              onChange={(e) => setId(e.target.value)}
              type="text"
            />
          </LoginInputForm>
          <LoginInputForm>
            <LoginInput
              placeholder="비밀번호를 입력하세요."
              value={pw}
              ref={pwRef}
              onChange={(e) => setPw(e.target.value)}
              type={showPw ? "text" : "password"}
            />
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{ color: "#A4A4A4" }}
              onClick={toggleShowPw}
            />
          </LoginInputForm>
          <FindIdPw onClick={handleFindIdPw}>아이디 / 비밀번호 찾기</FindIdPw>
          <LoginBtn onClick={handleSubmit}>로그인</LoginBtn>
        </LoginInputWrapper>
        <GoSignup onClick={handleSignUp}>계정이 없으신가요? 회원가입</GoSignup>
      </LoginWrapper>
    </Container>
  );
};
export default Login;