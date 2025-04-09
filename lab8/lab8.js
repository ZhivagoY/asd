function countWaysToMakeChange(coinValues, amount) {
    let ways = new Array(amount + 1).fill(0);
    ways[0] = 1; // Базовый случай: один способ внести сдачу на сумму 0 центов

    for (let coin of new Set(coinValues)) { // Удаляем дубликаты
        for (let i = coin; i <= amount; i++) {
            ways[i] += ways[i - coin];
        }
    }

    return ways[amount];
}

// Пример использования:
const coinValues = [1, 5, 10]; // Номиналы монет
const amount = 10; // Сумма сдачи
console.log(countWaysToMakeChange(coinValues, amount));