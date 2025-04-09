function buildTransitionTable(pattern) {
    const alphabet = new Set(pattern);
    const m = pattern.length;
    const transitionTable = Array(m + 1).fill().map(() => ({}));
    
    for (let q = 0; q <= m; q++) {
        for (const c of alphabet) {
            let k = Math.min(m, q + 1);
            while (k > 0 && !(pattern.slice(0, q) + c).endsWith(pattern.slice(0, k))) {
                k--;
            }
            transitionTable[q][c] = k;
        }
    }
    
    return transitionTable;
}

function finiteAutomatonMatcher(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const transitionTable = buildTransitionTable(pattern);
    let q = 0;
    const result = [];
    
    for (let i = 0; i < n; i++) {
        const c = text[i];
        q = transitionTable[q][c] || 0;
        if (q === m) {
            result.push(i - m + 1);
        }
    }
    
    return result;
}

// Пример использования
const text = "abababacababaca";
const pattern = "ababaca";
console.log("Текст:", text);
console.log("Образец:", pattern);
const matches = finiteAutomatonMatcher(text, pattern);
console.log("Найденные совпадения на позициях:", matches);