import FncHelper from './fncHelper.js';

/**
 * Create actions from JSON to build a level
 * @param {json} levelJSON - json file that describes a level
 * @return {array} array of actions to create level
 */
const loadLevel = (levelJSON) => {
    return FncHelper.flatten(levelJSON.enemies.map( (row, y) => 
        row.map( (actorType, x) => 
            ({type: 'ENEMY_CREATE', payload: {type: actorType, x: x * 20, y: y * 20}}))
    ))
};

const levelHelper = {
    loadLevel: loadLevel
};

export default levelHelper;
