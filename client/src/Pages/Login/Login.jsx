import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "../../Features/UserSlice";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const isFetching = useSelector((state) => state.user.isFetching);
  const isError = useSelector((state) => state.user.error);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LOGIN_START());
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(LOGIN_SUCCESS(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      dispatch(LOGIN_FAILURE());
    }
  };

  return (
    <div className="h-100 bg-secondary">
      <div className="container-fluid " style={{ height: "560px" }}>
        <div className="align-items-center d-flex h-100 justify-content-around">
          <div className="d-grid">
            <h3>Login</h3>
            <label htmlFor="">Username</label>
            <input
              className="px-2"
              placeholder="username"
              type="text"
              name=""
              id=""
              ref={userRef}
            />
            <label htmlFor="">Password</label>
            <input
              className="px-2"
              placeholder="password"
              type="password"
              name=""
              id=""
              ref={passwordRef}
            />
            <button
              onClick={handleSubmit}
              className="mt-3 rounded border-0"
              disabled={isFetching}
            >
              Login
            </button>
            {isError && (
              <p>
                <b>Something went wrong</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
