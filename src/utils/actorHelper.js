import Sprites from './../data/sprites.json';
import Actors from './../data/actors.json';

/**
 * Move actor
 * @param {object} actor - which actor move
 * @param {number} actor.dir - direction
 * @param {number} actor.x - position
 * @param {number} actor.y - position
 * @param {number} actor.speed - how many pixels
 * @return {object} actor - with new position
 */
const moveActor = (actor) => {
    const act = Object.create(actor);
    switch(actor.dir) {
        case 2: // Up
            act.y -= actor.speed;
            return act;
        case 1: // Right
            act.x += actor.speed;
            return act;
        case 3 : // Down
            act.y += actor.speed;
            return act;
        case 0: // Left
            act.x -= actor.speed;
            return act;
    }
};

/**
 * Create actor
 * @param {string} type - actor type, check actors.json
 * @param {number} x - position
 * @param {number} y - position
 * @param {object} overide - overide actor default config, check actors.json
 * @return {object} actor
 */
const CreateActor = (type, x, y, overide) => {
    // @TODO overide doesn't work, remove or finish it
    if (!(type in Sprites)) {
        throw new Error(`Can't init Actor: bad type '${type}'`);
    }
    if (!(Actors[type].sprite in Sprites)) {
        throw new Error(`Can't init Actor: sprite '${Actors[type].sprite}' doesn't exists`);
    }

    const actor = Object.create(Actors[type]);
    actor.sprite = Sprites[actor.sprite];
    actor.x = x;
    actor.y = y;

    return actor;
};

const actorHelper = {
    moveActor: moveActor,
    CreateActor: CreateActor
};

export default actorHelper;
