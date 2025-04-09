function computeLPSArray(pattern) {
    const lps = [0]; // Длиннейший бордер (префикс == суффикс) для первого символа всегда 0
    let len = 0; // Длина предыдущего длиннейшего бордера
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function KMPSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPSArray(pattern);
    let i = 0; // Индекс для текста
    let j = 0; // Индекс для образца
    const result = [];

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

// Пример использования
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
console.log("Текст:", text);
console.log("Образец:", pattern);
const matches = KMPSearch(text, pattern);
console.log("Найденные совпадения на позициях:", matches);