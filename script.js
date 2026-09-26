document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil Elemen DOM
    const textInput = document.getElementById("textInput");

    const optDoubleSpace = document.getElementById("optDoubleSpace");
    const optTrimLines = document.getElementById("optTrimLines");
    const optEmptyLines = document.getElementById("optEmptyLines");
    const optTabsToSpace = document.getElementById("optTabsToSpace");

    const btnClean = document.getElementById("btnClean");
    const btnCopy = document.getElementById("btnCopy");
    const btnClear = document.getElementById("btnClear");

    const beforeStats = document.getElementById("beforeStats");
    const afterStats = document.getElementById("afterStats");

    // Hitung statistik teks sederhana
    function getStats(text) {
        const charCount = text.length;
        const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        return `${charCount} karakter | ${wordCount} kata`;
    }

    // Update Tampilan Statistik Sebelum
    function updateBeforeStats() {
        beforeStats.textContent = getStats(textInput.value);
    }

    // 2. Logika Pembersihan Teks Utama
    function cleanText() {
        let text = textInput.value;
        if (!text) return;

        // Opsi A: Ubah Tab Menjadi Spasi
        if (optTabsToSpace.checked) {
            text = text.replace(/\t/g, " ");
        }

        // Opsi B: Ubah Spasi Ganda / Berlebih Jadi Spasi Tunggal
        if (optDoubleSpace.checked) {
            text = text.replace(/ {2,}/g, " ");
        }

        // Opsi C: Trim Setiap Baris (Hapus spasi di awal dan akhir tiap baris)
        if (optTrimLines.checked) {
            text = text
                .split("\n")
                .map(line => line.trim())
                .join("\n");
        }

        // Opsi D: Hapus Baris Kosong Berlebih (Maksimal 1 baris kosong berurutan)
        if (optEmptyLines.checked) {
            text = text.replace(/\n\s*\n/g, "\n");
        }

        // Masukkan kembali hasil ke Textarea
        textInput.value = text;

        // Update Statistik Sesudah
        afterStats.textContent = getStats(text);
        updateBeforeStats();
    }

    // 3. Fitur Salin Teks ke Clipboard
    function copyText() {
        if (!textInput.value) return;

        navigator.clipboard.writeText(textInput.value).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = "Tersalin! ✓";
            btnCopy.style.backgroundColor = "#0284c7";

            setTimeout(() => {
                btnCopy.textContent = originalText;
                btnCopy.style.backgroundColor = "#16a34a";
            }, 1500);
        });
    }

    // 4. Fitur Hapus Semua
    function clearText() {
        textInput.value = "";
        updateBeforeStats();
        afterStats.textContent = "0 karakter | 0 kata";
    }

    // Event Listener
    textInput.addEventListener("input", updateBeforeStats);
    btnClean.addEventListener("click", cleanText);
    btnCopy.addEventListener("click", copyText);
    btnClear.addEventListener("click", clearText);

    // Inisialisasi awal
    updateBeforeStats();
});
