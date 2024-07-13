

 var correct_drops = 0;
 var progress = 0;
document.querySelectorAll('.draggable').forEach(draggable => {
    const rect = draggable.getBoundingClientRect();
    draggable.setAttribute('data-initial-x', rect.left);
    draggable.setAttribute('data-initial-y', rect.top);
  });
  
  function increaseProgress(Correctanswer , num_of_questions) {
    const progressBar = document.getElementById('progressBar');
      this.progress = this.progress+ (Correctanswer / num_of_questions)*100;
    if (progress >= 100) progress = 100; // Cap the progress at 100%
    console.log(progressBar.style.width)
    progressBar.style.width = progress + '%';
}

interact('.draggable')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'self',
                endOnly: true,
            })
        ],
        listeners: {
           
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });

interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 0.75,
    ondrop(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        const isCorrectDrop =
            (draggableElement.classList.contains('shape1') && dropzoneElement.classList.contains('zone1')) ||
            (draggableElement.classList.contains('shape2') && dropzoneElement.classList.contains('zone2') ||draggableElement.classList.contains('shape3') && dropzoneElement.classList.contains('zone3') )

        if (isCorrectDrop) {
            this.correct_drops +=1;
            const progress_counter = document.getElementsByClassName('counter')
            const message = document.getElementById('message');
            message.textContent = 'Correct!';
            dropzoneElement.appendChild(draggableElement);
            draggableElement.style.position = 'absolute';
            draggableElement.style.transform = 'none';
            draggableElement.style.top = '0'; // Align to top-left of the drop zone
            draggableElement.style.left = '0';
            draggableElement.style.width = '100%'; // Optional: Make it fill the drop zone
            draggableElement.style.height = '100%'; // Optional: Make it fill the drop zone
         
        
                draggableElement.classList.add('no-drag');
                const correctSound = document.getElementById('correctSound');
                correctSound.play();
                const  draggablee= document.getElementsByClassName('draggable');
                Array.from(draggablee).forEach((draggable) => {
                    draggable.style.animationDelay = '0s';
                });
                progress_counter[0].innerText = `${correct_drops} / ${draggablee.length}`;
                increaseProgress( 1, draggablee.length);
              if(draggablee.length == this.correct_drops )    
                {
                    const win = document.getElementById('win');
                    win.play();
                   setTimeout(() => {
                    document.body.innerHTML  +='<div class="modal_register" style="transition: 0.3s ease-in-out ; position:absolute; top:0;  width:100vw; height:100vh; background: linear-gradient(#191919 , #7F7F7F); opacity:0.5;" ></div>'+
                                    '<div class = "animate__animated animate__zoomIn centered-div d-flex flex-column justify-content-around align-items-center" style = "animation-delay: 2s; opacity:1; transition: 2s ease-in-out;z-index : 1000; position: absolute; top : 50%; right : 50%; width: inherit; height: inherit; width : 60%; max-height : 510px; background-color :#FFFFFF ; transform:translate(50% , -50%);box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  border-radius: 40px;" ><div class="position-relative w-100 h-100"> <div style="position: relative; left: 50%; top: -70px; transform: translateX(-50%); width: 150px; height: 150px; border-radius: 50%; background-color: blueviolet;"> <img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);  width: 100px; height: 100px;" src="../images/treasure-chest.png" alt=""></div> </div><div class="position-relative w-100 h-100"><div class="enter_game" style="position: relative; left: 50%; bottom: -213px; transform: translateX(-50%); width: 90px; height: 90px; border-radius: 50%; background-color: blueviolet;"><img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);  width: 66px; height: 66px; cursor: pointer;" src="../images/right-arrow.png" alt=""> </div> </div><p class="position-absolute SomarBold ts-fs-48 text-wrap text-center" >Correct Answers '+this.correct_drops+'</p></div>';
                    document.getElementsByClassName('enter_game')[0].addEventListener('click' , ()=>{
                        let modall = document.getElementsByClassName('centered-div')[0];
                        modall.style.top = '0';
                        modall.style.right ='100%';
                        modall.style.width ='0';
                        modall.style.height ='0';
                        
                        setTimeout(()=>
                        {
                           window.location.href = '../html/start.html';  
                           document.body.removeChild(modall)
                        },1500)
                        
                      
                        const correctSound = document.getElementById('start');
                        correctSound.play();
                       })
                       
                   },5000 ); 
                  
                                    
                }    
                interact(draggableElement).draggable({
                    modifiers: [
                      interact.modifiers.restrictRect({
                        restriction: 'parent', // Restrict dragging within the dropzone
                        endOnly: false,
                      })
                    ]
                  });
        } 
        else {

            const message = document.getElementById('message');
            message.textContent = 'try again!';
            const initialX = draggableElement.getAttribute('data-initial-x');
            const initialY = draggableElement.getAttribute('data-initial-y');

            // Reset position
            draggableElement.style.left = initialX;
            draggableElement.style.top = initialY;
            draggableElement.style.transform = 'none';
            draggableElement.setAttribute('data-x', 0);
            draggableElement.setAttribute('data-y', 0);
            interact(draggableElement).draggable({
                modifiers: [
                  interact.modifiers.restrictRect({
                    restriction: 'parent', // Restrict dragging within the dropzone
                    endOnly: false,
                  })
                ]
              });
            const correctSound = document.getElementById('wrong_sound');
            correctSound.play();
            
        }

        
    },
    ondragenter(event) {
        event.target.classList.add('hover');
    },
    ondragleave(event) {
        event.target.classList.remove('hover');
    }
});


    
document.addEventListener('touchstart', function(event) {
    if (event.target.classList.contains('draggable')) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    if (event.target.classList.contains('draggable')) {
        event.preventDefault();
    }
}, { passive: false });