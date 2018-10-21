class Generate {
  static report() {
    console.log(`/////////////////////////`)
    console.log(`:::::::::::::::::::::::::`)
    console.log(`CITY REPORT :`)
    console.log(`:::::::::::::::::::::::::`)
    console.log(city)
    // console.log(`City Name : `)
    // console.log(city.get_name)
    // console.log(`City Streets : `)
    // console.table(city.get_streets)
    // console.log(`City Houses : `)
    // console.table(city.get_houses)
    // console.log(`City Residents : `)
    // console.table(city.get_residents)
    console.log(`:::::::::::::::::::::::::`)

    console.log(`/////////////////////////`)
    console.log(`/////////////////////////`)
  }

  static getDatas() {
    // Fetch method used for SWAPI.
    let people = fetch('https://swapi.co/api/people/')
    .then(res => res.json())
    .then(function(data){
        return data.results
    })
    .catch( e => console.log(e) )
    people.then(data => console.log(data))
    return people
  }
  
  static streets(number) {
    let streets = []
    for (let i=0;i<number;i++) { 
      streets.push(new Street())
    }
    return streets
  }

  static streets_suffixes() {
    return ['Street','Avenue','Road']
  }
  
  static houses(number) {
    let houses = []
    for (let i=0; i<number; i++) { 
      houses.push(new House())
    }
    return houses
  }
// some_city.get_streets[Math.floor(Math.random() * some_city.get_streets.lengths)]

  static residents(number) {
    let residents = []
    for (let i=0;i<number;i++) {
      residents.push(new Resident())
    }
    return residents
  }

  static job() {
    const jobs = ['Electricien','Plombier','Infirmier','Conducteur d\'engins','Dentiste','Pompier','Gendarme','Informaticien','Policier','Docteur','Boulanger','Bibliothèquère']
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
        content:[],
        get_content: () => ( this.content ),
        set_content: (letters) => { this.content = letters },
        add_content: (letter) => { this.content.push(letter) }
      }
    }
    
    this.init()
  }
  // Accesseurs
  get get_name() { return this.name }
  set set_name(name) { this.name = name }

  get get_streets() { return this.streets }
  set set_streets(streets) { this.streets = streets }
  set add_street(street) { this.streets = [...this.streets, street] }

  get get_houses() { return this.houses }
  set set_houses(houses) { this.houses = houses }
  set add_house(house) { this.houses = [...this.houses, house] }

  get get_residents() { return this.residents }
  set set_residents(residents) { this.residents = residents }
  set add_resident(resident) { this.residents = [...this.residents, resident] }

  get get_postman() { return this.postman }
  set set_postman(postman) { this.postman = postman }

  //initialisation de la ville :
  init(streets_number, houses_number, residents_number) {
    this.set_name = faker.address.city()
    this.set_streets = Generate.streets(streets_number)
    this.set_houses = Generate.houses(houses_number)
    this.set_residents = Generate.residents(residents_number)
    this.set_postman = new Postman()
  }
}

class Street {
  constructor(name) {
    this.name = `${faker.address.streetName()} ${Generate.streets_suffixes()[Math.floor(Math.random() * Generate.streets_suffixes().length)]}`
    this.houses = []
  }
  get get_name() { return this.name }
  set set_name(name) { this.name = name }
  get get_houses() { return this.houses }
  set add_house(house) { this.houses = [...this.houses, house] }
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
      content:[],
      get_content: () => ( this.content ),
      set_content: (letters) => { this.content = letters },
      add_content: (letter) => { this.content.push(letter) }
    }

    //   document.getElementById('body').innerHTML += `
    //   <img class="house-i" src="http://www.xn--icne-wqa.com/images/icones/6/0/go-home-5.png" alt="house"/>
    // `
  }
  get get_residents() { return this.residents }
  set set_residents(residents) { this.residents = residents }
  set add_resident(resident) { this.residents = [...this.residents, resident] }
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
      content:[],

    }
    // this.start_tour
  }

  start_tour() {
    console.log(`This is postman "${this.firstName} ${this.lastName}". \n Starting my mission`)
  }

  get_mail_from_postoffice() {

  }
}

class Resident extends People {
  constructor(firstName, lastName, sex, status) {
    super(firstName, lastName, sex, status)
    this.job = Generate.job()
    this.house = ''
  }
}
