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
      
   
       $(".toolicon").click(function(){
        setInterval(() => {
          location.reload();
        },100);
       
      });

      $(".toolicon").mouseenter(function(){
        $(".toolicon").css({"background-color": "white", "color": "black"}) 
      });
      $(".toolicon").mouseleave(function(){
        $(".toolicon").css({"color": "rgb(254, 254, 255)","background-color": "rgb(19, 19, 20)" }) 
      });
      var count = 0;  
    $(".active_bar").click(function(){
      count++;
      //even odd click detect 
      var isEven = function(someNumber) {
          return (someNumber % 2 === 0) ? true : false;
      };
      // on odd clicks do this
      if (isEven(count) === false) {
        $(".active").css({"display":"inline"})
      }
      // on even clicks do this
      else if (isEven(count) === true) {
       
        $(".active").css({"display":"none"})
      }
     
    });

    // $(".active").mouseleave(function(){
    //   $(".active").css({"display":"none"})
    // });
     
    
    },function(){
      // $(".active").css({"display":"none"})
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
    
    