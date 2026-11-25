var daftarMenu = [
  { nama: "Kopi Susu Gula Aren", harga: 15000 }, { nama: "Kopi Tubruk Sembalun", harga: 10000 }, { nama: "Es Kopi Rinjani", harga: 11200 },
  { nama: "Americano", harga: 13000 }, { nama: "Coffe Latte", harga: 18000 }, { nama: "Kopi Coklat Panas", harga: 13600 }
];
var form = document.querySelector("form");
var $ = function (id) { return document.getElementById(id); };
var rupiah = function (n) { return "Rp " + n.toLocaleString("id-ID"); };
var garis = "padding: 8px 0; border-bottom: 1px dotted #333333; white-space: pre-line;";
var kotak = "margin: 12px 0 16px; padding: 10px; border-left: 4px solid #E0A526; ";

function buat(tag, css, teks, induk) {
  var e = document.createElement(tag);
  e.style.cssText = css; e.textContent = teks;
  if (induk) induk.appendChild(e);
  return e;
}

function tampilkanMenu() {
  var sebelum = document.querySelector('label[for="pesanan"]'), wadah = buat("div", "", "");
  if (!sebelum) return;
  sebelum.before(buat("label", "", "Pilih Menu (isi jumlah)"), wadah);
  daftarMenu.forEach(function (m, i) {
    var baris = buat("div", "display: flex; align-items: center; gap: 10px; " + garis, "", wadah);
    buat("span", "flex: 1;", m.nama, baris);
    buat("span", "", rupiah(m.harga), baris);
    var kolom = buat("input", "width: 70px; margin-bottom: 0; text-align: center;", "", baris);
    kolom.type = "number"; kolom.min = 0; kolom.value = 0; kolom.id = "jumlah-" + i;
    kolom.addEventListener("input", hitungTotal);
  });
  var total = buat("p", kotak + "font-size: 1.1rem;", "Total belanja: ");
  buat("strong", "", "Rp 0", total).id = "total-belanja";
  sebelum.before(total);
}

function pilihan() {
  return daftarMenu.map(function (m, i) {
    return { nama: m.nama, harga: m.harga, jumlah: parseInt($("jumlah-" + i).value) || 0 };
  }).filter(function (m) { return m.jumlah > 0; });
}

function hitungTotal() {
  var dipilih = pilihan(), total = 0;
  dipilih.forEach(function (m) { total += m.jumlah * m.harga; });
  $("total-belanja").textContent = rupiah(total);
  $("pesanan").value = dipilih.map(function (m) { return m.jumlah + "x " + m.nama; }).join(", ");
}

function validasi() {
  var error = [], hp = $("nohp").value.trim();
  [["nama", "Nama Lengkap"], ["pesanan", "Detail Pesanan"], ["alamat", "Alamat Pengiriman"], ["nohp", "No. WhatsApp"]].forEach(function (f) { if ($(f[0]).value.trim() === "") error.push(f[1] + " wajib diisi."); });
  if (hp && !/^[+]?[0-9]{9,15}$/.test(hp)) error.push("No. WhatsApp harus berupa angka (9 sampai 15 digit).");
  return error;
}

function kirimPesanan() {
  if (!form) return;
  form.noValidate = true;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var error = validasi(), bukti = $("bukti").files;
    if ($("kotak-error")) $("kotak-error").remove();
    if (error.length) {
      var pesan = buat("div", kotak + "font-weight: bold; white-space: pre-line;", error.join("\n"));
      pesan.id = "kotak-error"; form.prepend(pesan);
      return pesan.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    var data = {
      nama: $("nama").value.trim(), pesanan: $("pesanan").value.trim(), items: pilihan(),
      total: $("total-belanja").textContent, alamat: $("alamat").value.trim(),
      nohp: $("nohp").value.trim(), bukti: bukti.length ? bukti[0].name : "Tidak ada"
    };
    location.href = "hasil.html?data=" + encodeURIComponent(JSON.stringify(data));
  });
}

function tampilkanHasil() {
  var wadah = $("hasil-pesanan"), d = null;
  if (!wadah) return;
  try { d = JSON.parse(new URLSearchParams(location.search).get("data")); } catch (e) {}
  if (!d) return void (wadah.textContent = "Belum ada data pesanan. Silakan isi form terlebih dahulu.");
  var rincian = d.items.map(function (m) { return "\n" + m.jumlah + " x " + m.nama + " (" + rupiah(m.harga) + ") = " + rupiah(m.jumlah * m.harga); }).join("");
  [["Nama", d.nama], ["Detail Pesanan", d.pesanan], ["Rincian Menu", rincian || "-"], ["Total Belanja", d.total],
   ["Alamat Pengiriman", d.alamat], ["No. WhatsApp", d.nohp], ["Bukti Pembayaran", d.bukti]].forEach(function (b) {
    var baris = buat("div", garis, "", wadah);
    buat("strong", "", b[0] + ": ", baris);
    baris.appendChild(document.createTextNode(b[1]));
  });
}

tampilkanMenu(); kirimPesanan(); tampilkanHasil();