const form = document.getElementById("form-ulasan");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = form.nama.value.trim();
  const produk = form.produk.value;
  const rating = form.rating.value;
  const komentar = form.komentar.value.trim();

  if (nama === "" || produk === "" || rating === "" || komentar === "") {
    alert("Semua data wajib diisi!");
    return;
  }

  let foto = "Tidak ada foto";
  if (form.foto.files.length > 0) {
    foto = form.foto.files[0].name;
  }

  sessionStorage.setItem("nama", nama);
  sessionStorage.setItem("produk", produk);
  sessionStorage.setItem("rating", rating);
  sessionStorage.setItem("foto", foto);
  sessionStorage.setItem("komentar", komentar);

  window.location.href = "ulasan-hasil.html";
});
