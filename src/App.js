import { useState, useEffect } from "react";
import "./App.css";
import SingleBlog from "./pages/SingleBlog";
import CreateBlogForm from "./pages/CreateBlogForm";
import UpdateBlogForm from "./pages/UpdateBlogForm";
const urlEndpoint = "http://localhost:4000";
// const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [blogs, setBlogs] = useState([]);
  const [urlParamString, setUrlParamString] = useState("?limit=100&page=1");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all${urlParamString}`);
      const fetchedBlogsPayload = await result.json();
      setBlogs(fetchedBlogsPayload.blogs);
    };
    fetchBlogs();
  }, [urlParamString, shouldRefetch]);
  // console.log(blogs);
  useEffect(() => {
    generateUrlParams(limit, page);
  }, [limit, page]);

  const generateUrlParams = (limit, page) => {
    let urlParams = `?limit=${limit}&page=${page}`;
    setUrlParamString(urlParams);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>{shouldRefetch && "Please waitm we are refetching the data"}</h2>
        <UpdateBlogForm
          urlEndpoint={urlEndpoint}
          blogs={blogs}
          setShouldRefetch={setShouldRefetch}
        />
        <CreateBlogForm
          urlEndpoint={urlEndpoint}
          setShouldRefetch={setShouldRefetch}
        />
        <SingleBlog urlEndpoint={urlEndpoint} blogs={blogs} />
        <div className='url-params'>
          <label>Limit</label>
          <input
            type='number'
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          ></input>
          <label>Number</label>
          <input
            type='number'
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
          ></input>
        </div>
        {blogs.map((blog, index) => {
          return (
            <div key={index}>
              <p>Title: {blog.title}</p>
              <p>ID: {blog.id}</p>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
