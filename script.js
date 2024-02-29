class DataInput {
  constructor(nama, usia, uang) {
    this.nama = nama;
    this.usia = usia;
    this.uang = uang;
  }
}

const dataList = [];

const submit = document.getElementById("submit");

const namaInput = document.getElementById("nama");
const usiaInput = document.getElementById("usia");
const uangInput = document.getElementById("uang-sangu");

const tableData = document.getElementById("table-data");
const resume = document.getElementById("resume");

const errorNama = document.getElementById("nama-error");
const errorUsia = document.getElementById("usia-error");
const errorUangSangu = document.getElementById("uang-error");
const benar = document.getElementById("input-sukses");

// ----------------- INPUT VALIDASI ------------------//
function inputValidationNama(nama) {
  let inputSubmitNama = true;

  if (nama.length < 10) {
    inputSubmitNama = false;
  }
  return inputSubmitNama;
}

function inputValidationUsia(usia) {
  let inputSubmitUsia = true;
  if (usia < 20 || usia > 100) {
    inputSubmitUsia = false;
  }
  return inputSubmitUsia;
}

function inputValidationUang(uang) {
  let inputSubmitUang = true;
  if (uang < 100000 || uang > 1000000) {
    inputSubmitUang = false;
  }
  return inputSubmitUang;
}

function dataTable(tableData) {
  for (let i = 0; i < dataList.length; i++) {
    let row = tableData.insertRow(i);

    row.insertCell(0).innerHTML = i + 1;
    row.insertCell(1).innerHTML = dataList[i].nama;
    row.insertCell(2).innerHTML = dataList[i].usia;
    row.insertCell(3).innerHTML = dataList[i].uang;
  }
}

function avgUangSangu() {
  if (dataList.length === 0) {
    return 0; // atau pesan kesalahan lainnya, tergantung kebutuhan Anda
  }

  let total = 0;
  for (let i = 0; i < dataList.length; i++) {
    total += Number(dataList[i].uang);
  }
  const avg = Math.round(total / dataList.length);
  const formattedCurrency = avg.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  return formattedCurrency;
}

function avgUsia() {
  let total = 0;
  let avg = 0;
  for (i = 0; i < dataList.length; i++) {
    total += Number(dataList[i].usia);
    avg = total / dataList.length;
  }
  return avg;
}

resume.innerHTML = "Rata-rata Uang Sangu Rp" + avgUangSangu() + " dan Rata-rata Usia " + avgUsia() + " tahun";

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const nama = namaInput.value;
  const usia = usiaInput.value;
  const uang = uangInput.value;

  const inputSubmitNama = inputValidationNama(nama);
  const inputSubmitUsia = inputValidationUsia(usia);
  const inputSubmitUang = inputValidationUang(uang);

  if (inputSubmitNama && inputSubmitUsia && inputSubmitUang) {
    const newData = new DataInput(nama, usia, uang);
    dataList.push(newData);

    tableData.innerHTML = "";
    dataTable(tableData);

    errorNama.innerHTML = "";
    errorUsia.innerHTML = "";
    errorUangSangu.innerHTML = "";
    benar.innerHTML = "Data Berhasil di Inputkan";

    resume.innerHTML = "Rata-rata Uang Sangu " + avgUangSangu() + " dan Rata-rata Usia " + Math.round(avgUsia()) + " tahun";

    // Reset input values
    namaInput.value = "";
    usiaInput.value = "";
    uangInput.value = "";
  } else {
    // ------------- INPUT VALIDASI --------------- //
    errorNama.innerHTML = inputSubmitNama ? "" : "*Masukkan Nama minimal 10 Karakter";
    errorUsia.innerHTML = inputSubmitUsia ? "" : "*Usia minimal 20 tahun dan maksimal 100 tahun";
    errorUangSangu.innerHTML = inputSubmitUang ? "" : "*Uang Sangu Rp100.000 - Rp1.000.000";
    benar.innerHTML = " ";
  }
});
