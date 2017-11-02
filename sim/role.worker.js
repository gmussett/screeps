/*jshint esnext:true */
var roleWorker = {
  // sim worker role
  run: function(creep) {
    if (!creep.memory.job) {
      for(var i=0;i<Memory.jobboard.length;i++) {
        if(Memory.jobboard[i][0]==="" || Memory.jobboard[i][0]==creep.id) {
          var job = Memory.jobboard[i][1];
          var args = Memory.jobboard[i][2];
          if (job == "harvest") {
            creep.say("harvest!");
            creep.memory.job='harvest';
          } else if (job == "say") {
            creep.say(args[0]);
          }
          Memory.jobboard.splice(i,1);
        }
      }
    } else {
      console.log('creep ' + creep.id + ' job: ' + creep.memory.job);
    }
  }

};

module.exports = roleWorker;
