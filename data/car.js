class Car {
    brand;
    model;
    speed = 0;
    constructor(carDetails){
      this.brand = carDetails.brand
      this.model = carDetails.model
      this.displayInfo()
      this.go()
      this.displayInfo()
      setTimeout(() => {
        this.break()
        this.displayInfo()
      }, 200);
    }
    displayInfo(){
       return console.log(`${this.brand}-${this.model} Speed:${this.speed} km/h`)
    }
    go(){
      this.speed+=5
    }
    break(){
      this.speed-=5
    }
  }
  const vehicle = [{
    brand:'Toyota',
    model:'Corolla'
    
    },
    {
    brand:'Tesla',
    model:'Model 3'
    }].map((carDetails)=>{
      return new Car(carDetails)
    })

  

    
