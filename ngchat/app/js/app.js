angular.module('myApp', ['io.service']).

run(function (io) {
  io.init({
    ioServer: 'http://localhost:3696',
  });
}).

controller('MainController', function ($compile,$scope,io) {
  $scope.messages=[];

  $scope.send = function () {

    if($scope.message){

      io.emit({message:$scope.message});
      $scope.message = null;
    }else{
      alert("No Text to send!");
    }

  };

  $scope.checkKey=function(e){
    console.log(e);
    if(e.KeyCode==13){
      console.log('ok');
    }
  };

  $scope.rooms=function(){
    io.getrooms();
    $scope.roomsShow=true;
    $scope.chatRoomShow=false;
  }

  $scope.register=function(){

    if($scope.avatarPic && $scope.nickName){

      console.log($scope.room);
      io.setioRoom($scope.room);
      $scope.chatUser=$scope.nickName;
      io.createuser({username:$scope.nickName,avatarPic:$scope.avatarPic});
      io.subscribe();
      $scope.chatRoomShow=true;
      $scope.roomsShow=false;
      modalUser.style.display = "none";
    }else{
      alert("Pick an Avatar and Enter a NickName!!");
    }    

  };


  $scope.setpic=function(pic){
    $scope.picPath=pic;
  };

  $scope.setAvatarPic=function(pic){
    $scope.avatarPic=pic;
  };

  $scope.createroom=function(){
    if($scope.picPath && $scope.roomName){

      var id=$scope.existingRooms.length++;
      io.createroom({io:id,roomname:$scope.roomName,picPath:$scope.picPath});
      $scope.room=id;
      modalRoom.style.display = "none";
    }else{
      alert("Pick an Image and Enter a Room Name!!");
    }
  };

  $scope.pickRoom=function(room){
    console.log(room);
    $scope.room=room;
    modalUser.style.display = "block";
  
  };

  io.watch('message', function (data) {
    console.log(data);
    $scope.lastMessage = data.data.message.message;
    $scope.lastUser = data.user.username;
    $scope.detailsMsg=new Date().toLocaleString();
    $scope.avatarPic=data.user.avatarPic;
    //$scope.messages.push(data);

    console.log(data);
    var msgArea = document.getElementById('messageArea');
    var msgDiv=document.createElement('div');
    var txtDivWrap=document.createElement('div');
    var detailsMsg=document.createElement('span');
    var msgDivWrap=document.createElement('div');
    var msgBox=document.createElement('div');
    var userD=document.createElement('div');
    var userP=document.createElement('span');
    var imgAvatar=document.createElement('img');
    var divAvatar=document.createElement('div');

    var msgSpan=document.createElement('span');
    //msgBox.setAttribute('class','msgBox');
    imgAvatar.setAttribute('src',$scope.avatarPic);
    txtDivWrap.setAttribute('class','txtDivWrap');
    detailsMsg.setAttribute('class','detailsSpan')
    imgAvatar.setAttribute('class','imgAvatar');
    divAvatar.setAttribute('class','divAvatar');
    userD.setAttribute('class','userNickname');
    userP.setAttribute('class','nicknametxt')
    userP.appendChild(document.createTextNode($scope.lastUser));
    divAvatar.appendChild(imgAvatar);
    divAvatar.appendChild(userP);
    msgDiv.setAttribute('class','msgDiv');
    msgDivWrap.setAttribute('class','msgDivWrap');
    msgSpan.setAttribute('class','msgText');
    userD.appendChild(divAvatar);
    msgSpan.appendChild(document.createTextNode($scope.lastMessage));
    msgBox.appendChild(msgSpan);

    if($scope.lastUser==$scope.chatUser){
      msgBox.setAttribute("class","activeUser msgBox");
      msgDivWrap.setAttribute('class','activeUser msgDivWrap');
    }else{
      msgBox.setAttribute("class","otherUsers msgBox");
      msgDivWrap.setAttribute('class','otherUsers msgDivWrap');
    }
    detailsMsg.appendChild(document.createTextNode($scope.detailsMsg));

    txtDivWrap.appendChild(msgBox);
    txtDivWrap.appendChild(detailsMsg);

    msgDivWrap.appendChild(userD);
    msgDivWrap.appendChild(txtDivWrap);

    msgDiv.appendChild(msgDivWrap);   
    msgArea.appendChild(msgDiv);

    $scope.$apply();
  });


  io.watch('rooms', function (data) {
    console.log(data);
    $scope.existingRooms = data;
    $scope.$apply();
  });

  io.watch('users', function (data) {
    console.log(data);
    $scope.$apply();
  });


  $scope.getkeys = function (event) {
    
    $scope.keyval = event.keyCode;
    if($scope.keyval==13){
      $scope.send();
    }
    } 
});


// Get the modal
var modalRoom = document.getElementById('createRoomModal');

// Get the button that opens the modal
var btnRoom = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var spanRoom = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btnRoom.onclick = function() {
    modalRoom.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanRoom.onclick = function() {
    modalRoom.style.display = "none";
}


// Get the modal
var modalUser = document.getElementById('createUserModal');

// Get the button that opens the modal
//var btnUser = document.getElementById("userBtn");

// Get the <span> element that closes the modal
var spanUser = document.getElementsByClassName("userclose")[0];

// When the user clicks on the button, open the modal 
//btnUser.onclick = function() {
  //  modalUser.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
spanUser.onclick = function() {
    modalUser.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalUser || event.target == modalRoom) {
        modalUser.style.display = "none";
        modalRoom.style.display = "none";
    }
}

