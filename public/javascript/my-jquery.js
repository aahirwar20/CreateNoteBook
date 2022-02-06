$(document).ready(function(){
  
     $(".other-p").mouseenter(function(){
        $(this).css({"background-color": "black", "color": "white"}) 
      
     });
     $(".other-p").mouseleave(function(){
        $(this).css({"background-color": "white", "color": "black"})  
       
      });
      $(".other-p").click(function(){
        $(this).css({"background-color": "#534f53", "color": "white"})  
       
      }); 

      $(".extra").mouseleave(function(){
        $(".other").css({"z-index": "-1"}) 
      });
      
      $(".row").mouseenter(function(){
        $(this).css({"height":"77px","width":"1004px","left":"-2px","top":"-1px","background-color": "rgb(220, 241, 248)"})
        
       } );

       $(".toolicon").click(function(){
        setInterval(() => {
          location.reload();
        },100);
        console.log("yes");
      });

      $(".toolicon").mouseenter(function(){
        $(".toolicon").css({"background-color": "white", "color": "black"}) 
      });
      $(".toolicon").mouseleave(function(){
        $(".toolicon").css({"color": "rgb(254, 254, 255)","background-color": "rgb(19, 19, 20)" }) 
      });
      

     
    
    });
   
    function show_feed(){
      
      var a= document.querySelector('.feedback').style.display;
      if(a=='none'){
        document.querySelector('.feedback').style.display='block';
      }
      else{
        document.querySelector('.feedback').style.display='none';
      }
      }
    
    