// Функция для вычисления расстояния маршрута
function calculateDistance(route, distanceMatrix) {
    // Инициализация переменной для хранения общего расстояния
    let totalDistance = 0;
    
    // Перебор всех городов в маршруте
    for (let i = 0; i < route.length - 1; i++) {
        // Добавление расстояния между текущим и следующим городом
        totalDistance += distanceMatrix[route[i]][route[i + 1]];
    }
    
    // Добавление расстояния от последнего города обратно в первый
    totalDistance += distanceMatrix[route[route.length - 1]][route[0]];
    
    // Возвращение общего расстояния
    return totalDistance;
}

// Функция для поиска кратчайшего маршрута методом полного перебора
function bruteForceTSP(distanceMatrix) {
    // Создание массива городов
    let cities = Array.from({ length: distanceMatrix.length }, (_, i) => i);
    
    // Инициализация переменных для хранения минимального расстояния и лучшего маршрута
    let minDistance = Infinity;
    let bestRoute = null;

    // Функция для генерации всех возможных маршрутов
    function generatePermutations(arr, m = []) {
        // Базовый случай: если массив пуст, значит мы сформировали маршрут
        if (arr.length === 0) {
            // Вычисление расстояния текущего маршрута
            let distance = calculateDistance(m, distanceMatrix);
            
            // Если расстояние меньше текущего минимального, обновляем минимальное расстояние и лучший маршрут
            if (distance < minDistance) {
                minDistance = distance;
                bestRoute = m.slice();
            }
        } else {
            // Рекурсивное формирование всех возможных маршрутов
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                generatePermutations(curr.slice(), m.concat(next));
            }
        }
    }

    // Запуск генерации всех возможных маршрутов
    generatePermutations(cities);
    
    // Возвращение лучшего маршрута и минимального расстояния
    return { bestRoute, minDistance };
}

// Пример использования:
// Матрица расстояний между городами
const distanceMatrix = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

const result = bruteForceTSP(distanceMatrix);
console.log("Лучший маршрут:", result.bestRoute);
console.log("Минимальное расстояние:", result.minDistance);