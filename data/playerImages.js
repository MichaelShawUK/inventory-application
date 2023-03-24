const playerImages = [
  {
    name: "Karim Benzema",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/165153.png",
  },
  {
    name: "Robert Lewandowski",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/188545.png",
  },
  {
    name: "Kylian Mbappe",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/231747.png",
  },
  {
    name: "Kevin De Bruyne",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/192985.png",
  },
  {
    name: "Lionel Messi",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/158023.png",
  },
  {
    name: "Mohammed Salah",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/209331.png",
  },
  {
    name: "Virgil Van Dijk",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/203376.png",
  },
  {
    name: "Thibaut Courtois",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/192119.png",
  },
  {
    name: "Manuel Neuer",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/167495.png",
  },
  {
    name: "Neymar",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/190871.png",
  },
  {
    name: "Heung Min Son",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/200104.png",
  },
  {
    name: "Sadio Mane",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/208722.png",
  },
  {
    name: "Joshua Kimmich",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/212622.png",
  },
  {
    name: "Casemiro",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/200145.png",
  },
  {
    name: "Alisson",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/212831.png",
  },
  {
    name: "Harry Kane",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/202126.png",
  },
  {
    name: "Ederson",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/210257.png",
  },
  {
    name: "Ngolo Kante",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/215914.png",
  },
  {
    name: "Jan Oblak",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/200389.png",
  },
  {
    name: "Erling Haaland",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/239085.png",
  },
  {
    name: "Toni Kroos",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/182521.png",
  },
  {
    name: "Marquinhos",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/207865.png",
  },
  {
    name: "Luka Modrid",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/177003.png",
  },
  {
    name: "Joao Cancelo",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/210514.png",
  },
  {
    name: "Ruben Dias",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/239818.png",
  },
  {
    name: "Gianluigi Donnarumma",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/230621.png",
  },
  {
    name: "Bernado Silva",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/218667.png",
  },
  {
    name: "Ter Stegen",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/192448.png",
  },
  {
    name: "Fabinho",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/209499.png",
  },
  {
    name: "Thomas Muller",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/189596.png",
  },
  {
    name: "Rodri",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/231866.png",
  },
  {
    name: "Antonio Rudiger",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/205452.png",
  },
  {
    name: "Andy Robertson",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/216267.png",
  },
  {
    name: "Kalidou Koulibaly",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/201024.png",
  },
  {
    name: "Frenkie De Jong",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/228702.png",
  },
  {
    name: "Marco Verratti",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/199556.png",
  },
  {
    name: "Leon Goretzka",
    url: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/209658.png",
  },
];

module.exports = playerImages;
