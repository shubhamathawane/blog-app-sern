import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_SUCCESS,
  UPDATE_FAILURE,
  UPDATE_STATE,
  UPDATE_SUCCESS,
} from "../../Features/UserSlice";
import axios from "axios";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";

const Setting = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [postData, setPostData] = useState([]);

  const user = useSelector((state) => state.user.user);
  const PF = "http://localhost:3001/images/";
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/posts?username=" + user.username
    );
    console.log(res.data);
    setPostData(res.data);
    console.log(postData);
  };
  useEffect(() => {
    fetchPosts();
  }, [postData.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UPDATE_STATE());
    const updatedUser = {
      username,
      password,
      email,
      file,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profile_pic = filename;
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "http://localhost:3001/api/user/" + user.id,
        updatedUser
      );

      if (res.status == 200) {
        const UpdatedUser = await axios.get(
          "http://localhost:3001/api/user/" + user.id
        );
        setSuccess(true);
        dispatch(UPDATE_SUCCESS(UpdatedUser.data));
      }
    } catch (err) {
      dispatch(UPDATE_FAILURE());
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${id}`, {
        data: { username: user.username },
      });
      // window.location.replace("/");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublished = async (id) => {
    try {
      await axios.update(`http://localhost:3001/api/posts/${id}`, {
        data: { username: user.username },
      });
      // window.location.replace("/");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="settings mt-3">
        <div className="container">
          <div className="row">
            <div className="col-4 ">
              <div className="profile card position-sticky ">
                <form className="settingsForm" onSubmit={handleSubmit}>
                  <div className="text-center mt-4">
                    <img
                      src={
                        file ? URL.createObjectURL(file) : PF + user.profile_pic
                      }
                      alt=""
                      className="border mx-3 p-1"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <label htmlFor="fileInput">
                      <FontAwesomeIcon icon={faPlus} />{" "}
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="align-items-center container justify-content-center px-3 w-75 mt-3 pb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={user.username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-100"
                    />
                    <label className="w-100">Email</label>
                    <input
                      type="email"
                      className="w-100"
                      placeholder={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                      className="w-100"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="bg-warning border fw-medium mt-3 settingsSubmit text-bg-light"
                      type="submit"
                    >
                      Update
                    </button>
                    {success && (
                      <span
                        style={{
                          color: "green",
                          textAlign: "center",
                          margin: "20px",
                        }}
                      >
                        Profile has been updated...
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-8">
              <div className="container">
                <h3>Posts ({postData.length})</h3>
                <div className="data">
                  <table class="table rounded">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Published</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postData?.map((item, id) => (
                        <tr key={id}>
                          <th scope="row">{item.id}</th>
                          <td>
                            <Link
                              to={`/post/${item.id}`}
                              className="link text-info "
                            >
                              {item?.Title}
                            </Link>
                          </td>
                          <td> {moment(item?.CreatedAt).fromNow()}</td>
                          <td>
                            {item?.Published ? (
                              <label className="fw-medium text-success btn">
                                Yes
                              </label>
                            ) : (
                              <label>No</label>
                            )}
                          </td>
                          <td>
                            <label
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-danger btn"
                              />
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
