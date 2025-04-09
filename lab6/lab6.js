function rabinKarpSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const d = 256; // Количество возможных символов
    const q = 101; // Простое число для модуляции
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
  
    // Вычисляем h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
      h = (h * d) % q;
    }
  
    // Вычисляем хэши для шаблона и первого окна текста
    for (let i = 0; i < m; i++) {
      patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
      textHash = (d * textHash + text.charCodeAt(i)) % q;
    }
  
    let result = [];
  
    // Сравниваем хэши и проверяем совпадение
    for (let i = 0; i <= n - m; i++) {
      if (patternHash === textHash) {
        let match = true;
        for (let j = 0; j < m; j++) {
          if (text[i + j] !== pattern[j]) {
            match = false;
            break;
          }
        }
        if (match) {
          result.push(i);
        }
      }
  
      // Вычисляем хэш для следующего окна
      if (i < n - m) {
        textHash = (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
        if (textHash < 0) {
          textHash += q;
        }
      }
    }
  
    return result;
  }
  
  // Пример использования
  const text = "xyzabcabc";
  const pattern = "abc";
  const positions = rabinKarpSearch(text, pattern);
  console.log(`Образец найден в позициях: ${positions}`);
  