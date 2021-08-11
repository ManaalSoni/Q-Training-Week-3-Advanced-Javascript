const battleData = require('./Q1Data')

let attacker_king ={}
let defender_king = {}
let region = {}
let name = {}

let win = 0
let loss = 0

let battle_type = []
let defender_size = []

battleData.forEach(battle => {
    attacker_king[battle['attacker_king']] = attacker_king[battle['attacker_king']] ? attacker_king[battle['attacker_king']] + 1 : 1;
    defender_king[battle['defender_king']] = defender_king[battle['defender_king']] ? defender_king[battle['defender_king']] + 1 : 1;
    region[battle['region']] = region[battle['region']] ? region[battle['region']] + 1 : 1;
    name[battle['name']] = name[battle['name']] ? name[battle['name']] + 1 : 1;

    if(battle['attacker_outcome']=='win')
        win++
    else
        loss++
    
    if(battle_type.includes(battle['battle_type'])!=true && battle['battle_type']!='')
    battle_type.push(battle['battle_type'])

    defender_size.push(battle['defender_size'])

})

let output = {
    'most_active':{
        'attacker_king' : Object.keys(attacker_king).reduce((a, b) => attacker_king[a] > attacker_king[b] ? a : b),
        'defender_king' : Object.keys(defender_king).reduce((a, b) => defender_king[a] > defender_king[b] ? a : b),
        'region' : Object.keys(region).reduce((a, b) => region[a] > region[b] ? a : b),
        'name': Object.keys(name).reduce((a, b) => name[a] > name[b] ? a : b)
    },
    'attacker_outcome':{
        'win': win, // total win
        'loss':loss // total loss
    },
    'battle_type':battle_type, // unique battle types
    'defender_size':{
        'average': defender_size.reduce((sum, current) => sum + current, 0)/defender_size.length,
        'min': Math.max.apply(Math, defender_size),
        'max': Math.min.apply(Math, defender_size)
        }
    }
// console.log(attacker_king)
// console.log(defender_king)
// console.log(region)
// console.log(name)
// console.log(defender_size)
console.log(output)