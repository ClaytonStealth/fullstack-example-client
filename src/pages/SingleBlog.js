import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = (props) => {
  const { urlEndpoint } = props;
  const { setShouldRefetch } = props;
  const [newBlogs, setNewBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState({});

  const params = useParams();
  const [id, setId] = useState(params.id || "");

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all`);
      const fetchedBlogsPayload = await result.json();
      setNewBlogs(fetchedBlogsPayload.blogs);
    };
    fetchBlogs();
  }, []);
  // console.log(newBlogs);
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        return;
      }
      const res = await fetch(`${urlEndpoint}/blogs/get-one/${id}`);
      const blogPayload = await res.json();
      setSingleBlog(blogPayload.blog);
    };
    fetchBlog();
  }, [id]);

  const handleDeleteBlog = async () => {
    setShouldRefetch(true);
    const res = await fetch(`${urlEndpoint}/blogs/delete-one/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedLoad = await res.json();
    console.log(deletedLoad);
    setShouldRefetch(false);
  };

  return (
    <div>
      Single Blog:
      <p>{singleBlog.title}</p>
      <p>{singleBlog.id}</p>
      <p>{singleBlog.text}</p>
      <p>{singleBlog.categories}</p>
      <input
        value={id}
        type='text'
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <select
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      >
        <option value={""}></option>
        {newBlogs.map((blog, index) => {
          return (
            <option key={index} value={blog.id}>
              {blog.id}
            </option>
          );
        })}
      </select>
      <button
        onClick={(e) => {
          handleDeleteBlog();
        }}
      >
        Delete this id
      </button>
      <hr />
    </div>
  );
};
export default SingleBlog;
