import React, { useState } from "react";
import { Link } from "react-router-dom";
import BrandArea from "./BrandArea";
import "./css/Login.css";
import tit_welcome from "./images/tit_welcome.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER_URL2 } from "@/config.jsx";
import { setItem } from "../../utils/sessionStorageFn";
import { swalError } from "../../utils/swal-utils";
import jwtDecode from "jwt-decode";
import userStore from "../../store/UserStore";
//token의 playload 내용을 디코딩해줌

const Login = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const { id, password } = inputs;
  const { setUser } = userStore;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    if (id === "") {
      setCheck(true);
      return;
    }
    if (password === "") {
      setCheck(true);
      return;
    }
    setCheck(false);

    await axios
      .post(`${SERVER_URL2}/auth`, inputs)
      // .post(`${SERVER_URL}/auth`, inputs)
      .then(({ data }) => {
        const { accessToken, status } = data;
        if (status === 200) {
          // setItem("userRole", data.userRole);
          // setItem("user", id);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          setItem("user", jwtDecode(accessToken));
          setItem("userRole", jwtDecode(accessToken).role);
          setItem("token", accessToken); // local storage에 저장
          setUser(jwtDecode(accessToken));
          setTimeout;
          swalError("로그인 되었습니다.", () => history.push("/"));
        } else {
          swalError("로그인 정보를 확인해주세요.", () => setCheck(true));
          setInputs({
            id: "",
            password: "",
          });
          return;
        }
      })
      .catch((e) => console.log(e));
  };

  // const onSilentRefresh = () => {
  //   axios
  //     .post("/silent-refresh", data)
  //     .then(onLoginSuccess)
  //     .catch((error) => {
  //       // ... 로그인 실패 처리
  //     });
  // };

  return (
    <div id="login" className="wrap">
      <BrandArea />
      <div className="contentsArea">
        <div className="container">
          <div className="header">
            <div className="title">
              <img src={tit_welcome} alt="Welcome" />
            </div>
            <div className="txt">서비스를 이용하시려면 로그인해주세요.</div>
          </div>
          <div className="contents">
            <form method="">
              <ul className="inputList">
                <li>
                  <input
                    type="text"
                    placeholder="아이디"
                    name="id"
                    className="input_login"
                    onChange={onChange}
                    // value="1234"
                    value={id}
                  />
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    name="password"
                    className="input_login"
                    onChange={onChange}
                    value={password}
                    // value="1234"
                  />
                </li>
              </ul>
              <div className="loginBtns">
                <button
                  type="submit"
                  className="btn_contained primary"
                  onClick={login}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
          {/* <div className="memberLinks">
            <Link to="/">아이디 찾기</Link>
            <Link to="/">비밀번호 찾기</Link>
            <Link to="/">회원가입</Link>
          </div> */}
          {check && (
            <div className="login-err">
              <p className="notice">
                가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
