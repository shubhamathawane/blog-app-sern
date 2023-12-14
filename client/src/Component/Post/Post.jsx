import React from "react";
import { Link } from "react-router-dom";
import postDefault from "../../Util/SD-default-image.png";
import moment from "moment";

const Post = ({ post }) => {
  const PF = "http://localhost:3001/images/";

  return (
    <div>
      <div className="post">
        <div className="">
          <div className="">
            <div className="">
              <div className="border-1 card h-50 pb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <div className="text-center">
                      <img
                        style={{
                          height: "300px",
                          width: "30px",
                          objectFit: "cover",
                          objectPosition: "16%",
                        }}
                        className="img-fluid w-100"
                        src={PF + post.Image ? PF + post.Image : postDefault}
                        alt=""
                      />
                    </div>
                    <hr />
                    <div className="mt-3 text-center ">
                      <Link to={`/post/${post.id}`} className="link">
                        <p className="fs-5 fw-normal">{post.Title}</p>
                      </Link>
                      <p className="fst-italic text-black-50">
                      {moment(post?.CreatedAt).fromNow()}
                      </p>
                      <Link to={`/post/${post.id}`} className="link text-info ">
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
