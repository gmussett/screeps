var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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
            flags = creep.room.find(FIND_FLAGS);
            if (flags.length > 0) {
              creep.moveTo(creep.pos.findClosestByRange(FIND_FLAGS));
            } else {
              spawns = creep.room.find(FIND_MY_SPAWNS);
              creep.say('idle');
              creep.moveTo(spawns[0])
            }
          }
        }
    }
};

module.exports = roleHarvester;
