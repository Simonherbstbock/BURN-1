
let Uls = Array.from(document.querySelectorAll('ul')); 
let UlUnoLi = Array.from(Uls[0].querySelectorAll('li'));



const KalorienNetto = JSON.parse(localStorage.getItem('Person'));
const konsumetPerson = JSON.parse(localStorage.getItem('makroszuhnahme'));
const Primus = JSON.parse(localStorage.getItem('Primus'));

const kalPlus= document.querySelector('.KalPlus');
const kalNum = document.querySelector('.kalNum');

let AktuellKonsum = document.querySelector('.AktuellKonsum');

class idealPerson{
    constructor(kalorienverbrauch){
        this.idealeKalorien = kalorienverbrauch
        this.idealeZucker = Math.floor((kalorienverbrauch*0.075)/4)
        this.idealeEiweiss = Math.floor((kalorienverbrauch*0.30)/4)
        this.idealeFett = Math.floor((kalorienverbrauch*0.25)/9)
        this.idealeKohlenhydrate = Math.floor((kalorienverbrauch*0.45)/4)
    }

}


const person = new idealPerson(KalorienNetto)


let upDateScore = (objekt,updateWert) => {
    objekt.querySelector('section').innerText = `${updateWert}g`
} 


function textUpdate (objekt,Text){
    objekt.querySelector('p').innerText = `${Text}`
}

function textGenerate(objektName,Konsumer,Vergleicher,Bsp,bool){ 
    if(bool){
        return `Dein ${objektName} Konsum ist Um ${(Konsumer-Vergleicher)}g  Zu Hoch dein Idealer Wert ist ${Vergleicher}g, Verzichte auf Lebesnmittel wie ${Bsp} Um Deine Ernahrung zu Optimieren`
    }else if(!bool && Konsumer<Vergleicher && objektName != 'Zucker'){
        return `Dein ${objektName} Konsum ist Um ${(Vergleicher-Konsumer)}g Nidriger als der Maximal Konsum. Das ist Super achte Aber darauf nicht zu Wenig ${objektName} zu essen `

    }else{ 
        return `Dein Zucker Konsum ist Um ${(Vergleicher-Konsumer)}g Nidriger als der Maximal Konsum. Das ist Super ! `
    }

}



// Update Alt Kalorien
const KalorineVerbrauchn = Number(konsumetPerson.KaloreienZufur)
AktuellKonsum.innerHTML = `${KalorineVerbrauchn}`

kalNum.innerHTML = `${Math.floor( Math.sqrt((KalorineVerbrauchn-person.idealeKalorien)**2))} `


if(person.idealeKalorien<KalorineVerbrauchn){
    kalPlus.innerHTML = ' Uberschuss'

}else if(person.idealeKalorien>KalorineVerbrauchn){
    kalPlus.innerHTML = ' Defizit'}
    else{
        kalPlus.innerHTML = ''
    }
    
    
    //


function makroUpdate(Ul,vergleich){ 

switch(Ul){
    case UlUnoLi[0]:
        if(vergleich>person.idealeZucker){
            UlUnoLi[0].classList.add('nicht-passend')
            
        }else if(vergleich<=person.idealeKalorien*100){
            UlUnoLi[0].classList.add('passend') 
        }
       upDateScore(UlUnoLi[0],vergleich) 
       textUpdate(UlUnoLi[0],textGenerate('Zucker',vergleich,person.idealeZucker,Primus.PrmusZucker,vergleich>person.idealeZucker))
        break;




    case UlUnoLi[1]:
        if(vergleich>person.idealeFett){
            UlUnoLi[1].classList.add('nicht-passend')
        }else if(vergleich<=person.idealeKalorien*100){
            UlUnoLi[1].classList.add('passend')
        }
        upDateScore(UlUnoLi[1],vergleich) 
        textUpdate(UlUnoLi[1],textGenerate('Fett',vergleich,person.idealeFett,Primus.PrimusFett,vergleich>person.idealeFett))
        break;




    case UlUnoLi[2]:
        if(vergleich>person.idealeEiweiss){
            UlUnoLi[2].classList.add('nicht-passend')
        }else if(vergleich<=person.idealeKalorien*100){
            UlUnoLi[2].classList.add('passend')
            
        }
        upDateScore(UlUnoLi[2],vergleich) 
        textUpdate(UlUnoLi[2],textGenerate('Protein',vergleich,person.idealeEiweiss,Primus.PrmusProtein,vergleich>person.idealeEiweiss))
        break;

    case UlUnoLi[3]:
        if(vergleich>person.idealeKohlenhydrate){
            UlUnoLi[3].classList.add('nicht-passend')
        }else if(vergleich<=person.idealeKalorien*100){
            UlUnoLi[3].classList.add('passend')
        }
        upDateScore(UlUnoLi[3],vergleich) 
        textUpdate(UlUnoLi[3],textGenerate('Carbs',vergleich,person.idealeKohlenhydrate,Primus.PrmusKohlenhydrate,vergleich>person.idealeKohlenhydrate))
        break;
    default:
        console.log('Fehler')
        alert('Fehler')

};
};

