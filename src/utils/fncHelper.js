/**
 * @param {array} arr2d - Array of array
 * @return {array} flattened array
 */
const flatten = (arr2d) => [].concat.apply([], arr2d); 

const fncHelper = {
    flatten: flatten
};

export default fncHelper;
