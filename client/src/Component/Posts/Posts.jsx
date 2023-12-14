import React from "react";
import Post from "../Post/Post";

const Posts = ({ posts }) => {
  console.log(posts);

  return (
    <div>
      <div className="container">
        <div className="posts mt-4 row">
          {/* <div className="row gap-2">
            <div className="border-1 card col-3 h-50">
              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <div className="text-center">
                    <img
                      style={{ height: "300px", width: "30px" }}
                      className="img-fluid w-100"
                      src="https://picsum.photos/200/300"
                      alt=""
                    />
                  </div>
                  <hr />
                  <div className="mt-3 text-center ">
                    <p className="fs-3 fw-normal">This it the first title </p>
                    <p className="fst-italic text-black-50">Mon 29/09/1999</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      aliquam ducimus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <h3 className="fs-italic mb-2">Latest Blogs :</h3>
          {posts?.map((p) => (
            <div className="col-3 mb-3">
              <Post post={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
