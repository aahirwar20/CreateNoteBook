var users=[];

export async function initSocket(io){
        io.on('connection',function(socket){
            var a=0;
           
            socket.on('name',function(name){
              for(let x of users){
                if(x==name){a=1};
              }
              if(a==0){users.push(name);}
              
              io.sockets.emit('users',users);
            });
            socket.on('disconnect', function () {
              console.log('A user disconnected');
           });
          });
          return io;
}


