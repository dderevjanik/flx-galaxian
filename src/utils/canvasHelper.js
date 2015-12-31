import ImageHelper from './imageHelper.js';

/**
 * Create canvas object
 * @param {string} canvasId - canvas element id
 * @param {number} canvasWidth - canvas width
 * @param {number} canvasHeight - canvas height
 * @param {string} canvasBckg - canvas background
 * @param {string} spritesSrc - path to sprites image
 * @return {object} canvas object
 */
const CreateCanvas = (canvasId, canvasWidth, canvasHeight, canvasBckg, spritesSrc) => {

    const id = canvasId;

    const canvasHtml = document.getElementById(id);
    const canvasCtx = canvasHtml.getContext("2d");
    const background = canvasBckg;
    const sprites = ImageHelper.loadImage(spritesSrc);

    canvasHtml.width = canvasWidth ? canvasWidth : canvasHtml.width;
    canvasHtml.height = canvasHeight ? canvasHeight : canvasHtml.height;

    /**
     * Will render actor 
     * @param {object} actor - from actorHelper.js
     */
    const renderActor = (actor) => {
        canvasCtx.drawImage(sprites, 
            actor.sprite.x, 
            actor.sprite.y, 
            actor.sprite.w,
            actor.sprite.h,
            actor.x,
            actor.y,
            actor.sprite.w,
            actor.sprite.h);
    };

    /**
     * Clear Canvas
     */
    const clear = () => {
        canvasCtx.fillStyle = background;
        canvasCtx.fillRect(0, 0, canvasHtml.width, canvasHtml.height);
    };

    // need to wait for sprites load
    return new Promise((resolve, reject) => {
        sprites.onload = () => {
            resolve({
                clear: clear,
                renderActor: renderActor
            });
        };
    });
};

const canvasHelper = {
    CreateCanvas: CreateCanvas
};

export default canvasHelper;
