const jenisKonversi = document.getElementById('jenis-konversi');
const inputSuhu = document.getElementById('input-suhu');
const outputSuhu = document.getElementById('hasil-suhu');
const kalkulasi = document.getElementById('how-to-suhu');
const descRumus = document.getElementById('descRumus');
const rumus = document.getElementById('rumus');
const textarea = document.getElementById('input-suhu');

textarea.addEventListener('keydown', function(event) {
  // Mendapatkan kode tombol yang ditekan
  const keyCode = event.keyCode || event.which;

  // Mengecek apakah pengguna menekan tombol Ctrl bersamaan dengan tombol C atau V
  if ((event.ctrlKey || event.metaKey) && (keyCode === 67 || keyCode === 86 || keyCode === 83 || keyCode === 90)) {
    // Memperbolehkan tindakan Ctrl+C (copy) dan Ctrl+V (paste)
    return;
  }

  if(keyCode === 13) { // ketika enter, maka tampilkan hasilnya
    event.preventDefault();
    hitungKonversi();   
    tampilkanCalc();
    tampilkanRumus();
  }

  // Cek jika tombol yang ditekan adalah spasi]
  if (keyCode !== 32 &&
      !(keyCode >= 48 && keyCode <= 57) &&  // cek untuk angka di atas keyboard
      !(keyCode >= 96 && keyCode <= 105) && // cek untuk angka di keypad
      !(keyCode === 190) && // cek titik sebagai koma
      keyCode !== 8 &&  // backspace
      keyCode !== 37 && // panah kiri
      keyCode !== 39 && // panah kanan
      keyCode !== 46 && // delete
      keyCode !== 9     // tab
      ) {
    // Mencegah tindakan selain memasukkan angka
    event.preventDefault();
  }
});

document.body.addEventListener('keydown', function(event) { // ketika tidak di textarea
  const keyCode = event.keyCode || event.which; 

  if(keyCode === 13) { // ketika enter, maka tampilkan hasilnya
    event.preventDefault();
    hitungKonversi();   
    tampilkanCalc();
    tampilkanRumus();
  }
});



function konversi() { // jika ingin input otomatis di kalkulasi uncomment 2 event listener diatas
  hitungKonversi();   // kemudian comment fungsi ini
  tampilkanCalc();
  tampilkanRumus();
}

// Fungsi untuk membalikkan jenis konversi
function reverseKonversi() {
  const selectedOption = jenisKonversi.value;
  let reversedOption;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      reversedOption = 'fahrenheit-to-celsius';
      break;
    case 'fahrenheit-to-celsius':
      reversedOption = 'celsius-to-fahrenheit';
      break;
  }

  jenisKonversi.value = reversedOption;
  hitungKonversi();  // uncomment jika ingin input otomatis di kalkulasi setelah di reverse
  tampilkanCalc();   
  tampilkanRumus();
}

function hitungKonversi() {
    const selectedOption = jenisKonversi.value;
    const suhu = parseFloat(inputSuhu.value);

    let hasil;
    switch(selectedOption) {
      case 'celsius-to-fahrenheit':
        hasil = suhu * 9/5 + 32;
        break;
      case 'fahrenheit-to-celsius':
        hasil = (suhu - 32) * 5/9;
        break;
    }

    if (isNaN(hasil)) {
      outputSuhu.value = "Tidak ada hasil";
    } else {
      outputSuhu.value = hasil.toFixed(2);
    }
  }

  function tampilkanCalc() {
    const selectedOption = jenisKonversi.value;
    const suhu = inputSuhu.value;
    let calcText;

    switch(selectedOption) {
      case 'celsius-to-fahrenheit':
        calcText = suhu +" * (9/5) + 32 = " + outputSuhu.value;
        break;
      case 'fahrenheit-to-celsius':
        calcText = "("+ suhu +" - 32) * (5/9) = " + outputSuhu.value;
        break;
    }

    if (outputSuhu.value === "Tidak ada hasil") {
      kalkulasi.value = "Tidak ada hasil";
      document.getElementById("message").innerHTML = "required field !";
    } else {
      kalkulasi.value = calcText;
      document.getElementById("message").innerHTML = "";
    }
    
}

