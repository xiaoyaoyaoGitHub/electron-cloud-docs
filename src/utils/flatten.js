export const flattenArr = (arr) => arr.reduce((all, curr, index) => {
    all[curr.id] = curr
    return all
}, {})


export const objToArr = (obj) => Object.keys(obj).map(key => obj[key]) 