/*jshint esnext:true */

// testing in sim dir

var roleWorker = require('role.worker');
var WORKFORCE_TARGET = 6;

Memory.jobboard = { harvesters: [0,0], upgraders: [1,0], builders: [0,0] };

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
  var Upgraders  = _.filter(Game.creeps, (creep) => creep.memory.job == 'upgrade');
  var Idle  = _.filter(Game.creeps, (creep) => creep.memory.job === null );
  if(Game.spawns.Spawn1.energy >= 300) {
    console.log('Spawning new creep');
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
  if ((Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) && Memory.jobboard.harvesters[1] < 1) {
    console.log('Need harvester');
    Memory.jobboard.harvesters[0]=1;
  }




 // figure out what we need
 // who should do what
 // write to job board

};
