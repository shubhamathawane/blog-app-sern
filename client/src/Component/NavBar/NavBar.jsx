import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../Features/UserSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = () => {
  const PF = "http://localhost:3001/images/";

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LOGOUT());
    localStorage.removeItem("user");
  };

  return (
    <div className="top">
      <div className="container">
        <div className="row">
          <div className="col-4 text-start">
            <div className="mt-3">Icons</div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-around align-content-center ">
              <div className=" d-flex mt-3 justify-content-around w-100">
                <p className="fs-none">
                  {" "}
                  <Link className="link" to="/">
                    Home
                  </Link>
                </p>
                <p className="fs-none">
                  {" "}
                  <Link className="link" to="/">
                    Contact
                  </Link>
                </p>
                {user && (
                  <p className="fs-none">
                    {" "}
                    <Link className="link" to="/write">
                      Write
                    </Link>
                  </p>
                )}
                <p className="fs-none">
                  {" "}
                  <Link className="link" to="/about">
                    About
                  </Link>
                </p>
                {user && (
                  <p
                    style={{ cursor: "pointer" }}
                    className=""
                    onClick={handleLogOut}
                  >
                    Logout
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex mt-3 float-end ">
              {user ? (
                <Link to={"/settings"} className="link">
                  <img
                    className="rounded-5"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={PF + user.profile_pic}
                    alt=""
                  />
                </Link>
              ) : (
                <>
                  <p className="fs-none ms-3">
                    {" "}
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  </p>
                  <p className="fs-none ms-3">
                    {" "}
                    <Link className="link" to="/register">
                      Register
                    </Link>
                  </p>
                </>
              )}
              <p className="ms-4 btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
