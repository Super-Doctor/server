
let messageQueue={};
console.log('messageQueue///////////',messageQueue,'messageQueue//////////////////////////////')

const stream = ( socket ) => {
  
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

       
        //Inform other members in the room of new user's arrival
        if ( socket.adapter.nsp._eventsCount  ) {
            
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } ,  );
           
          
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
       
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender },  

        );
    } );

    socket.on( 'sdp', ( data ) => {
        
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } ,  );

    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } ,);
        
        
    } );

    socket.on('disconnect', () => {
       
        socket.on('disconnected',(data)=>{
            console.log(data.room,'disco*///*/*/*/*/*/*')
          
          
           
          })
        
        
          if (!socket.adapter.rooms) {
            console.log('////////////////////////////////////////',
              'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
            );

            };

      
        
    
      
    
        
    });
    
};

module.exports = stream;
