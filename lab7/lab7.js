function getMaxSubSum(arr) {
    let maxSum = 0; // Максимальная сумма на данный момент
    let partialSum = 0; // Частичная сумма подмассива

    for (let item of arr) {
        partialSum += item; // Добавляем текущий элемент к частичной сумме
        maxSum = Math.max(maxSum, partialSum); // Обновляем максимальную сумму

        if (partialSum < 0) partialSum = 0; // Если частичная сумма отрицательна, сбрасываем её
    }

    return maxSum;
}

// Пример использования:
const arrayExample = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(getMaxSubSum(arrayExample)); // Вернет 6
