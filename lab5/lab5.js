function buildSufficsTable(pattern) {
    const revPattern = pattern.split('').reverse().join('');
    const prefix = prefixFunction(revPattern);
    const sufficsTable = new Array(pattern.length + 1).fill(0);
  
    for (let i = 0; i < pattern.length; i++) {
      sufficsTable[pattern.length - i - 1] = pattern.length - prefix[i];
    }
  
    return sufficsTable;
  }
  
  function buildStopTable(pattern) {
    const stopTable = {};
    for (let i = 0; i < pattern.length - 1; i++) {
      stopTable[pattern[i]] = i;
    }
    return stopTable;
  }
  
  function prefixFunction(str) {
    const prefix = new Array(str.length).fill(0);
    let k = 0;
    for (let i = 1; i < str.length; i++) {
      while (k > 0 && str[k] !== str[i]) {
        k = prefix[k - 1];
      }
      if (str[k] === str[i]) {
        k++;
      }
      prefix[i] = k;
    }
    return prefix;
  }
  
  function boyerMooreSearch(text, pattern) {
    const sufficsTable = buildSufficsTable(pattern);
    const stopTable = buildStopTable(pattern);
  
    for (let i = 0; i <= text.length - pattern.length; ) {
      let j = pattern.length - 1;
      while (j >= 0 && pattern[j] === text[i + j]) {
        j--;
      }
      if (j < 0) {
        console.log(`Образец найден в позиции ${i}`);
        i += sufficsTable[0];
      } else {
        const stopSymbol = stopTable[text[i + j]];
        i += Math.max(sufficsTable[j + 1], j - (stopSymbol !== undefined ? stopSymbol : -1));
      }
    }
  }
  
  // Пример использования
  const text = "xyzabcabc";
  const pattern = "abc";
  boyerMooreSearch(text, pattern);
  