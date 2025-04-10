function isSafe(graph, colors, node, color) {
    // Проверяем, что смежные вершины не имеют того же цвета
    for (let neighbor = 0; neighbor < graph.length; neighbor++) {
        if (graph[node][neighbor] === 1 && colors[neighbor] === color) {
            return false;
        }
    }
    return true;
}

function graphColoringUtil(graph, m, colors, node) {
    // Все вершины окрашены
    if (node === graph.length) {
        return true;
    }

    // Пробуем все цвета от 1 до m (включительно)
    for (let color = 1; color <= m; color++) {
        if (isSafe(graph, colors, node, color)) {
            colors[node] = color;
            if (graphColoringUtil(graph, m, colors, node + 1)) {
                return true;
            }
            colors[node] = 0; // Откат
        }
    }
    return false;
}

function graphColoring(graph, m) {
    const colors = new Array(graph.length).fill(0);
    
    if (!graphColoringUtil(graph, m, colors, 0)) {
        console.log("Раскраска невозможна с", m, "цветами");
        return null;
    }
    
    console.log("Раскраска возможна. Цвета вершин:");
    colors.forEach((color, index) => {
        console.log(`Вершина ${index}: цвет ${color}`);
    });
    return colors;
}

// Пример использования:
const graph = [
    [0, 1, 1, 1], // Матрица смежности (4 вершины)
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
const m = 3; // Максимальное количество цветов

graphColoring(graph, m);
