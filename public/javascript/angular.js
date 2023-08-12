var app =angular.module('myapp',[]);
app.controller('myCtrl',function($scope,$http,$q){
    
   $scope.uname='';
   $scope.udata='';
   
   $scope.ushow=false;
  
   $scope.Expend=function(id){
    $scope.CurrentNote=$scope.notes[id];
    
    window.location.assign("/note/"+id)
} 

    $scope.show3=function(id){
        $scope.showme[id]=!$scope.showme[id];
    }
    $scope.show4=function(id){
        $scope.show_send[id]=!$scope.show_send[id];
    }
    $scope.send = async function(id, name, data){
        $http({
           method: 'POST',
            url: '/sendNote/mail',
            data: {
                to_mail: $scope.mail[id], 
                name: name,
                data: data
            }
        }).then(function(response){
            $scope.show_send[id]=false;
        });
    }


    $scope.usubmit=function(id){
        $http({
            method: 'PUT',
            url: '/note',
            data: {
                id: $scope.notes[id].noteId,
                name: $scope.uname,
                data: $scope.udata
            }
        },{'cache': false}).then(function(response){
            setTimeout(() => {window.location.reload();},100);
        });
    }
     $scope.delete=function(id){
         const del ='/note/'+id;
         $http.delete(del,{'cache': false}).then(function(response){
             setTimeout(() => {window.location.reload();},100);
         });
     }
   
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    
    var s1='/profile'
    var s2='/note';
    var requests = [];
    requests.push($http.get(s1, {'cache': false}));
    requests.push($http.get(s2, {'cache': false}));

    $q.all(requests).then(function(response){
        console.log(response[0])
        $scope.firstname = response[0].data.profile.fname;
        $scope.lastname = response[0].data.profile.lname;
        $scope.notes= response[1].data.notes;
       console.log(response[1].data.notes)
        
        $scope.update =function(id){
            console.log(id)
            $scope.uname=$scope.notes[id].name;
            $scope.udata=$scope.notes[id].data;
            $scope.uid=id;
            if($scope.ushow==true){$scope.ushow=false}
            else{$scope.ushow=true}
            } 
       
        var l=$scope.notes.length;
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
        document.querySelector('.active').innerHTML=''
        for(x of users){
          document.querySelector('.active').innerHTML+='<div class="users" ><div class="a_ball"></div>'+x+'</div>'   
         }
     
        
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

