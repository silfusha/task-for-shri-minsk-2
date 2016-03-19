(function (root) {
    var map = root.maze.MAZE_51;
    var path = root.maze.solution(map, 1, 0);

    document.querySelector('.outer').appendChild(
        root.maze.render(map, path)
    );

    function renderPath(path) {
        var mazeElement = document.querySelector('.maze');
        var i = 0;
        setTimeout(function tick() {
            if (i !== 0) {
                mazeElement.childNodes[path[i - 1][1]].childNodes[path[i - 1][0]].classList.remove('maze__cell_current');
                mazeElement.childNodes[path[i - 1][1]].childNodes[path[i - 1][0]].classList.add('maze__cell_path');
            }

            mazeElement.childNodes[path[i][1]].childNodes[path[i][0]].classList.add('maze__cell_current');
            i++;
            if (path[i]) {
                setTimeout(tick, 100);
            }
        }, 100);
    }

    renderPath(path);

})(this);
