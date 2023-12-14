import React, { useEffect, useState } from "react";
import Posts from "../Component/Posts/Posts";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3001/api/posts/" +  search);
      console.log(res?.data);
      setPosts(res?.data);
      console.log(posts)
    };
    fetchPosts();
  }, [posts.data]);

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
