// Querys 
// Geschlecht Querys 
let button = document.querySelector('.gesch');
let frau = document.querySelector('.frau'); 
let mann = document.querySelector('.mann');

// Korper Query 
const form = document.querySelector('form')

// Muskl Query 
let buttonMuskel = document.querySelector('.muskl');
let starke = Array.from(buttonMuskel.children);

// Aktive Query 
let buttonAktive = document.querySelector('.aktiv');
let aktive = Array.from(buttonAktive.children);

// Animationen 

// Animation Geschlecht 

let activeButton = (geschlecht,nichtGeschlecht)=>{ 
    geschlecht.classList.add('active')
    if(nichtGeschlecht.classList.contains('active')){
        nichtGeschlecht.classList.remove('active')
    };
 } ;


 button.addEventListener('click', e=> { 
     if(e.target.classList.contains('frau')){
         activeButton(e.target,mann);
     }else if(e.target.classList.contains('mann')){ 
         activeButton(e.target,frau);
     };
 });

// Slide Bar animation 

 let slideBar =(input,output)=>{
    output.textContent = `${input.value} `
  }
  
  form.addEventListener("input",e=>{
      if(e.target.classList.contains('input')){
          slideBar(e.target,e.target.nextSibling.nextSibling)
      }
  })
  


// Muskl Animation
 
const toggleActiveMuscleClass = (targetElement) => {
starke.forEach(element => { 
  if (element.classList.contains('active')) {
    element.classList.remove('active');
}
});

if(targetElement.parentElement!== buttonMuskel && !targetElement.parentElement.classList.contains('d')){ 
targetElement.parentElement.classList.add('active');}
};

          buttonMuskel.addEventListener('click', e=> { 
            
              toggleActiveMuscleClass(e.target);
          });


      

// Aktivie  Animation
          

       const toggleActiveAktiveClass = (targetElement) => {
        aktive.forEach(element => { 
          if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
        });
        
        if(targetElement.parentElement!== buttonMuskel && !targetElement.parentElement.classList.contains('e')){ 
        targetElement.parentElement.classList.add('active');}
      };
  
                  buttonAktive.addEventListener('click', e=> { 
                      
                      toggleActiveAktiveClass(e.target);
                  });



// Animation Counter 
 // Das Was IWr anzeigen und Langsam Streigt 


 function  Stamp(){
    let output = 0; // Das Was IWr anzeigen und Langsam Streigt 
    const timer = setInterval(()=>{
        displayHeader.innerHTML=`<h1>${output}</h1>` 
      
       if(output>=Person.berchnungKalorien()){  // Testen op der Score Ereicht Wurde 
        displayHeader.innerHTML=`<h1>${Person.berchnungKalorien()}</h1>`
        clearInterval(timer) // Ja = Stop 
       }else{
        output+=10; // Nein Output Wird Eins grosser Fur Wachsend Animation
    
       }
    },1)// zeitintervall bis dei Funktion Wieder Gefeuert Wird 
    }









// Berechnung der Vergleichswerte 





// geschlecht button
let gesch = document.querySelector('.gesch');

// koeperdaten 
let koerperDaten = Array.from( document.querySelector('.Korper').querySelectorAll('input'))

 // Muskl 
let muskl = document.querySelector('.muskl');
let aktiv = document.querySelector('.aktiv');
// Aktive 
// let aktive = document.querySelector('.aktiv');

let berechnenButton = document.querySelector('.berechen');



class Personen {
    constructor(geschlecht,koerperDaten,musklStrenght,aktiv){
        this.geschlecht = geschlecht
        this.koerperDaten = koerperDaten
        this.musklStrenght = musklStrenght
        this.aktiv = aktiv
    }
berchnungBmr(){
        let bmr = 0
        bmr = 10*koerperDaten[2].value + 6.25*koerperDaten[1].value - 5*koerperDaten[0].value + 5
        return bmr
}
berchnungKalorien (){
    let wbmr = 0
    wbmr = this.berchnungBmr()*((Number(this.geschlecht.id) + Number(this.musklStrenght.id))/2)
    let kalorien = 0
    kalorien = wbmr*Number(this.aktiv.id)
    return Math.round(kalorien) //kalorien
}
berechnungBmi(){
    let bmi = 0
   
    bmi = koerperDaten[2].value/((koerperDaten[1].value/100)*(koerperDaten[1].value/100))
    return bmi
} 

}






let getDaten = (parent) => {
    let Buttons = null
Buttons = Array.from(parent.children)
let activeButtons = null
 activeButtons = Buttons.filter(button => button.classList.contains('active'))
return activeButtons
} 
let Person  = null 



let displayHeader = document.querySelector('.kal-h1')





berechnenButton.addEventListener('click', (e) => {
 if(e.target.classList.contains('berechen')){
    Person = new Personen(getDaten(gesch)[0],koerperDaten,getDaten(muskl)[0],getDaten(aktiv)[0])
if(koerperDaten[0].value === '0' || koerperDaten[1].value === '0' || koerperDaten[2].value === '0' || Person.berchnungKalorien()===false){
    alert('Ein Fehler ist aufgetreten , sind nicht alle Felder ausgefüllt ?')
}else {
  myObject = Person;
  console.log("Objekt initialisiert:", myObject);

scrollTo(0,0)
Stamp()
localStorage.setItem('Person',JSON.stringify(Person.berchnungKalorien()))
localStorage.setItem('Bmi',JSON.stringify(Person.berechnungBmi()))
}
    } 
})


// Fehler checker 
window.onerror = function (message, source, lineno, colno, error) {
  
    console.error("Ein Fehler ist aufgetreten:");
    console.error("Nachricht:", message);
    console.error("Quelle:", source);
    console.error("Zeile:", lineno);
    console.error("Spalte:", colno);
    console.error("Error-Objekt:sim", error);
   alert('Ein Fehler ist aufgetreten , sind nicht alle Felder ausgefüllt ? ')
   return false;
};



// Event-Listener, um das Objekt zu initialisieren



// Später wird das Objekt definiert und aktualisiert





