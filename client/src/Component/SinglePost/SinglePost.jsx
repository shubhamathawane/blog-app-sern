import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const SinglePost = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categaries, setCategaries] = useState([]);

  const commentRef = useRef();

  const PF = "http://localhost:3001/images/";

  const user = useSelector((state) => state.user.user);
  var userId = user?.id;

  const getPost = async () => {
    const res = await axios.get("http://localhost:3001/api/posts/" + path);
    setPost(res?.data[0]);
    setComments(res?.data);
    setCategaries(res?.data[0]?.Category?.split(","));
    console.log(categaries);
    setTitle(res.data[0]?.Title);
    setDesc(res.data[0]?.Content);
  };
  useEffect(() => {
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${post.id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/comment/", {
        postId: path,
        Text: commentRef.current.value,
        AuthorId: userId,
      });
      getPost();
      commentRef.current.value = null;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="w-75">
          <h3>{title}</h3>
          <p>
            {" "}
            <i>Posted on </i> {moment(post?.CreatedAt).fromNow()} by{" "}
            <Link className="link" to={`/?username=${post?.username}`}>
              <b>{post?.username}</b>
            </Link>
          </p>
          <div className="d-inline float-end">
            {post?.username === user?.username && (
              <>
                <FontAwesomeIcon icon={faPenToSquare} className="mx-3" />
                <a className="text-decoration-none border-0">
                  <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                </a>
              </>
            )}
          </div>
          {categaries?.map((item, key) => (
            <span
              key={key}
              className="bg-success border fw-semibold m-2 ms-0 px-1 px-2 rounded-2 text-capitalize text-white"
            >
              <Link className="link" to={`/?category=${item}`}>
                {item}
              </Link>
            </span>
          ))}
        </div>
        <br />
        {post?.Image && (
          <img src={PF + post?.Image} alt="" className="w-75 rounded card" />
        )}
        <div className="content mt-4 w-75">
          <p className="">{post?.Content}</p>
        </div>
        <hr className="w-75" />
        <div className="comments w-75">
          {user && (
            <div className="addComment mb-3 mt-4">
              <div className="d-flex py-1">
                <img
                  className="rounded-5"
                  style={{ width: "40px" }}
                  src={PF + user.profile_pic}
                  alt="Something"
                />
                <input
                  className="border-0 ms-3 mx-2 px-2 w-100"
                  type="text"
                  placeholder="Add your comment..."
                  ref={commentRef}
                />
                <button onClick={handleComments} className="border btn">
                  Comment
                </button>
              </div>
            </div>
          )}
          <h3> Comments ({comments?.comments?.length}) </h3>

          {comments?.comments?.map((item, key) => (
            <div key={key} className="comment h-100 border mb-3 rounded-3">
              <div className="mt-3">
                <div className="row">
                  <div className="d-flex">
                    <div className="p-3">
                      <Link
                        className="link"
                        to={`/?username=${post?.username}`}
                      >
                        <img
                          className="rounded-5"
                          style={{ width: "40px" }}
                          src={PF + item?.profile_pic}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="mt-2">
                      <span>{item?.username}</span>
                      <p>{moment(item?.CreatedAt).fromNow()}</p>
                    </div>
                  </div>
                </div>
                <div className="content px-3">
                  <p className="pb-3">{item?.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