makroUpdate(UlUnoLi[0],konsumetPerson.ZuckerZufur)
makroUpdate(UlUnoLi[1],konsumetPerson.FettZufur)
makroUpdate(UlUnoLi[2],konsumetPerson.ProteinZufur)
makroUpdate(UlUnoLi[3],konsumetPerson.KohlenhydrateZufur)


// Weitere Frage 
let BMI = Math.round(JSON.parse(localStorage.getItem('Bmi')))

let empfehlung = Array.from(document.querySelectorAll('.empfehlung'))

let EmpfZuhnahme = null;
let gegenVorschlag = document.querySelector('.gegenVorschlag');
// Empfehlung
console.log(BMI)
if (BMI <= 18.5) {
    empfehlung.forEach(element => {
        element.innerText = "Zunehmen";
    });
    gegenVorschlag.innerText = "Abnehmen";
    EmpfZuhnahme = true ;
} else if (BMI <= 20) {
    empfehlung[0].parentElement.innerText = "Unteres Normalgewicht: Wenn du willst, kannst du zunehmen.";
    empfehlung[1].parentElement.innerText = "Unteres Normalgewicht: Wenn du willst, kannst du auch Abnehmen.";
    gegenVorschlag.innerText = "Abnehmen";
    EmpfZuhnahme = true ;
} else if (BMI <= 28) {
    empfehlung[0].parentElement.innerText = "Normalgewicht: Wenn du willst, kannst du Abnehmen.";
    empfehlung[1].parentElement.innerText = "Normalgewicht: Wenn du willst, kannst du auch Zuhnehmen.";
    gegenVorschlag.innerText = "Zuhnehmen";
    EmpfZuhnahme = false;

} else if (BMI > 28) {
    empfehlung.forEach(element => {
        element.innerText = "Abnehmen";
        console.log(element)
    });
    gegenVorschlag.innerText = "Zuhnehmen";
    EmpfZuhnahme = false;   
}

          
            
      



let kalChange = document.querySelector('.kalChange')
let images = Array.from(kalChange.querySelectorAll('img'))
let ruhl = document.querySelector('.Ruhl')
let nichtRuhl = document.querySelector('.nichtRuhl')

console.log(images)
let weitereFrage = document.querySelector('.frageWeiter')
let NeuesZiel = document.querySelector('.neuesZiel')
let weitereFrageB = document.querySelector('.frageWeiterB')
let kalNumNeu = document.querySelector('.kalNumNeu')
wasEntscheiden = document.querySelector('.WasEntschied')
// Aufklappen
weitereFrage.addEventListener('click',(e)=>{
  
    if(e.target.classList.contains('Ja')){
          kalNumNeu.innerText = `0000`
        NeuesZiel.style.display = ''
        if(EmpfZuhnahme){
            if(nichtRuhl.style.display !== 'none'){
                nichtRuhl.style.display = 'none'
                ruhl.style.display = ''
                wasEntscheiden.innerText = 'Zuhnehmen'
            }else{
                ruhl.style.display = ''
            }
            wasEntscheiden.innerText = 'Zuhnehmen'
        }else{ 
            if(ruhl.style.display !== 'none'){
                ruhl.style.display = 'none'
                nichtRuhl.style.display = ''
            }else{
                nichtRuhl.style.display = ''
            }
            wasEntscheiden.innerText = 'Abnehmen'
        }
        
        
    }else if(e.target.classList.contains('Nein')){
        if(NeuesZiel.style.display !== 'none'){
            NeuesZiel.style.display = 'none'

            
        }
        weitereFrageB.style.display = ''

    }

})

weitereFrageB.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('Ja')){
         kalNumNeu.innerText = `0000`
       if(EmpfZuhnahme){
        if(ruhl.style.display !== 'none'){
            ruhl.style.display = 'none'
            nichtRuhl.style.display = ''
        }else{
            nichtRuhl.style.display = ''
        }
        wasEntscheiden.innerText = 'Abnehmen'
       }else{
        if(nichtRuhl.style.display !== 'none'){
            nichtRuhl.style.display = 'none'
            ruhl.style.display = ''
        }else{
            ruhl.style.display = ''
        }
         wasEntscheiden.innerText = 'Zuhnehmen'
       }
        NeuesZiel.style.display = ''

    }else if(e.target.classList.contains('Nein')){
        if(NeuesZiel.style.display !== 'none'){
            NeuesZiel.style.display = 'none'
        }
        weitereFrageB.style.display = 'none'
       
        
    }
})

