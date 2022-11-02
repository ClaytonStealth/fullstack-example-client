import { useState } from "react";
const CreateBlogForm = (props) => {
  const { urlEndpoint, setShouldRefetch } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePostBlog = async () => {
    setShouldRefetch(true);
    setSuccessMessage("");
    const response = await fetch(`${urlEndpoint}/blogs/create-one`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
        author,
        categories,
      }),
    });
    if (response.ok !== true) {
      setSuccessMessage("Blog network request failed");
      return;
    }
    const payload = await response.json();
    if (payload.success !== true) {
      setSuccessMessage(`blog server error", ${payload.error}`);
      return;
    }
    setSuccessMessage("Blog created successfully");
    setShouldRefetch(false);
  };

  return (
    <div>
      <h1>Create Blog Form:</h1>
      {successMessage && <p>{successMessage}</p>}
      <label>Title</label>
      <input
        type='text'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <label>Author</label>
      <input
        type='text'
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <br />
      <label>Text</label>
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <br />
      <label>Categories</label>
      <input
        type='text'
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const newCategories = [...categories, category];
          setCategories(newCategories);
        }}
      >
        Add Category
      </button>
      <br />
      <button
        onClick={() => {
          handlePostBlog();
        }}
      >
        Create Blog
      </button>
      <hr />
    </div>
  );
};

export default CreateBlogForm;
