const myObject = {
  myName: 'John',
  lastName: 'Doe',
  location: 'Earth',
  email: 'jd@earth.com',
}

console.log(myObject)

myObject.newObject = {
  something: ['new', 'is', 'here'],
}

console.log(myObject)

const { something } = myObject.newObject

console.log(something)
