import Store from './../flux/store.js';
import ActorHelper from './../utils/actorHelper.js';

/**
 * Player store
 */
const playerStore = Store.CreateStore({
    initState: {
        bullet: true,
        actors: []
    },

    handleAction: {
        LOOP: (state, action) => {
            return {state: state};  
        },

        PLAYER_CREATE: (state, action) => {
            const payload = action.payload;
            state.actors.push(ActorHelper.CreateActor('player', payload.x, payload.y));

            return {state: state};
        },

        PLAYER_MOVE: (state, action) => {
            const payload = action.payload;
            //UGLY
            state.actors[0].dir = payload.dir;
            state.actors[0].speed = 3;
            state.actors[0] = ActorHelper.moveActor(state.actors[0]);
            state.actors[0].speed = 0;

            return {state: state};
        },

        PLAYER_SHOT: (state, action) => {
            const player = state.actors[0];
            const act = (state.bullet) ? {type: 'BULLET_CREATE', payload: {x: player.x + 3, y: player.y - 4}} : null;
            state.bullet = (act) ? false : true;

            return {state: state, action: act};
        },

        BULLET_DESTROYED: (state, action) => {
            state.bullet = true;
            return {state: state};
        },

        DEFAULT: (state, action) => {
            return {state: state};
        }
    }
});

export default playerStore;
