function g_check(){
    var n=document.getElementById('mail').value;
    var t="/g_check?mail="+n;
    var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
     var a=this.responseText;
     console.log(a);
     if(a=='0'){
       document.getElementById('in').innerHTML='correct gmail ';
     }
     if(a=='1'){
        document.getElementById('in').innerHTML='!incorrect gmail';
      }
    
    }
  };
  xhttp.open("POST", t, true);
  xhttp.send();

}