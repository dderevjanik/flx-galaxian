/**
 * @param {object} definition
 * @param {object} definition.init
 * @param {object} definition.actionHandler
 * @param {object} definition.interface
 */
const CreateStore = (definition) => {
    let state = definition.initState; // every store has mutable state
    const handleAction = definition.handleAction;

    /**
     * Dispatch action to store
     * @param {object} action - action to dispatch
     * @param {string} action.type - action type
     * @param {object} action.payload - action payload
     * @return {object} new action to dispatch
     */
    const dispatch = (action) => {
        // Call proper action in stores's "actionHandler"
        const callback = (action.type in handleAction) ? handleAction[action.type](state, action) : handleAction.DEFAULT(state, action);

        // Throw error if function didn't return anything
        if (!(callback)) {
            throw new Error(`Dispatch error: ${action.type} isn't defined`);
        }

        // Replace old state with new (returned state from callback)
        state = callback.state; 

        // Return new action disptach
        return callback.action;
    };

    /**
     * Validate store if it's properly defined
     * @param {object} definition - store to validate
     */
    const valid = (definition) => {
        if (!(definition)) {
            throw new Error(`Cannot init Store: store isn't defined`);
        }
        if (!('handleAction' in definition)) {
            throw new Error(`Cannot init Store: 'handleAction' is not defined`);
        }
        if (!('DEFAULT' in definition.handleAction)) {
            throw new Error(`Cannot init Store: 'handleAction' should contain 'DEFAULT' action`);
        }
        if (!('initState' in definition)) {
            throw new Error(`Cannot init Store: 'init' is not defined`);
        }
    };

    // validate store 
    valid(definition);

    return {
        state: state,       // current state of store
        dispatch: dispatch  // method for dispatch action
    };
};

const store = {
    CreateStore: CreateStore
};

export default store;
