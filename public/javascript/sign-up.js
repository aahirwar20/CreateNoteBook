function g_check(){
    var n=document.getElementById('mail').value;
    var t="/g_check?mail="+n;
    var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
     var a=this.responseText;
     console.log(a);
     if(a=='0'){
       document.getElementById('ins').innerHTML='gmail already exist';
     }
     if(a=='1'){
        document.getElementById('ins').innerHTML='';
      }
    
    }
  };
  xhttp.open("POST", t, true);
  xhttp.send();

}