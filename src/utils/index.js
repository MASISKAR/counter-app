function getRandomNumber(){
    return Math.floor(Math.random() * 100);
}

function getUniqueId(){
    return Math.random().toString(32)+Date.now().toString(32);
}

export {getRandomNumber, getUniqueId};
