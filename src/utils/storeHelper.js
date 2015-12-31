/**
 * Render store actors on canvas
 * @param {object} canvas - on which canvas render
 * @param {object} store - store to render
 */
const renderStore = (canvas, store) => {
    if ('actors' in store) {
        store.actors.forEach(actor => {
            canvas.renderActor(actor);
        });
    }
};

/**
 * Render all stores
 * @param {objet} canvas - on which canvas render
 * @param {array} stores - array of store
 */
const renderStores = (canvas, stores) => {
    stores.forEach(store => {
        renderStore(canvas, store);
    });
};

const storeHelper = {
    renderStore: renderStore,
    renderStores: renderStores
};

export default storeHelper;
