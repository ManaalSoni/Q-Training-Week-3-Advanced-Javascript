const fetch = require('node-fetch');

async function getData(url){
    const response = await fetch(url);
    let data = await response.json();
    let new_data = data.prizes.filter(prize => prize.year >= "2000" && prize.year <= "2019" && prize.category === "chemistry")
    laureates = []
    new_data.forEach(people => {
        people.laureates.forEach(person => {
            laureates.push(person.firstname + ' '+ person.surname)
        })
    });
    console.log(laureates)
    }
    
const link = 'http://api.nobelprize.org/v1/prize.json'
getData(link)