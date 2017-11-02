/*jshint esnext:true */

// testing in sim dir

var roleWorker = require('role.worker');

Memory.jobboard = Array();

module.exports.loop = function () {

  // housekeeping
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // spawn creeps
  var Workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
  if(Workers.length < 6) {
    console.log('Spawning new creep');
    Game.spawns.Spawn1.spawnCreep( [WORK, CARRY, MOVE], 'Worker' + Game.time, {memory: { role: 'worker'}});
  } else {
    console.log('Total of ' + Workers.length + ' Workers meets threshold');
  }

  // initialize creeps
 for(name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'worker') {
      roleWorker.run(creep);
    }
  }


  // Need harvesters
  if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
    console.log('NEED MOAR ENERGY');
    Memory.jobboard.push( [ "", "harvest"] );
  }
  for(name in Game.creeps) {
    if(Math.floor(Math.random()*10)==1) {
      Memory.jobboard.push( [ name.id, "say", ["bah"] ] );
    }

  }

 // figure out what we need
 // who should do what
 // write to job board

};