function tampilkanRumus() {
  const selectedOption = jenisKonversi.value;
  let instruksi = document.getElementById("instruksi");
  let labelInput = document.getElementById("labelInput");
  let labelHasil = document.getElementById("labelHasil");
  let keterangan = document.getElementById("keterangan");
  let descRumus = document.getElementById("descRumus");
  let rumus = document.getElementById("rumus");

  let desc, rumusText,instruksiText,labelInputText,labelHasilText,ket;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      instruksiText = "Masukkan suhu derajat Celcius (&deg;C) ke kotak dibawah, lalu klik tombol konversi untuk mendapatkan hasil konversi dalam bentuk Fahrenheit (&deg;F).";
      labelInputText="Celcius (&deg;C)"
      labelHasilText="Fahrenheit (&deg;F)";
      ket='<h3>Cara Konversi Dari Celsius (&deg;C) ke Fahrenheit (&deg;F)</h3><hr>';
      desc='Suhu <span style="font-weight:600; font-family: math; font-style: italic; font-size: 24px;">S</span> dalam derajat Fahrenheit (&deg;F) sama dengan suhu  <span style="font-weight: 600; font-family: math; font-style: italic; font-size: 24px;">S</span> dalam derajat Celcius (&deg; C) kali 5/9 tambah 32';
      rumusText=' <p style="font-size:24px"><span style="font-weight:600; font-family: math; font-style: italic;">S</span><sub>(&deg;F)</sub> = (<span style="font-weight:600; font-family: math; font-style: italic;"> S</span><sub>(&deg;C) </sub> x 9/5 ) + 32 </p><p>atau</p><p style="font-size:24px"><span style="font-weight:600; font-family: math; font-style: italic;">S</span><sub>(&deg;F)</sub> = (<span style="font-weight:600; font-family: math; font-style: italic;"> S</span><sub>(&deg;C) </sub> x 1.8 ) + 32 </p>';
      break;

    case 'fahrenheit-to-celsius':
      instruksiText = "Masukkan suhu derajat Fahrenheit (&deg;F) ke kotak dibawah, lalu klik tombol konversi untuk mendapatkan hasil konversi dalam bentuk Celcius (&deg;C)."
      labelInputText="Fahrenheit (&deg;F)";
      labelHasilText="Celcius (&deg;C)";
      ket='<h3>Cara Konversi Dari Fahrenheit (&deg;F) ke Celcius (&deg;C)</h3><hr>';
      desc = 'Suhu <span style="font-weight:600; font-family: math; font-style: italic; font-size: 24px;">S</span> dalam derajat Celcius (&deg;C) sama dengan suhu  <span style="font-weight: 600; font-family: math; font-style: italic; font-size: 24px;">S</span> dalam derajat Fahrenheit (&deg; F) dikurangi  32 kemudian kali 5/9';
      rumusText='<p style="font-size:24px"><span style="font-weight:600; font-family: math; font-style: italic;">S</span><sub>(&deg;C)</sub> = (<span style="font-weight:600; font-family: math; font-style: italic;"> S</span><sub>(&deg;F) </sub> - 32 ) x 5/9 </p>';
      break;

  }
  instruksi.innerHTML = instruksiText;
  labelInput.innerHTML = labelInputText;
  labelHasil.innerHTML = labelHasilText;
  keterangan.innerHTML = ket;
  descRumus.innerHTML = desc;
  rumus.innerHTML = rumusText;

}

// init script
// hitungKonversi();
// tampilkanCalc();
tampilkanRumus();

function resetFields() {
  document.getElementById("input-suhu").value = "";
  document.getElementById("hasil-suhu").value = "";
  document.getElementById("how-to-suhu").value = "";
  document.getElementById("message").innerHTML = "";

}