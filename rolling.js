var Cylon = require('cylon');

// Joystick configuration
var config = __dirname + "/controller.json";

var droneStatus = {
  relativeAltitude: 0
}

Cylon.robot({

  connections: {
    spider: { adaptor: 'rolling-spider', uuid:'e01424eb3d68' },
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    drone: { driver: 'rolling-spider', connection: 'spider' },
    controller: { driver: "joystick", config: config, connection: 'joystick' }
  },

  work: function (my) {

    //my.drone.wheelOn(); add parameter
    my.drone.flatTrim();

    console.log("BatteryLevel:", my.drone.getBatteryLevel());

    console.log(">>> GO! :)");

    my.controller.on("triangle:press", function() {
      console.log("my.drone.takeOff()");
      my.drone.takeOff();
    });

    my.controller.on("x:press", function() {
      console.log("my.drone.land()");
      my.drone.land();
    });    


    my.controller.on("square:press", function() {
      console.log("my.drone.frontFlip()");
      my.drone.frontFlip();
    });    

    my.controller.on("circle:press", function() {
      console.log("my.drone.backFlip()");
      my.drone.backFlip();
    });    


    /*
      client.up({speed: Number, steps: Number})
      client.down({speed: Number, steps: Number})

      Instructs the drone to gain or reduce altitude. 
      speed can be a value from 0 to 100.
    */
    my.controller.on("r2:press", function() { 
      console.log("my.drone.up");
      //my.drone.up({speed:10, steps: 5});
      my.drone.up({steps: 20});
    });   

    my.controller.on("l2:press", function() { 
      console.log("my.drone.down");
      //my.drone.down({speed:10, steps: 5});
      my.drone.down({steps: 20});
    });    

    /*
      client.clockwise({speed: Number, steps: Number})
      client.counterClockwise({speed: Number, steps: Number})
    */
    my.controller.on("r1:press", function() { 
      console.log("my.drone.clockwise");
      my.drone.clockwise({steps: 2});
    });   

    my.controller.on("l1:press", function() { 
      console.log("my.drone.counterClockwise");
      my.drone.counterClockwise({steps: 2});
    });  


    /*
      client.forward({speed: Number, steps: Number})
      client.backward({speed: Number, steps: Number})
    */
    my.controller.on("up-down:move", function(args) {
      // up: -1, down: 1
      console.log("up-down:", args)
      if(args==-1) {
        my.drone.forward({steps: 12})
      }
      if(args==1) {
        my.drone.backward({steps: 12})
      }
    });

    /*
      client.left({speed: Number, steps: Number})
      client.right({speed: Number, steps: Number})
    */
    my.controller.on("left-right:move", function(args) {
      // left: -1, right: 1
      console.log("left-right:", args)
      if(args==-1) {
        my.drone.left({steps: 12})
      }
      if(args==1) {
        my.drone.right({steps: 12})
      }      
    });


    my.controller.on("start:press", function() {
      console.log("Emergency");
      my.drone.emergency();
    });    

  }

}).start();
