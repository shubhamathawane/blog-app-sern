import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      AuthorId: user.id,
      username: user.username,
      Title: title,
      Content: desc,
      Category: tags,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.Image = filename;
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:3001/api/posts/", newPost);
      res && window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className="container w-75">
      <div
        className="justify-content-center mb-3 rounded-2  text-center"
        style={{ height: "auto" }}
      >
        <label htmlFor="fileInput">
          <FontAwesomeIcon className="btn fs-3 " icon={faImage} />
        </label>
        {file && (
          <>
            <img
              className="thumbnail rounded   w-75"
              src={URL.createObjectURL(file)}
              alt=""
            />
          </>
        )}
      </div>
      <div>
        <form action="" className="writeform" onSubmit={handleSubmit}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <div className="writeFormGroup">
            <input
              type="text"
              placeholder="Title"
              className="border fs-5 fw-medium px-2 rounded-3 w-100 writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              style={{ height: "56px" }}
              required
            />
          </div>
          <div className="writeFormGroupTag">
            <input
              placeholder="🏷 Add Tags...."
              type="text"
              className="border fw-bold mt-3 px-2 rounded-0 rounded-3 text-info-emphasis w-100 writeInput"
              autoFocus={true}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell your story...."
              type="text"
              className="w-100 mt-3 border rounded-2 px-2 fs-6"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
              style={{ height: "300px" }}
              required
            />
          </div>
          <button
            className="mt-3 bg-success btn fw-bold text-white writeSubmit"
            type="submit"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Write;
