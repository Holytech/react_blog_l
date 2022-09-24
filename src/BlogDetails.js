import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

function BlogDetails() {
  const history = useHistory();

  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const deleteBlog = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };
  return (
    <div className="blog-details">
      {isPending && <div> Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={deleteBlog}>Delete</button>
          <Link to="/" className="home">
            Home
          </Link>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;
