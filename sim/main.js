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
  if(Game.creeps.length < 6) {
    Game.spawns.Spawn1.spawnCreep( [WORK, CARRY, MOVE], 'Worker' + Game.time, {memory: { role: 'worker'}});
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
