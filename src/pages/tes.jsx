import { Link, useNavigate, useLocation } from "react-router-dom"; // Mengimpor komponen Link, useNavigate, dan useLocation dari react-router-dom
import { useState, useEffect } from "react"; // Mengimpor hook useState dan useEffect dari React
import axios from "axios"; // Mengimpor library axios untuk melakukan request HTTP

const BlogList = () => {
  const navigate = useNavigate(); // Hook untuk melakukan navigasi programmatis
  const location = useLocation();
  // Hook untuk mendapatkan informasi lokasi saat ini
  const queryParams = new URLSearchParams(location.search); // Mendapatkan query parameter dari URL
  const initialPage = parseInt(queryParams.get("page")) || 1; // Mendapatkan nomor halaman awal dari query parameter, default 1 jika tidak ada

  const [posts, setPosts] = useState([]); // State untuk menyimpan data postingan blog, dimulai dengan array kosong
  const [pagination, setPagination] = useState({});

  const [isLoading, setIsLoading] = useState(false); // State untuk menunjukkan status loading, dimulai dengan false
  const [error, setError] = useState(null); // State untuk menyimpan pesan error, dimulai dengan null

  const [page, setPage] = useState(initialPage); // State untuk menyimpan nomor halaman saat ini, dimulai dengan initialPage

  useEffect(() => {
    // useEffect hook untuk menjalankan efek samping saat komponen dirender atau saat nilai dependensi berubah
    fetchPosts(); // Memanggil fungsi fetchPosts untuk mengambil data postingan
  }, [page]); // Menjalankan useEffect hanya jika nilai `page` berubah

  const fetchPosts = async () => {
    // Fungsi untuk mengambil data postingan blog dari API
    setIsLoading(true); // Mengatur state isLoading menjadi true sebelum melakukan request
    setError(null); // Mengatur state error menjadi null sebelum melakukan request

    try {
      const response = await axios.get(
        // Melakukan request GET ke API dengan axios
        `http://localhost:3000/posts?_per_page=4&_page=${page}` // URL endpoint API dengan query parameter untuk pagination
      );
      setPosts(response.data.data); // Menyimpan data postingan dari response API ke state posts
      setPagination(response.data); // Menyimpan data paginasi dari response API ke state pagination
    } catch (error) {
      // Menangani error jika terjadi kesalahan saat melakukan request
      console.error(error); // Menampilkan error di console
      setError("Gagal mengambil data."); // Menyimpan pesan error ke state error
    } finally {
      // Blok finally akan selalu dijalankan setelah blok try...catch selesai
      setIsLoading(false); // Mengatur state isLoading menjadi false setelah request selesai
    }
  };

  const handlePageChange = (newPage) => {
    // Fungsi untuk menangani perubahan halaman
    setPage(newPage); // Mengupdate state page dengan nomor halaman yang baru
    navigate(`?page=${newPage}`); // Mengupdate URL dengan query parameter baru menggunakan navigate
  };

  return (
    // Merender JSX untuk ditampilkan di halaman web
    <div className="container my-5">
      // Container utama dengan margin atas dan bawah 5
      <h1 className="text-center mb-4">Blog Posts</h1> // Judul Blog Posts
      dengan margin bawah 4, ditengahkan
      {isLoading && <div className="text-center">Loading...</div>} //
      Menampilkan loading indicator jika isLoading true
      {error && <div className="alert alert-danger">{error}</div>} //
      Menampilkan pesan error jika error tidak null
      <section className="row">
        {" "}
        // Section untuk menampilkan postingan dalam baris
        {posts.map(
          (
            post // Memetakan data postingan untuk ditampilkan
          ) => (
            <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
              {" "}
              // Div untuk setiap postingan, dengan lebar responsif dan margin
              bawah 4
              <Link to={`/post/${post.id}`} className="text-decoration-none">
                {" "}
                {/* Link ke halaman detail postingan, menghilangkan dekorasi link */}
                <div className="card h-100 shadow-sm">
                  {" "}
                  {/* Card untuk setiap postingan, dengan tinggi 100% dan efek shadow */}
                  <img
                    src={post.img} // Sumber gambar dari data postingan
                    className="card-img-top img-cstm" // Class untuk gambar, diposisikan di atas card
                    alt={post.title} // Teks alternatif untuk gambar
                    loading="lazy" // Mengoptimalkan loading gambar
                  />
                  <div className="card-body">
                    {" "}
                    {/* Body dari card */}
                    <h5 className="card-title">{post.title}</h5>{" "}
                    {/* Judul postingan */}
                    <p className="card-text text-muted">{post.desc}</p>{" "}
                    {/* Deskripsi postingan dengan teks abu-abu */}
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </section>
      <div className="d-flex justify-content-center mt-4">
        {" "}
        {/* Div untuk tombol paginasi, ditengahkan dengan margin atas 4 */}
        <button
          className="btn btn-outline-primary me-2" // Tombol Previous dengan outline primary dan margin kanan 2
          onClick={() => handlePageChange(pagination.prev)} // Memanggil handlePageChange dengan halaman sebelumnya saat tombol diklik
          disabled={!pagination.prev} // Menonaktifkan tombol jika tidak ada halaman sebelumnya
        >
          <i className="bi bi-arrow-left"></i> Previous{" "}
          {/* Icon panah kiri dan teks Previous */}
        </button>
        <button
          className="btn btn-outline-primary" // Tombol Next dengan outline primary
          onClick={() => handlePageChange(pagination.next)} // Memanggil handlePageChange dengan halaman selanjutnya saat tombol diklik
          disabled={!pagination.next} // Menonaktifkan tombol jika tidak ada halaman selanjutnya
        >
          Next <i className="bi bi-arrow-right"></i>{" "}
          {/* Teks Next dan icon panah kanan */}
        </button>
      </div>
    </div>
  );
};

export default BlogList; // Mengekspor komponen BlogList agar bisa digunakan di komponen lain
