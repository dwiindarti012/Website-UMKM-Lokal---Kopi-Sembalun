function tampilkanSapaan() {
  var sekarang = new Date();
  var jam = sekarang.getHours();
  var hari = sekarang.getDay(); // 0 = Minggu
  var sapaan = "";

  if (jam < 11) {
    sapaan = "Selamat pagi";
  } else if (jam < 15) {
    sapaan = "Selamat siang";
  } else if (jam < 18) {
    sapaan = "Selamat sore";
  } else {
    sapaan = "Selamat malam";
  }

  var status = "";
  if (hari != 0 && jam >= 8 && jam < 17) {
    status = "Kami sedang buka, yuk mampir!";
  } else {
    status = "Kami sedang tutup.";
  }

  document.getElementById("sapaan").innerHTML = "<b>" + sapaan + "!</b> " + status;
}

if (document.getElementById("sapaan")) {
  tampilkanSapaan();
}
