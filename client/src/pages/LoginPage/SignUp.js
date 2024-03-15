import { useState, useRef } from "react";
import Header from "../../components/Header";
import { Container } from "../../Layout";
import axios from "axios";

import {
  FindWrapper,
  TitleDiv,
  InputSignUpDiv,
  IdPwTitle,
  InputIdPw,
  ConfirmWrapper,
  ConfirmBtn,
  InputIdPwHalf,
  Calender,
  PwMatchWrapper,
} from "./FindIdPwStyle";
import { LoginBtn } from "./LoginStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const checkpwRef = useRef();
  const [birth, setBirth] = useState(new Date());
  const [age, setAge] = useState(0);

  const [user, setUser] = useState({
    id: "",
    password: "",
    checkpw: "",
    name: "",
    email: "",
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.name.length < 1) {
      nameRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }
    if (user.email.length < 1) {
      emailRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }
    if (user.password.length < 8) {
      pwRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }

    if (user.password !== user.checkpw) {
      checkpwRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }

    // 회원가입 정보와 나이(age)를 서버에 전송
    const userData = {
      userId: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      age: age,
    };

    axios
      .post("http://localhost:80/user/create", userData)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("사용자 정보:", user);
  console.log("생년월일:", age);

  return (
    <Container>
      <Header headText={"벗들공구"} goHeadTitle={"/"} />
      <hr />
      <FindWrapper>
        <TitleDiv>회원가입</TitleDiv>

        <InputSignUpDiv>
          <IdPwTitle>이메일</IdPwTitle>
          <ConfirmWrapper>
            <InputIdPwHalf
              placeholder="이메일"
              type="email"
              name="email"
              value={user.email}
              ref={emailRef}
              onChange={(e) => {
                handleChangeState(e);
                setUser((prevUser) => ({
                  ...prevUser,
                  id: e.target.value.split("@")[0],
                }));
              }}
            />
            <ConfirmBtn>이메일 인증 보내기</ConfirmBtn>
          </ConfirmWrapper>

          <PwMatchWrapper>
            <IdPwTitle>비밀번호</IdPwTitle>
            {user.password.length < 8 && (
              <h5>비밀번호를 8자 이상 입력해주세요.</h5>
            )}
          </PwMatchWrapper>
          <InputIdPw
            placeholder="비밀번호"
            type="text"
            name="password"
            value={user.password}
            ref={pwRef}
            onChange={handleChangeState}
          />

          <PwMatchWrapper>
            <IdPwTitle>비밀번호 확인</IdPwTitle>
            {user.password !== user.checkpw && (
              <h5>비밀번호가 일치하지 않습니다.</h5>
            )}
          </PwMatchWrapper>
          <InputIdPw
            placeholder="비밀번호 확인"
            type="password"
            name="checkpw"
            value={user.checkpw}
            ref={checkpwRef}
            onChange={handleChangeState}
          />

          <IdPwTitle>이름</IdPwTitle>
          <InputIdPw
            placeholder="이름"
            type="text"
            name="name"
            value={user.name}
            ref={nameRef}
            onChange={handleChangeState}
          />

          <IdPwTitle>생년월일</IdPwTitle>
          <Calender>
            <DatePicker
              selected={birth}
              onChange={(date) => {
                setBirth(date);
                setAge(new Date().getFullYear() - date.getFullYear());
              }}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={30}
              maxDate={new Date()}
            />
          </Calender>
        </InputSignUpDiv>
        <LoginBtn onClick={handleSubmit}>회원가입</LoginBtn>
      </FindWrapper>
    </Container>
  );
};

export default SignUp;
