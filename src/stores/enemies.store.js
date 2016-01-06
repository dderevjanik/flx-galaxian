import Store from './../flux/store.js';
import ActorHelper from './../utils/actorHelper.js';

const enemyStore = Store.CreateStore({
    initState: {
        actors: [], // Actors to render
        steps: 0,   // Number of steps
        dir: 0,     // Enemies direction
    },

    handleAction: {
        LOOP: (state, action) => {
            state.actors = state.actors.map(actor => ActorHelper.moveActor(actor));
            state.steps += 1;

            // Every 5 steps, swap direction of enemies
            if (state.steps % 16 === 0) {
                state.dir = 0 + !state.dir;
                return {state: state, action: {type: 'ENEMY_SWAP_DIR', payload: {dir: 0 + !state.dir}}};
            }

            return {state: state};
        },

        ENEMY_SWAP_DIR: (state, action) => {
          state.actors.forEach(actor => {
              actor.dir = action.payload.dir;
          });
          return {state: state};
        },

        ENEMY_CREATE: (state, action) => {
            const payload = action.payload;
            if (!(action.payload.type)) return {state: state};
            state.actors.push(ActorHelper.CreateActor(payload.type, payload.x, payload.y));

            return {state: state, action: {type: 'ENEMY_CREATED'}};
        },

        DEFAULT: (state, action) => {
            return {state: state};
        }
    }
});

export default enemyStore;
