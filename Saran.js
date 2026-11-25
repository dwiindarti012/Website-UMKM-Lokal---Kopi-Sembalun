if (document.getElementById("halamanHasil")) {
  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();

    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var nilai = document.getElementById("penilaian").value;
    var pesan = document.getElementById("pesan").value;

    if (nama.trim() == "" || email.trim() == "" || pesan.trim() == "") {
      alert("Semua kolom wajib diisi!");
      return;
    }

    document.getElementById("hNama").textContent = nama;
    document.getElementById("hEmail").textContent = email;
    document.getElementById("hNilai").textContent = nilai + " / 5";
    document.getElementById("hPesan").textContent = pesan;

    document.querySelector("section").style.display = "none";
    document.getElementById("halamanHasil").style.display = "block";
  };
}
