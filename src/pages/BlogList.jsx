import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(initialPage);

  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/posts?_per_page=4&_page=${page}`
      );
      setPosts(response.data.data);
      setPagination({
        prev: response.data.prev,
        next: response.data.next,
      });
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>

      {isLoading && <div className="text-center">Loading...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <section className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.img}
                  className="card-img-top img-cstm"
                  alt={post.title}
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => handlePageChange(pagination.prev)}
          disabled={!pagination.prev}
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageChange(pagination.next)}
          disabled={!pagination.next}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;
