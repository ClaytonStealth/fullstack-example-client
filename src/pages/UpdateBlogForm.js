import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlogForm = (props) => {
  const { blogs, setShouldRefetch } = props;
  const { urlEndpoint } = props;
  const [singleBlog, setSingleBlog] = useState({});
  const [singleBlogTitle, setSingleBlogTitle] = useState("");
  const [singleBlogText, setSingleBlogText] = useState("");
  const [singleBlogAuthor, setSingleBlogAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const params = useParams();
  const [id, setId] = useState(params.id);
  const handleUpdateBlog = async () => {
    setShouldRefetch(true);
    const res = await fetch(`${urlEndpoint}/blogs/update-one/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: singleBlogTitle,
        text: singleBlogText,
        author: singleBlogAuthor,
        categories: categories,
        lastModified: new Date(),
      }),
    });
    const blogPayload = await res.json();
    console.log(blogPayload);
    setShouldRefetch(false);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        return;
      }
      const res = await fetch(`${urlEndpoint}/blogs/get-one/${id}`);
      const blogPayload = await res.json();
      setSingleBlog(blogPayload.blog);
      setSingleBlogTitle(blogPayload.blog.title);
      setSingleBlogAuthor(blogPayload.blog.author);
      setSingleBlogText(blogPayload.blog.text);
    };
    fetchBlog();
  }, [id]);

  return (
    <div>
      <h1>Update Blog Form:</h1>
      <select
        onChange={(e) => {
          setId(e.target.value);
        }}
      >
        <option value={""}></option>
        {blogs.map((blog, index) => {
          return (
            <option key={index} value={blog.id}>
              {blog.id}
            </option>
          );
        })}
      </select>
      Single Blog:
      <p>{singleBlog.title}</p>
      <p>{singleBlog.author}</p>
      <p>{singleBlog.id}</p>
      <p>{singleBlog.text}</p>
      <label>Title</label>
      <input
        value={singleBlogTitle}
        type='text'
        onChange={(e) => {
          // setSingleBlog({ ...singleBlog, title: e.target.value });
          setSingleBlogTitle(e.target.value);
        }}
      />
      <label>Author</label>
      <input
        value={singleBlogAuthor}
        type='text'
        onChange={(e) => {
          // setSingleBlog({ ...singleBlog, title: e.target.value });
          setSingleBlogAuthor(e.target.value);
        }}
      />
      <label>Text</label>
      <textarea
        value={singleBlogText}
        onChange={(e) => {
          // setSingleBlog({ ...singleBlog, text: e.target.value });
          setSingleBlogText(e.target.value);
        }}
      />
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
      <button
        onClick={() => {
          handleUpdateBlog();
        }}
      >
        updateBlog
      </button>
      <hr />
    </div>
  );
};

export default UpdateBlogForm;
