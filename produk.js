
const judul = document.getElementById("judul");
judul.textContent = "Katalog Produk Kopi Seduh Sembalun";

const menu = [
  { nama: "Kopi Susu Gula Aren", harga: 15000 },
  { nama: "Kopi Tubruk Sembalun", harga: 10000 },
  { nama: "Es Kopi Rinjani", harga: 11200 },
  { nama: "Americano", harga: 13000 },
  { nama: "Coffee Latte", harga: 18000 },
  { nama: "Kopi Coklat Panas", harga: 13600 }
];

const pilihMenu = document.getElementById("pilih-menu");

for (let i = 0; i < menu.length; i++) {
  pilihMenu.innerHTML += '<option value="' + i + '">' + menu[i].nama + ' - Rp' + menu[i].harga + '</option>';
}

function hitungTotal() {
  const nomor = pilihMenu.value;
  const jumlah = Number(document.getElementById("jumlah").value);
  const hasil = document.getElementById("hasil-total");

  if (jumlah < 1) {
    hasil.textContent = "Jumlah minimal 1.";
    return;
  }

  const total = menu[nomor].harga * jumlah;

  hasil.textContent = "Total belanja: Rp" + total;
}
