var daftarMenu = [
  { nama: "Kopi Hitam", harga: 10000 }, { nama: "Kopi Susu", harga: 15000 }, { nama: "Espresso", harga: 18000 },
  { nama: "Kopi Gula Aren", harga: 20000 }, { nama: "Biji Kopi 250 gr", harga: 55000 }
];
var form = document.querySelector("form");
var $ = function (id) { return document.getElementById(id); };
var rupiah = function (n) { return "Rp " + n.toLocaleString("id-ID"); };
var garis = "padding: 8px 0; border-bottom: 1px dotted #333333; white-space: pre-line;";
var kotak = "margin: 12px 0 16px; padding: 10px; border-left: 4px solid #E0A526; ";

function tampilkanMenu() {
  var sebelum = document.querySelector('label[for="pesanan"]'), wadah = document.createElement("div");
  if (!sebelum) return;
  wadah.innerHTML = "<label>Pilih Menu (isi jumlah)</label>" + daftarMenu.map(function (m, i) {
    return '<div style="display: flex; align-items: center; gap: 10px; ' + garis + '"><span style="flex: 1;">' + m.nama +
      "</span><span>" + rupiah(m.harga) + '</span><input type="number" min="0" value="0" id="jumlah-' + i +
      '" style="width: 70px; margin-bottom: 0; text-align: center;"></div>';
  }).join("") + '<p style="' + kotak + 'font-size: 1.1rem;">Total belanja: <strong id="total-belanja">Rp 0</strong></p>';
  wadah.addEventListener("input", hitungTotal);
  sebelum.before(wadah);
}

function pilihan() {
  return daftarMenu.map(function (m, i) {
    return { nama: m.nama, harga: m.harga, jumlah: parseInt($("jumlah-" + i).value) || 0 };
  }).filter(function (m) { return m.jumlah > 0; });
}

function hitungTotal() {
  var dipilih = pilihan();
  $("total-belanja").textContent = rupiah(dipilih.reduce(function (t, m) { return t + m.jumlah * m.harga; }, 0));
  $("pesanan").value = dipilih.map(function (m) { return m.jumlah + "x " + m.nama; }).join(", ");
}

function validasi() {
  var error = [], hp = $("nohp").value.trim();
  [["nama", "Nama Lengkap"], ["pesanan", "Detail Pesanan"], ["alamat", "Alamat Pengiriman"], ["nohp", "No. WhatsApp"]].forEach(function (f) { if (!$(f[0]).value.trim()) error.push(f[1] + " wajib diisi."); });
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
      form.insertAdjacentHTML("afterbegin", '<div id="kotak-error" style="' + kotak + 'font-weight: bold; white-space: pre-line;">' + error.join("\n") + "</div>");
      return $("kotak-error").scrollIntoView({ behavior: "smooth", block: "center" });
    }
    var data = { nama: $("nama").value.trim(), pesanan: $("pesanan").value.trim(), items: pilihan(), total: $("total-belanja").textContent,
      alamat: $("alamat").value.trim(), nohp: $("nohp").value.trim(), bukti: bukti.length ? bukti[0].name : "Tidak ada" };
    location.href = "hasil.html?data=" + encodeURIComponent(JSON.stringify(data));
  });
}

function tampilkanHasil() {
  var wadah = $("hasil-pesanan"), d = null;
  if (!wadah) return;
  try { d = JSON.parse(new URLSearchParams(location.search).get("data")); } catch (e) {}
  if (!d) return void (wadah.textContent = "Belum ada data pesanan. Silakan isi form terlebih dahulu.");
  var rincian = d.items.map(function (m) { return "\n" + m.jumlah + " x " + m.nama + " (" + rupiah(m.harga) + ") = " + rupiah(m.jumlah * m.harga); }).join("");
  var baris = [["Nama", d.nama], ["Detail Pesanan", d.pesanan], ["Rincian Menu", rincian || "-"], ["Total Belanja", d.total],
    ["Alamat Pengiriman", d.alamat], ["No. WhatsApp", d.nohp], ["Bukti Pembayaran", d.bukti]];
  wadah.innerHTML = baris.map(function (b) { return '<div style="' + garis + '"><strong>' + b[0] + ': </strong><span></span></div>'; }).join("");
  wadah.querySelectorAll("span").forEach(function (s, i) { s.textContent = baris[i][1]; });
}

tampilkanMenu(); kirimPesanan(); tampilkanHasil();