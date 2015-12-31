/**
 * Get action from key ode
 * @param {number} keyCode - code of pressed key
 * @return {object} action
 */
const getProperAction = (keyCode) => {
    switch(keyCode) {
        case 97: // A - Left
            return {type: 'PLAYER_MOVE', payload: {dir: 0}};
        case 100: // D - Right
            return {type: 'PLAYER_MOVE', payload: {dir: 1}};
        case 106: // J - Shoot
            return {type: 'PLAYER_SHOT'};
    };
};

const keyHelper = {
    getProperAction: getProperAction
};

export default keyHelper;
