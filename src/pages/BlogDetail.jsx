import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostDetail(id);
  }, []);

  const fetchPostDetail = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!post) {
    return <p>Post tidak ditemukan.</p>;
  }

  return (
    <div className="container my-5">
      <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-sm p-4">
        <img src={post.img} alt="Blog image" className="card-img-top" />
        <h1 className="card-title text-center">{post.title}</h1>
        <p className="card-text text-muted text-center">{post.desc}</p>
        <hr />
        <div className="card-body">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
