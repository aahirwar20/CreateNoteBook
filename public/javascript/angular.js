var app =angular.module('myapp',[]);
app.controller('myCtrl',function($scope,$http,$q){
    
   $scope.uname='';
   $scope.udata='';
   
   $scope.ushow=false;
  
    
    $scope.show3=function(id){
        $scope.showme[id]=!$scope.showme[id];
    }
    $scope.show4=function(id){
        $scope.show_send[id]=!$scope.show_send[id];
    }
    $scope.send=function(id){
      
        var sn ='/add_send?to_mail='+$scope.mail[id]+'&name='+$scope.k[id].name+'&data='+$scope.k[id].data;
        

        $http.get(sn).then(function(response){
            $scope.show_send[id]=false;
        });
    }


    $scope.usubmit=function(id){
        var u ='/update?index='+id+'&name='+$scope.uname+'&data='+$scope.udata;   
        $http.get(u,{'cache': false}).then(function(response){
            setInterval(() => {window.location.reload();},100);
        });
    }
     
     $scope.delete=function(id){
         var del ='/delete?index='+id;
         $http.get(del,{'cache': false}).then(function(response){
             setInterval(() => {window.location.reload();},100);
         });
     }
   
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    
    var s1='/addname?id='+id;
    var s2='/add';
    var s3='/find_send'
    var requests = [];
    requests.push($http.get(s1, {'cache': false}));
    requests.push($http.get(s2, {'cache': false}));
    requests.push($http.get(s3, {'cache': false}));
    
    $q.all(requests).then(function(response){
        $scope.firstname=response[0].data.fname;
        $scope.lastname=response[0].data.lname;
        $scope.k=response[1].data.note;
        $scope.sends=response[2].data.send;
        
        $scope.update =function(id){
            $scope.uname=$scope.k[id].name;
            $scope.udata=$scope.k[id].data;
            $scope.uid=id;
            if($scope.ushow==true){$scope.ushow=false}
            else{$scope.ushow=true}
            } 
       
        var l=$scope.k.length;
        var i;
        $scope.mail=[];
        $scope.showme=[];
        $scope.show_send=[];
    for(i=0;i<l;i++){
        $scope.showme.push(false);
        $scope.show_send.push(false);
        $scope.mail.push('');
    }
     
    var socket=io();
    var name=$scope.firstname +' '+$scope.lastname;
    socket.emit('name',name);
    socket.on('users',function(users){
        for(x of users){
          document.querySelector('.active').innerHTML+='<div class="users" ><div class="a_ball"></div>'+x+'</div>'   
         }
     
         console.log($scope.users_name);
         console.log($scope.sends);
     });
    });
});

var app= angular.module('myfeed',[]);
app.controller('myfeed_ctr',function($scope,$http){
    var s='/add_feed';
    
    $http.get(s,{'cache': false}).then(function(res){
        $scope.data=res.data.f;
        
    });
});

