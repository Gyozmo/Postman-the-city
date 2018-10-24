class Generate {
  static report() {
    console.log(`/////////////////////////`)
    console.log(`:::::::::::::::::::::::::`)
    console.log(`CITY REPORT :`)
    console.log(`:::::::::::::::::::::::::`)
    console.log(city)
    console.log(`:::::::::::::::::::::::::`)
    console.log(`/////////////////////////`)
    document.getElementById("CityName").innerText = city.name
    document.getElementById("houseCount").innerText = city.houses.length
    document.getElementById("lettersCount").innerText = city.letters.length
    document.getElementById("streetsCount").innerText = city.streets.length

  }

  static getDatas() {
    // Fetch method used for SWAPI.
    let people = fetch('https://swapi.co/api/people/')
      .then(res => res.json())
      .then(function (data) {
        return data.results
      })
      .catch(e => console.log(e))
    people.then(data => console.log(data))
    return people
  }

  static streets(number) {
    let streets = []
    for (let i = 0; i < number; i++) {
      streets.push(new Street())
    }
    return streets
  }

  static streets_suffixes() {
    return ['Street', 'Avenue', 'Road']
  }

  static houses(number) {
    let houses = []
    for (let i = 0; i < number; i++) {
      houses.push(new House())
    }
    return houses
  }
  // some_city.get_streets[Math.floor(Math.random() * some_city.get_streets.lengths)]

  static residents(number) {
    let residents = []
    for (let i = 0; i < number; i++) {
      residents.push(new Resident())
    }
    return residents
  }

  static letters(number) {
    let letters = []
    for (let i = 0; i < number; i++) {
      let house = city.houses[Math.floor(Math.random() * city.houses.length)]
      let address = `${house.number} ${house.street}`
      let content = faker.lorem.paragraph()
      letters.push(new Letter(address, content))
    }
    return letters
  }

  static job() {
    const jobs = ['Electricien', 'Plombier', 'Infirmier', 'Conducteur d\'engins', 'Dentiste', 'Pompier', 'Gendarme', 'Informaticien', 'Policier', 'Docteur', 'Boulanger', 'Bibliothèquère']
    return jobs[Math.floor(Math.random() * jobs.length)]
  }
}

class City {
  // Constructeur
  constructor() {
    this.name = ''
    this.streets = []
    this.houses = []
    this.residents = []

    this.postman = []
    this.postOffice = {
      mailBox: {
        content: [],
        get_content: () => (this.postOffice.mailBox.content),
        set_content: (letters) => {
          this.postOffice.mailBox.content = letters
        },
        add_content: (letter) => {
          this.postOffice.mailBox.content.push(letter)
        }
      }
    }
    this.letters = []

    this.init()
  }
  // Accesseurs
  get get_name() {
    return this.name
  }
  set set_name(name) {
    this.name = name
  }

  get get_streets() {
    return this.streets
  }
  set set_streets(streets) {
    this.streets = streets
  }
  set add_street(street) {
    this.streets = [...this.streets, street]
  }

  get get_houses() {
    return this.houses
  }
  set set_houses(houses) {
    this.houses = houses
  }
  set add_house(house) {
    this.houses = [...this.houses, house]
  }

  get get_residents() {
    return this.residents
  }
  set set_residents(residents) {
    this.residents = residents
  }
  set add_resident(resident) {
    this.residents = [...this.residents, resident]
  }

  get get_postman() {
    return this.postman
  }
  set set_postman(postman) {
    this.postman = postman
  }

  get get_letters() {
    return this.letters
  }
  set set_letters(letters) {
    this.letters = letters
  }

  //initialisation de la ville :
  init(streets_number, houses_number, residents_number, letters_number) {
    this.set_name = faker.address.city()
    this.set_streets = Generate.streets(streets_number)
    this.set_houses = Generate.houses(houses_number)
    this.set_residents = Generate.residents(residents_number)
    this.set_postman = new Postman()
    this.set_letters = Generate.letters(letters_number)
    this.postOffice.mailBox.set_content(this.get_letters)
  }
}

