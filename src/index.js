import Dispatcher from './flux/dispatcher.js';
import enemiesStore from './stores/enemies.store.js';
import playerStore from './stores/player.store.js';
import bulletsStore from './stores/bullets.store.js';
import gameStore from './stores/game.store.js';
import CanvasHelper from './utils/canvasHelper.js';
import StoreHelper from './utils/storeHelper.js';
import LevelHelper from './utils/levelHelper.js';
import Config from './data/config.json';
import FirstLevel from './data/levels/lvl01.json';

const maxFps = Config.maxFps;
const dispatcher = Dispatcher.CreateDispatcher([enemiesStore, playerStore, bulletsStore, gameStore]);

let keyPressed = null;
let canvas = null;

const loop = () => {
    // Dispatch action
    dispatcher.dispatch({type: 'LOOP', payload: {key: keyPressed}}, stores => { 
        canvas.clear();
        StoreHelper.renderStores(canvas, stores);
    });

    // Clean keypress
    if (keyPressed) {keyPressed = null;}

    // Recur
    setTimeout(loop, 1000/maxFps);
}

const init = () => {
    // create enemies based on level
    LevelHelper.loadLevel(FirstLevel).forEach(action => {
        dispatcher.dispatch(action);
    });

    // create player actor
    dispatcher.dispatch({type: 'PLAYER_CREATE', payload: {type: 'player', x: 50, y: 160}});

    document.addEventListener( "keypress", (keyEvent) => {keyPressed = keyEvent.keyCode});
}

// Create canvas, promise->then (because of loading src from url)
CanvasHelper.CreateCanvas(Config.canvasId,
                          Config.canvasWidth,
                          Config.canvasHeight,
                          Config.canvasBackground, 
                          Config.spritesSrc).then(canv => {
    canvas = canv;
    init();
    loop();
});
