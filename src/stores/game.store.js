import Store from './../flux/store.js';
import KeyHelper from './../utils/keyHelper.js';

const gameStore = Store.CreateStore({
    initState: {
    },

    handleAction: {
        LOOP: (state, action) => {
            const key = action.payload.key;
            const act = (key) ? KeyHelper.getProperAction(key) : null;
            return {state: state, action: act};
        },

        DEFAULT: (state, action) => {
            return {state: state};
        }
    }
});

export default gameStore;
