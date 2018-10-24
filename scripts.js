let streets_number = document.getElementById("setStreetsNumber").value
const houses_number = streets_number * 5
const residents_number = Math.round(houses_number * 1.25)
let letters_number = Math.round(Math.random() * residents_number)

// Instanciation de la nouvelle ville
let city = new City()
// Déclenchement de la méthode d'initialisation de la ville
city.init(streets_number, houses_number, residents_number, letters_number)
// Créer un report pour pouvoir surveiller la génération de la ville



const report = () => {
Generate.report()
city.init(streets_number, houses_number, residents_number, letters_number)
}

// Déclenchement du facteur

