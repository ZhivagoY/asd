// Функция для вычисления ориентации трех точек
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    return val > 0 ? 1 : val < 0 ? -1 : 0; // 1: правый поворот, -1: левый поворот, 0: коллинеарные точки
  }
  
  // Главная функция для построения выпуклой оболочки
  function convexHull(points) {
    if (points.length < 3) {
      console.log("Выпуклая оболочка не существует — недостаточно точек.");
      return [];
    }
  
    // Находим точку с минимальной y-координатой (и самой правой при равенстве y)
    const startPoint = points.reduce((minPoint, point) =>
      point.y < minPoint.y || (point.y === minPoint.y && point.x > minPoint.x)
        ? point
        : minPoint
    );
  
    // Сортируем точки по полярному углу относительно стартовой точки
    points.sort((a, b) => {
      const orient = orientation(startPoint, a, b);
      if (orient === 0) {
        // Если точки коллинеарны, сортируем по расстоянию от начальной точки
        return Math.sqrt((startPoint.x - a.x) ** 2 + (startPoint.y - a.y) ** 2) -
               Math.sqrt((startPoint.x - b.x) ** 2 + (startPoint.y - b.y) ** 2);
      }
      return orient === -1 ? -1 : 1; // Левый поворот имеет приоритет
    });
  
    // Используем стек для построения выпуклой оболочки
    const hull = [];
    
    for (const point of points) {
      while (
        hull.length >= 2 &&
        orientation(hull[hull.length - 2], hull[hull.length - 1], point) !== -1
      ) {
        hull.pop(); // Удаляем точки, если они образуют правый поворот
      }
      hull.push(point); // Добавляем текущую точку в оболочку
    }
  
    return hull;
  }
  
  // Пример использования:
  const points = [
    { x: 10, y: 20 },
    { x: 60, y: 160 },
    { x: 110, y: 20 },
    { x: -60, y: 80 },
    { x: 70, y: 140 },
  ];
  
  const result = convexHull(points);
  console.log("Выпуклая оболочка:", result);