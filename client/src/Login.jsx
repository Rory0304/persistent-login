import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = React.useState({ id: "", password: "" });

  const handleOnChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await fetch("http://localhost:8000/autoLogin", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          navigate("/home");
        }
      } catch (err) {
        navigate("/");
      }
    };

    autoLogin();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (userInfo.id.trim().length > 0 && userInfo.password.trim().length > 0) {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo.id,
          passsord: userInfo.password,
        }),
      });

      if (response.status === 200) {
        navigate("/home");
      }
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        name="id"
        type="text"
        placeholder="Enter ID"
        onChange={(e) => handleOnChange(e)}
      />
      <input
        className="input"
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={(e) => handleOnChange(e)}
      />
      <button className="btn" type="button" onClick={(e) => submit(e)}>
        Login
      </button>
    </div>
  );
}

export default Login;
