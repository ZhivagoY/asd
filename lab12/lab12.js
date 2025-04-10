function knapsack(weights, values, capacity) {
    const n = weights.length;
    // Инициализация массива для хранения максимальных стоимостей
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < n; i++) {
        // Обход в обратном порядке для избежания перезаписи
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

// Пример использования:
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 5;

console.log("Максимальная стоимость:", knapsack(weights, values, capacity)); // Вернет 7 (предметы 0 и 1)