class Street {
  constructor(name) {
    this.name = `${faker.address.streetName()} ${Generate.streets_suffixes()[Math.floor(Math.random() * Generate.streets_suffixes().length)]}`
    this.houses = []
  }
  get get_name() {
    return this.name
  }
  set set_name(name) {
    this.name = name
  }
  get get_houses() {
    return this.houses
  }
  set add_house(house) {
    this.houses = [...this.houses, house]
  }
}

class House {
  constructor() {
    const streets = city.get_streets
    const street = streets[Math.floor(Math.random() * streets.length)]
    street.add_house = this

    this.number = street.get_houses.length
    this.street = street.get_name

    this.residents = []
    this.mailBox = {
      content: [],
      get_content: () => (this.mailBox.content),
      set_content: (letters) => {
        this.mailBox.content += letters
      },
      add_content: (letter) => {
        this.mailBox.content.push(letter)
      }
    }

    //   document.getElementById('body').innerHTML += `
    //   <img class="house-i" src="http://www.xn--icne-wqa.com/images/icones/6/0/go-home-5.png" alt="house"/>
    // `
  }
  get get_residents() {
    return this.residents
  }
  set set_residents(residents) {
    this.residents = residents
  }
  set add_resident(resident) {
    this.residents = [...this.residents, resident]
  }
}

class People {
  constructor() {
    this.firstName = faker.name.firstName()
    this.lastName = faker.name.lastName()
    this.sex = Math.floor(Math.random() * 2) ? 'Female' : 'Male'
    this.status = 'Alive'
  }
}

class Postman extends People {
  constructor(firstName, lastName, sex, status) {
    super(firstName, lastName, sex, status)
    this.job = 'Postman'

    this.mailBag = {
      content: [],
    }
    // this.start_tour
  }

  start_tour() {
    let tour_count = 0;
    const mailBag_count = this.mailBag.content.length
    if (this.mailBag.content.length > 0) {
      console.log(`/////////////////////////`)
      console.log(`This is postman "${this.firstName} ${this.lastName}". \n 
                    Starting my mission`)
      city.streets.forEach(element => {
        console.log(`:::::::::::::::::::::::::`)
        console.log(`STREET : ${element.name}`)
        element.houses.forEach(house => {
          console.log(`HOUSE : ${house.number} ${house.street}`)
          let house_mail = this.mailBag.content.filter(letter => {
            return letter.address == `${house.number} ${house.street}`
          })
          console.log(`House mail : ${house_mail}`)
          console.log(house_mail)
          if (house_mail.length != 0) {
            console.log(`Il y a du courrier pour cette maison ! \n
                          Je le met dans la boite aux lettres de la maison`)
            tour_count += 1
            house.mailBox.set_content(house_mail)
          } else {
            console.log(`Il n'y a rien pour cette maison`)
          }
        })
      })
      console.log(`/////////////////////////`)
    } else {
      console.log(`Je n'ai pas de courrier ! Je ne peux donc pas entamer la course`)
    }
    console.log(`J'ai fini ma tourné.
                  Lettres déposées : ${tour_count} / ${mailBag_count} : récupérées à la poste`)
  }

  get_mail_from_postoffice() {
    console.log(`Je vais chercher le courrier au bureau de poste ! \n
                  Nombre de lettres : ${city.postOffice.mailBox.get_content().length}`)
    this.mailBag.content = city.postOffice.mailBox.get_content()
  }
}

class Resident extends People {
  constructor(firstName, lastName, sex, status) {
    super(firstName, lastName, sex, status)
    this.job = Generate.job()
    this.house = ''
  }
}

class Letter {
  constructor(address, content) {
    this.people = ''
    this.address = address
    this.content = content
  }

}