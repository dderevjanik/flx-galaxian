import Store from './../flux/store.js';
import ActorHelper from './../utils/actorHelper.js';

const bulletStore = Store.CreateStore({
    initState: {
        actors: []
    },

    handleAction: {
        LOOP: (state, action) => {
            state.actors = state.actors.map(actor => ActorHelper.moveActor(actor));
            return {state: state};
        },

        BULLET_CREATE: (state, action) => {
            const payload = action.payload;
            console.log(ActorHelper.CreateActor('bullet', payload.x, payload.y));
            console.log(payload);
            state.actors.push(ActorHelper.CreateActor('bullet', payload.x, payload.y));
            return {state: state};
        },

        DEFAULT: (state, action) => {
            return {state: state};
        }
    }
});

export default bulletStore;
