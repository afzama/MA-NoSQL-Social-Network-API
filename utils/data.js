const userName = [
    'adventureJunkie',
    'shaquille.oatmeal',
    'hoosier-daddy',
    'fast&curious',
    'JoeThanos',
    'Queen-Daenerys-4eva',
    'BenJohnson',
    'Regina-Phalange',
    'KenAdams',
    'JohnSmith',
    'OGJohnDoe',
    'Shiva.the.destroyer',
    'babydoodles',
    'cleanclothesready',
    'GreenEggs&Ham',
    'jimJohnson',
    'kim_chi',
    'FrostedCupcake',
    'ElonNOTMusk',
    'personallyvictimizedbyreginageorge',
    'Jason.Moore'
];

const thought = [
  'Dont watch us, we are doing a cold plunge',
  'The pessimist sees difficulty in every opportunity. The optimist seeds opportunity in every difficulty.',
  'On my way to the airport, vacation here I come!',
  'Develop healthy habits everyday',
  'Rewatching GoT from the beginning',
  'Its steak time!',
  'Renovations have began starting with the washrooms!',
  'New Year, New Clean routine!',
  'Getting my puppy today, and could not be more excited',
  'Meeting my tattoo artist for a new add-on, stay tuned.',
  'Inflation hitting me hard, this grocery trip was 1/3 of the cost last year.',
  'Woke up to a snowy wonderland, lets go taboganing!',
  'Finished up my workout for the day! #startearly',
  'Baked a delicious fruitcake, time to dig in.',
  'Bought the New Air Jordan 14s today!',
  'Canadas Wonderland, here we come.',
  'Lets go to the ex!',
  'Tswift for life, off the waitlist and got tickets.',
  'Holiday family moments - ice skating at nathan philips square today!',
  'Picked up my copy of Manatee101',
  'Its tea time!',
  'Spa day with my bestie! Lets go.'
];

// Gets a random userName
const getRandomUserName = () =>
  `${getRandomArrItem(userName)}`;

//Get a random thought
const getRandomThought = () =>
  `${getRandomArrItem(thought)}`;

module.exports = {
  getRandomUserName,
  getRandomThought
};