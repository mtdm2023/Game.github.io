var button_registerNow1 = document.getElementsByClassName('button_registerNow');

    document.body.innerHTML  +='<div class="modal_register" style="transition: 0.3s ease-in-out ; position:absolute; top:0;  width:100vw; height:100vh; background: linear-gradient(#191919 , #7F7F7F); opacity:0.5;" ></div>'+
    '<div class = "centered-div d-flex flex-column justify-content-around align-items-center" style = " opacity:1; transition: 2s ease-in-out;z-index : 1000; position: absolute; top : 50%; right : 50%; width: inherit; height: inherit; width : 60%; max-height : 510px; background-color :#FFFFFF ; transform:translate(50% , -50%);box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  border-radius: 40px;" ><div class="position-relative w-100 h-100"> <div style="position: relative; left: 50%; top: -70px; transform: translateX(-50%); width: 150px; height: 150px; border-radius: 50%; background-color: blueviolet;"> <img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);  width: 100px; height: 100px;" src="./images/treasure-chest.png" alt=""></div> </div><div class="position-relative w-100 h-100"><div class="enter_game" style="position: relative; left: 50%; bottom: -213px; transform: translateX(-50%); width: 90px; height: 90px; border-radius: 50%; background-color: blueviolet;"><img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);  width: 66px; height: 66px; cursor: pointer;" src="./images/right-arrow.png" alt=""> </div> </div><p class="position-absolute SomarBold ts-fs-48 text-wrap text-center" >Match the pictures  on their silhouettes</p></div>';
     document.getElementsByClassName('enter_game')[0].addEventListener('click' , ()=>{
      let modall = document.getElementsByClassName('centered-div')[0];
      modall.style.top = '0';
      modall.style.right ='100%';
      modall.style.width ='0';
      modall.style.height ='0';
      setTimeout(()=>
      {
         window.location.href = './html/start.html';  
         document.body.removeChild(modall)
      },1500)
      
    
      const correctSound = document.getElementById('start');
      correctSound.play();
     })
     
    
