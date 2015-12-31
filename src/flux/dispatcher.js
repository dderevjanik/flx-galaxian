/**
 * Create new dispatcher
 * @param {array} storesToMount - array of stores to mount to dispatcher
 */
const CreateDispatcher = (storesToMount = []) => {
    let stores = storesToMount; // stores mounted to dispatcher, @TODO make Const not Let

    /**
     * Dispatch an action to stores
     * @param {string} action.type - type of action
     * @param {object} action.payload - action payload 
     * @param {fnc} callback - callback function executed after dispatched action
     */
    const dispatch = (action, callback) => {
        let actions = [action]; // @TODO remove

        while(actions.length > 0) {
            const newActions = actions                  // create new actions
                .map(actionToDispatch => stores         // for every action
                    .map(store => store                 // iterate all stores
                        .dispatch(actionToDispatch))    // and dispatch action to them @TODO async
                    .filter(action => action));         // then return new actions
            actions = [].concat.apply([], newActions);  // flatten all ArrayOf[ArraOf[action]]
        }

        // when callback is defined, call store interface
        if (callback) {
            callback(stores.map(store => store.state));
        }
    };

    /**
     * You have to mount store first before dispatching actions
     * @param {object} store - store to be mounted to dispatcher
     * @param {object} store.handleAction - object that handles all actions
     * @param {object} store.initState - object 
     */
    const mount = (store) => {  // @TODO add support for array of Stores
        // throw error if store is already mounted
        if (store in stores) {
            throw new Error(`Can't mount Store to Dispatcher: Store already exists`);
        }
        stores.push(store);
    };

    return {
        mount: mount,
        dispatch: dispatch
    };
};

const dispatcher = {
    CreateDispatcher: CreateDispatcher
};

export default dispatcher;