let auswahlListItems = Array.from(NeuesZiel.querySelectorAll('li'))



function kalNumNeuBerechnen(personideal,AbnahmeWert,operatorPlus){
    let num = 0
    if(operatorPlus){
        num = personideal + AbnahmeWert
    }else{
        num = personideal - AbnahmeWert
    }
    
    return num
    
}




ruhl.addEventListener('click',(e)=>{
    console.log(e.target)
    if(e.target.tagName === 'IMG'){
        console.log(e.target.parentElement)
        auswahlListItems.forEach(element => {
            if(element.classList.contains('Active')){
                element.classList.remove('Active')
            }
        })
         
        e.target.parentElement.classList.add('Active')
        let wertederabnahme = e.target.parentElement.querySelector('figcaption').innerText
        if(wertederabnahme == '1Kg'){
          kalNumNeu.innerText =  kalNumNeuBerechnen(person.idealeKalorien,1000,true)
            
        }else if(wertederabnahme == '500g'){
           kalNumNeu.innerText = kalNumNeuBerechnen(person.idealeKalorien,500,true)
        }else if(wertederabnahme == '250g'){
          kalNumNeu.innerText =  kalNumNeuBerechnen(person.idealeKalorien,250,true)
            
        }else{ 
            alert('Fehler')
        }
    

       
    }
})
nichtRuhl.addEventListener('click',(e)=>{
    console.log(e.target)
    if(e.target.tagName === 'IMG'){

        auswahlListItems.forEach(element => {
            if(element.classList.contains('Active')){
                element.classList.remove('Active')
            }
        })
        e.target.parentElement.classList.add('Active')
        kalNumNeu.innerText = `0000`
        let wertederabnahme = e.target.parentElement.querySelector('figcaption').innerText
        if(wertederabnahme == '1Kg'){
          kalNumNeu.innerText =  kalNumNeuBerechnen(person.idealeKalorien,1000,false)
            
        }else if(wertederabnahme == '500g'){
           kalNumNeu.innerText = kalNumNeuBerechnen(person.idealeKalorien,500,false)
        }else if(wertederabnahme == '250g'){
          kalNumNeu.innerText =  kalNumNeuBerechnen(person.idealeKalorien,250,false)
            
        }else{ 
            alert('Fehler')
        }
        
    }
  
})
















// Augen Animation






const eye = document.querySelector(".eye");




const eyeRadius = 20; // Radius innerhalb des Auges, in dem sich die Iris bewegt

const eye2 = document.querySelector(".eye2")
console.log(eye2)
let augeAnimation =  (auge,radius)=>{
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Position des Augen-Zentrums
  const eyeRect = auge.getBoundingClientRect();
  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
  const eyeCenterY = eyeRect.top + eyeRect.height / 2;

  // Differenz berechnen
  const diffX = mouseX - eyeCenterX;
  const diffY = mouseY - eyeCenterY;

  // Winkel berechnen
  const angle = Math.atan2(diffY, diffX);

  // Koordinaten für die Iris innerhalb des Auges
  const irisX = eyeCenterX + Math.cos(angle) * radius;
  const irisY = eyeCenterY + Math.sin(angle) * radius;

  // Setze die Position der Iris
  auge.style.transform = `translate(${irisX - eyeCenterX}px, ${irisY - eyeCenterY}px)`;
}
document.addEventListener("mousemove", (event) => {
  // Mauskoordinaten
  augeAnimation(eye,eyeRadius)
  augeAnimation(eye2,eyeRadius)
  
});


let jaNeinButton = document.querySelector(".jaNein");
let Auge = document.querySelector(".eyeAnimation");

jaNeinButton.querySelector('.Ja').addEventListener("mouseover", () => {
    if(Auge.classList.contains('passtNicht')){
        Auge.classList.remove('passtNicht');
        Auge.classList.add('passt');  
    }else{ 
       Auge.classList.add('passt'); 
    }
 
});


jaNeinButton.querySelector('.Nein').addEventListener("mouseover", () => {
    if(Auge.classList.contains('passt')){
        Auge.classList.remove('passt');
        Auge.classList.add('passtNicht');
    }else{ 
       Auge.classList.add('passtNicht'); 
    }
});




let BackButton = document.querySelector('.ende')

BackButton.addEventListener('click',()=>{

localStorage.removeItem('Person')
localStorage.removeItem('makroszuhnahme')
localStorage.removeItem('Primus')
localStorage.removeItem('Bmi')
})




