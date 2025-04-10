function binPacking(items, binCapacity) {
    let bins = [];
    let binIndex = 0;

    // Инициализация первого ящика
    bins.push({ items: [], capacity: binCapacity, used: 0 });

    for (let item of items) {
        let placed = false;

        // Поиск подходящего ящика
        for (let i = 0; i < bins.length; i++) {
            if (bins[i].used + item <= bins[i].capacity) {
                bins[i].items.push(item);
                bins[i].used += item;
                placed = true;
                break;
            }
        }

        // Если предмет не поместился в существующие ящики, создаем новый
        if (!placed) {
            bins.push({ items: [item], capacity: binCapacity, used: item });
        }
    }

    return bins;
}

// Пример использования:
const items = [10, 5, 5, 8, 20, 3, 4, 2, 1];
const binCapacity = 30;

const result = binPacking(items, binCapacity);
console.log("Раскладка по ящикам:");
result.forEach((bin, index) => {
    console.log(`Ящик ${index + 1}: ${bin.items.join(', ')}, Использовано: ${bin.used} из ${bin.capacity}`);
});