function addPoniesNormal(ponies) {
    poniesInRace = [];    
    for (var i = 0; i < arguments.length; i++) {
    poniesInRace.push(arguments[i]);
    }
    console.log(poniesInRace);
}

function addPoniesSpread(...ponies) {
    poniesInRace = [];
    for (let pony of ponies) {
    poniesInRace.push(pony);
    }
    console.log(poniesInRace);
}

addPoniesNormal('Rainbow Dash', 'Pinkie Pie');
addPoniesSpread('Rainbow Dash', 'Pinkie Pie');