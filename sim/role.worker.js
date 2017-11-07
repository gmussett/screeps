/*jshint esnext:true */
var roleWorker = {
  // sim worker role
  run: function(creep) {
    if (!creep.memory.job) {
      console.log('harvesters needed: ' + Memory.jobboard.harvesters[0]);
      console.log('upgraders needed: ' + Memory.jobboard.upgraders[0]);
      if(Memory.jobboard.harvesters[0] > 0) {
        creep.memory.job = 'harvest';
        Memory.jobboard.harvesters[1]++;
      } else if (Memory.jobboard.upgraders > 0) {
        creep.memory.job = 'upgrade';
        Memory.jobboard.upgraders--;
      } else {
        var flags = creep.room.find(FIND_FLAGS);
        if (flags.length > 0) {
          creep.moveTo(creep.pos.findClosestByRange(FIND_FLAGS));
        } else {
          var spawns = creep.room.find(FIND_MY_SPAWNS);
          creep.say('idle');
          creep.moveTo(spawns[0]);
        }
      }
    }
    if(creep.memory.job) {
      console.log('creep ' + creep.id + ' job ' + creep.memory.job);
      if(creep.memory.job == 'harvest') {
        // if i'm a harvester...
        console.log('creep ' + creep.id + ' carrying ' + creep.carry.energy + ' capacity: ' + creep.carryCapacity);
        if (creep.carry.energy < creep.carryCapacity) {
          console.log('harvester ' + creep.id + ' seeking sources');
          // ...and i'm not carrying energy...
          const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
          if(target) {
              if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
          }
        } else {
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
              }
            }
          );
          if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.say('store');
              creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
          } else {
            creep.memory.job=null;
          }
        }
        // if i'm an upgrader...
      }
      console.log('creep ' + creep.id + ' job: ' + creep.memory.job);
    }
  }


};

module.exports = roleWorker;
