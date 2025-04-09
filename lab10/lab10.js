function eggDrop(eggs, floors) {
    let dp = Array.from({ length: eggs + 1 }, () => Array.from({ length: floors + 1 }, () => 0));

    // Базовые случаи
    for (let i = 1; i <= eggs; i++) {
        dp[i][1] = 1; // Для одного этажа нужно одно бросание
        dp[i][0] = 0; // Для нуля этажей бросаний не нужно
    }

    for (let j = 1; j <= floors; j++) {
        dp[1][j] = j; // Для одного яйца нужно j бросаний
    }

    // Заполнение таблицы динамического программирования
    for (let i = 2; i <= eggs; i++) {
        for (let j = 2; j <= floors; j++) {
            dp[i][j] = Infinity;
            for (let x = 1; x <= j; x++) {
                // Вычисление минимального количества бросков
                let res = 1 + Math.max(dp[i - 1][x - 1], dp[i][j - x]);
                if (res < dp[i][j]) {
                    dp[i][j] = res;
                }
            }
        }
    }

    return dp[eggs][floors];
}

// Пример использования:
const eggs = 2; // Количество яиц
const floors = 100; // Количество этажей
console.log("Минимальное количество бросков:", eggDrop(eggs, floors));