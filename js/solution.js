(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;
    var queuePath = [];
    var mazeQuit = [];
    var validCells = {};
    var checkObject = [{x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0}];


    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function rememberCell(cell) {
        if (!validCells[cell.y]) {
            validCells[cell.y] = {};
        }

        if (!validCells[cell.y][cell.x]) {
            validCells[cell.y][cell.x] = cell;
            return true;
        }
        return false;
    }

    function solution(maze, x, y) {
        // todo: построить правильный маршрут к выходу
        var currentCell = {
            x: x,
            y: y,
            step: 0
        };

        queuePath.push(currentCell);
        rememberCell(currentCell);

        while (queuePath[0]) {
            currentCell = queuePath.shift();
            for (var i = 0; i < 4; i++) {
                var aroundCellX = currentCell.x + checkObject[i].x;
                var aroundCellY = currentCell.y + checkObject[i].y;

                if (maze[aroundCellY] && maze[aroundCellY][aroundCellX] === EMPTY) {
                    var recordCell = {
                        x: aroundCellX,
                        y: aroundCellY,
                        step: currentCell.step + 1
                    };

                    if (rememberCell(recordCell)) {
                        queuePath.push(recordCell);
                    }
                }
            }

            if (!maze[currentCell.y + 1]) {
                mazeQuit.push(currentCell);
            }
        }

        var resultPath = [];
        mazeQuit.forEach(function (item) {
            var prevCell = item;
            resultPath = [];
            resultPath.push(prevCell);

            while (prevCell.x !== x || prevCell.y !== y) {

                for (var i = 0; i < 4; i++) {
                    var aroundCellX = prevCell.x + checkObject[i].x;
                    var aroundCellY = prevCell.y + checkObject[i].y;

                    if (validCells[aroundCellY] && validCells[aroundCellY][aroundCellX] && validCells[aroundCellY][aroundCellX].step === prevCell.step - 1) {
                        resultPath.push(validCells[aroundCellY][aroundCellX]);
                        prevCell = validCells[aroundCellY][aroundCellX];
                        break;
                    }
                }
            }
            resultPath.push({x: x, y: y});
        });


        return resultPath.map(function (item) {
            return [item.x, item.y];
        }).reverse();
    }

    root.maze.solution = solution;
})(this);




