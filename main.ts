function init () {
    lights = [
        [0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0], 
        [1, 1, 1, 1, 1], 
        [0, 0, 0, 0, 0], 
        [1, 1, 1, 1, 1]
    ];
    
    for (let y = 0; y <= lights.length - 1; y++) {
        for (let x = 0; x <= lights[y].length - 1; x++) {
            if (lights[y][x] == 1) {
                led.plot(x, y)
            }
        }
    }
    g = [[0, 0], [0, 0], [0, 0]]
}
let outOfBounds = false
let rothor = 0
let rotver = 0
let g: Array<Array<number>>;
let lights: Array<Array<number>>;
let _lights: Array<Array<number>>
init()
basic.forever(function () {

    basic.pause(50)

    rotver = input.rotation(Rotation.Pitch)
    rothor = input.rotation(Rotation.Roll)
    g[0][0] = Math.round(rotver / 90)
    g[0][1] = Math.round(rothor / 90)

    if (g[0][0] == 0 && g[0][1] == 0){
        return
    }

    if (g[0][0] == 0) {
        g[1][0] = 1
        g[1][1] = g[0][1]
        g[2][0] = -1
        g[2][1] = g[0][1]
    }
    if (g[0][1] == 0) {
        g[1][0] = g[0][0]
        g[1][1] = 1
        g[2][0] = g[0][0]
        g[2][1] = -1
    }
    if (g[0][0] == 1 && g[0][1] == 1) {
        g[1][0] = 1
        g[1][1] = 0
        g[2][0] = 0
        g[2][1] = 1
    }
    if (g[0][0] == 1 && g[0][1] == -1) {
        g[1][0] = 1
        g[1][1] = 0
        g[2][0] = 0
        g[2][1] = -1
    }
    if (g[0][0] == -1 && g[0][1] == 1) {
        g[1][0] = -1
        g[1][1] = 0
        g[2][0] = 0
        g[2][1] = 1
    }
    if (g[0][0] == -1 && g[0][1] == -1) {
        g[1][0] = -1
        g[1][1] = 0
        g[2][0] = 0
        g[2][1] = -1
    }
    
    _lights = lights
    for (let y2 = 0; y2 <= lights.length - 1; y2++) {
        for (let x2 = 0; x2 <= lights[y2].length - 1; x2++) {
            if (lights[y2][x2] == 0) {
                continue;
            }
            for (let i = 0; i <= g.length - 1; i++) {
                outOfBounds = x2 + g[i][1] > 4 || x2 + g[i][1] < 0 || y2 + g[i][0] > 4 || y2 + g[i][0] < 0
                if (!(outOfBounds)) {
                    if (_lights[y2 + g[i][0]][x2 + g[i][1]] == 0) {
                        _lights[y2 + g[i][0]][x2 + g[i][1]] = 1
                        _lights[y2][x2] = 0
                        led.plot(x2 + g[i][1], y2 + g[i][0])
                        led.unplot(x2, y2)
                        break;
                    }
                }
            }
        }
    }
    console.log(_lights[2]);
lights = _lights
})
