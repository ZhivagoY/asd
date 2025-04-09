function lineIntersection(a1, b1, c1, a2, b2, c2) { // Пересечение двух прямых
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-9) return null; // Прямые параллельны
    const x = (b1 * c2 - b2 * c1) / det;
    const y = (a2 * c1 - a1 * c2) / det;
    return { x, y };
}

function lineSegmentIntersection(line, segStart, segEnd) { // Пересечение прямой и отрезка
    const { a, b, c } = lineFromPoints(segStart, segEnd);
    const pt = lineIntersection(line.a, line.b, line.c, a, b, c);
    if (!pt) return null;
    return isPointOnSegment(pt, segStart, segEnd) ? pt : null;
}

function segmentsIntersect(seg1Start, seg1End, seg2Start, seg2End) { // Пересечение двух отрезков
    const line1 = lineFromPoints(seg1Start, seg1End);
    const line2 = lineFromPoints(seg2Start, seg2End);
    const pt = lineIntersection(line1.a, line1.b, line1.c, line2.a, line2.b, line2.c);
    return pt && isPointOnSegment(pt, seg1Start, seg1End) && isPointOnSegment(pt, seg2Start, seg2End);
}

function lineCircleIntersection(line, center, radius) { // Пересечение прямой и окружности
    const A = line.a, B = line.b, C = line.c + (line.a*center.x + line.b*center.y);
    const a = A*A + B*B;
    const b = 2*B*C;
    const c = C*C - A*A*radius*radius;
    const D = b*b - 4*a*c;
    if (D < 0) return [];
    const sqrtD = Math.sqrt(D);
    const y1 = (-b + sqrtD) / (2*a);
    const y2 = (-b - sqrtD) / (2*a);
    const x1 = (B*y1 - C) / A;
    const x2 = (B*y2 - C) / A;
    return [{x: x1, y: y1}, {x: x2, y: y2}].filter(p => !isNaN(p.x));
}

function segmentCircleIntersection(segStart, segEnd, center, radius) { // Пересечение отрезка и окружности
    const line = lineFromPoints(segStart, segEnd);
    return lineCircleIntersection(line, center, radius)
      .filter(pt => isPointOnSegment(pt, segStart, segEnd));
}

function circlesIntersect(c1, c2) { // Пересечение двух окружностей
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    return d < c1.r + c2.r && d > Math.abs(c1.r - c2.r);
}

function lineFromPoints(p1, p2) { // Создание линии по двум точкам
    const a = p2.y - p1.y;
    const b = p1.x - p2.x;
    const c = p2.x*p1.y - p1.x*p2.y;
    return { a, b, c };
}

function isPointOnSegment(pt, segStart, segEnd) { // Проверка принадлежности точки отрезку
    const minX = Math.min(segStart.x, segEnd.x);
    const maxX = Math.max(segStart.x, segEnd.x);
    const minY = Math.min(segStart.y, segEnd.y);
    const maxY = Math.max(segStart.y, segEnd.y);
    return pt.x >= minX && pt.x <= maxX && pt.y >= minY && pt.y <= maxY;
}

function hasNestedTriangles(points) {
    // Генерируем все возможные тройки точек
    const triangles = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        for (let k = j + 1; k < points.length; k++) {
          triangles.push([points[i], points[j], points[k]]);
        }
      }
    }
  
    // Проверяем вложенность каждой пары треугольников
    for (let t1 of triangles) {
      for (let t2 of triangles) {
        if (t1 === t2) continue;
        if (isTriangleInside(t1, t2)) {
          console.log("Треугольник", t1, "вложен в", t2);
          return true;
        }
        if (isTriangleInside(t2, t1)) {
          console.log("Треугольник", t2, "вложен в", t1);
          return true;
        }
      }
    }
    return false;
  }
  
  function isTriangleInside(inner, outer) {
    // Проверяем, что все вершины inner лежат внутри outer
    return inner.every(pt => isPointInTriangle(pt, outer));
  }
  
  function isPointInTriangle(pt, triangle) {
    // Используем метод площадей
    const [A, B, C] = triangle;
  
    const areaABC = triangleArea(A, B, C); // Площадь треугольника ABC
    const areaPBC = triangleArea(pt, B, C); // Площадь треугольника PBC
    const areaPCA = triangleArea(pt, C, A); // Площадь треугольника PCA
    const areaPAB = triangleArea(pt, A, B); // Площадь треугольника PAB
  
    // Если сумма площадей маленьких треугольников равна площади большого — точка внутри
    return Math.abs(areaABC - (areaPBC + areaPCA + areaPAB)) < 1e-9;
  }
  
  function triangleArea(p1, p2, p3) {
    return Math.abs(
      (p1.x * (p2.y - p3.y) +
        p2.x * (p3.y - p1.y) +
        p3.x * (p1.y - p2.y)) /
        2
    );
  }
  
  // Пример использования
  const points = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 0, y: 5 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
  ];
  
  console.log(hasNestedTriangles(points));