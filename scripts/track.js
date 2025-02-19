// let main = document.querySelector('main');

// close open objekts
let main = document.querySelector('main');
let buttonTrack = document.querySelector('.buttonTrack'); 
let popUp = document.querySelector('.popUp');
let closeBtn = document.querySelector('.Close');

// objekte fuer  kalorientracken
let KalorineVerbrauch = document.querySelector('.verbrauch')
let foodInput = document.querySelector('.popUpInput')

let list = document.querySelector('.popUpUl')
let listItems = Array.from(list.children)
let plusses = Array.from(document.querySelectorAll('.plus'))

let displayList = document.querySelector('.displayList')


// score update 
let zufurKal = document.querySelector('.zufur')
let zufurFett = document.querySelector('.fett')
let zufurProtein = document.querySelector('.protein')
let zufurZucker = document.querySelector('.zucker')
let zufurKohlenhydrate = document.querySelector('.kohlenhydrate')

//wieter button 
weiterButton = document.querySelector('.weiterButton')



upDateHtml = (objekt,updateWert) => {
    objekt.innerHTML = updateWert
} 
makeFoodobjekt = (foodObjektArray) => {
    i=0;
    listItems.forEach(element => {
        element.classList.add('d-none')
    })
  foodObjektArray.forEach(element => {
   
    if(i<9){
        listItems[i].classList.remove('d-none')
        console.log(listItems[i])
        listItems[i].querySelector('.nameLebesnmittel').innerHTML = element.NAME
        listItems[i].querySelector('.kalorien100').innerHTML = `<span class="kalorie">${element.KALORIEN}</span><i>kal</i>` 

        
        listItems[i].querySelector('.FETT').innerHTML = `${element.FETT}`
        listItems[i].querySelector('.PROTIEN').innerHTML = `${element.PROTEIN}`
        listItems[i].querySelector('.ZUCKER').innerHTML = `${element.ZUCKER}`
        listItems[i].querySelector('.KOHLENHYDRATE').innerHTML = `${element.KOHLENHYDRATE}`
        
    //  list.innerHTML += ` <li class="">
    //     <span class="nameLebesnmittel">${element.NAME}</span> <span><Span class="kalorien100">${element.KALORIEN}<i>kal</i> </span><span class="inputFood"><input type="number" id="number" name="number" step="100" min="0" ><label for="number">g</label></span><i class="plus">+</i><Span>
    //   </li>`


    }
    i++
    
  });
    
};

totalProductNutrients = (nutrient,numerInput) => {

    let total = numerInput.value * (Number(nutrient.innerHTML)/100);
    return total

}

 

// PopUp Offnen 
upDateHtml(KalorineVerbrauch,localStorage.getItem('Person'))
buttonTrack.addEventListener('click', () => {
    // Entfernt die Klasse d-none und macht das Dialogfenster sichtbar
    popUp.classList.remove('d-none');
   
    scrollTo(0,0)
    
});
// PopUp schliessen
closeBtn.addEventListener('click', () => {
    // Fügt die Klasse d-none hinzu und versteckt das Dialogfenster
    popUp.classList.toggle('d-none');
    
    
});



foodInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim().toUpperCase();
    const serchdFoodJson = await searchFoodJson(query);

 
    if(serchdFoodJson.length > 0){
      
        makeFoodobjekt(serchdFoodJson);

       
      
    }

})



let gesamtKalorienKonsum = 0; 
let gesamtFett = 0;
let gesamtProtein = 0;
let gesamtZucker = 0; 
let gesamtKohlenhydrate = 0;    
let scoreUpdate = (updateObjekt,scoreBoard) => {
    switch (scoreBoard) {
        case zufurFett:
            gesamtFett += updateObjekt
            upDateHtml(scoreBoard,gesamtFett)
            break;
        case zufurProtein:
            gesamtProtein += updateObjekt
            upDateHtml(scoreBoard,gesamtProtein)
            break;
        case zufurZucker:
            gesamtZucker += updateObjekt
            upDateHtml(scoreBoard,gesamtZucker)
            break;
        case zufurKohlenhydrate:
            gesamtKohlenhydrate+= updateObjekt
            upDateHtml(scoreBoard,gesamtKohlenhydrate)
            break;
        case zufurKal:
            gesamtKalorienKonsum += updateObjekt
            upDateHtml(scoreBoard,gesamtKalorienKonsum)
            break;
        default:
            console.log(scoreBoard)
            console.log('Fehler')
            break;
    }
    // gesamtKalorienKonsum += updateObjekt
    // console.log(gesamtKalorienKonsum)
    // upDateHtml(scoreBoard,gesamtKalorienKonsum)
    
}
let ulItems = 0; 

let j = 0 ;
plusses.forEach(element => element.addEventListener('click', (e) => {
    // Objekt Erstellen 
    j++;
    
// Eine Aniation dafür das ein Element Hizugefügt Wordern ist 
    mengenInput =  e.target.parentNode.querySelector('input')
    essenName = e.target.parentNode.parentNode.querySelector('.nameLebesnmittel').innerHTML;
    essenKal = e.target.parentNode.querySelector('.kalorie')
    totalItemKal = totalProductNutrients(essenKal,mengenInput)

     
     
     totalItemFett = Math.round(totalProductNutrients(e.target.parentNode.parentNode.querySelector('.FETT'),mengenInput))
     totalItemProtein = Math.round( totalProductNutrients(e.target.parentNode.parentNode.querySelector('.PROTIEN'),mengenInput))
     totalItemZucker = Math.round(totalProductNutrients(e.target.parentNode.parentNode.querySelector('.ZUCKER'),mengenInput))
     totalItemKohlenhydrate = Math.round(totalProductNutrients(e.target.parentNode.parentNode.querySelector('.KOHLENHYDRATE'),mengenInput))
     displayList.innerHTML += ` <li class=""><span>${essenName}</span> <span><Span><u class="kalorie ">${totalItemKal}</u><i>kal</i>
     </span><Span>${mengenInput.value}<i>g </i></Span><i class="far fa-trash-alt delete"></i></Span>
     <span class="FETT d-none">${totalItemFett}</span>
     <span class="PROTIEN d-none">${totalItemProtein}</span>
     <span class="ZUCKER d-none">${totalItemZucker}</span>
     <span class="KOHLENHYDRATE d-none">${totalItemKohlenhydrate}</span></li>`

     console.log(totalItemFett,totalItemProtein,totalItemZucker,totalItemKohlenhydrate)
    // gesamtKalorienKonsum += totalProductKalorien(essenKal,mengenInput)
   console.log(displayList)
    scoreUpdate(totalItemKal,zufurKal)
    scoreUpdate(totalItemFett,zufurFett)
    scoreUpdate(totalItemProtein,zufurProtein)
    scoreUpdate(totalItemZucker,zufurZucker)
    scoreUpdate(totalItemKohlenhydrate,zufurKohlenhydrate)
   
  // Score am Board updaten 
  ulItmes = Array.from(displayList.children)
 

  




  mengenInput.value = "0"
  if(j>=9){
          main.style.height = `${1000+(j-8)*115}px`
  }
}));






let minusKollenhydrate = null;
let minusFett = null;
let minusProtein = null;
let minusZucker = null; 
let minusKalorien = null; 



const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Füge den EventListener nur hinzu, wenn es ein Element ist
                    node.addEventListener('click', (e) => {
                        if (e.target.classList.contains('delete')) {
                            minusKollenhydrate = e.target.parentNode.parentNode.querySelector('.KOHLENHYDRATE').innerHTML;
                            console.log(minusKollenhydrate)
                            minusFett = e.target.parentNode.parentNode.querySelector('.FETT').innerHTML;
                            minusProtein = e.target.parentNode.parentNode.querySelector('.PROTIEN').innerHTML;
                            minusZucker = e.target.parentNode.parentNode.querySelector('.ZUCKER').innerHTML;
                            minusKalorien = e.target.parentNode.parentNode.querySelector('.kalorie').innerHTML;
                            console.log(minusKalorien)
                            scoreUpdate(-1*minusKollenhydrate,zufurKohlenhydrate)
                            scoreUpdate(-1*minusFett,zufurFett)
                            scoreUpdate(-1*minusProtein,zufurProtein)
                            scoreUpdate(-1*minusZucker,zufurZucker)
                            scoreUpdate(-1*minusKalorien,zufurKal)
                            e.target.parentNode.parentNode.remove();
                        }
                    });
                }
            });
        }
    });
});

// Beobachte Änderungen in der Liste
observer.observe(displayList, { childList: true });








// function PrimusMakro(property) {
//     let lists = Array.from(displayList.querySelectorAll('li'))
//     if (lists.length === 0) {
//         return null; // Falls das Array leer ist
//     }

//     let highestCalorieObject = lists[0]; // Start mit dem ersten Objekt
//  console.log(highestCalorieObject.childNodes)
//     for (let i = 1; i < lists.length; i++) {
//         console.log(lists[i].childNodes[property])
//         if (lists[i].childNodes[property].innerHTML > highestCalorieObject.childNodes[property].innerHTML) {
//             highestCalorieObject = lists[i]; // Update, wenn aktuelles Objekt höhere Kalorien hat
//         }
//     }

//     return highestCalorieObject.childNodes[0].innerHTML; // Rückgabe des Objekts mit den höchsten Kalorien
// }
function PrimusMakro(property) {
    
    let lists = Array.from(displayList.querySelectorAll('li'));
    console.log(lists[0].children)
   
    if (lists.length === 0) {
        return null;
    }

    let highestCalorieObject = lists[0];
    for (let i = 1; i < lists.length; i++) {
        if (parseFloat(lists[i].children[property].innerHTML) > parseFloat(highestCalorieObject.children[property].innerHTML)) {
            highestCalorieObject = lists[i];
        }
    }

    return highestCalorieObject.children[0].innerHTML;
}






weiterButton.addEventListener('click', () => {
    
    
    if (displayList.children.length > 0) {
      let makroszuhnahme = { 
        KaloreienZufur: zufurKal.innerHTML,
        FettZufur: zufurFett.innerHTML,
        ProteinZufur: zufurProtein.innerHTML,
        ZuckerZufur: zufurZucker.innerHTML,
        KohlenhydrateZufur: zufurKohlenhydrate.innerHTML
      };
      let Primuse = {
        PrimusFett: PrimusMakro(2),
        PrmusProtein: PrimusMakro(3),
        PrmusZucker: PrimusMakro(4),
        PrmusKohlenhydrate: PrimusMakro(5)
      }
      localStorage.setItem('makroszuhnahme', JSON.stringify(makroszuhnahme));
      localStorage.setItem('Primus', JSON.stringify(Primuse));
      console.log(makroszuhnahme); 
      window.location.assign('analyse.html');
    
    }else{
        alert('Bitte mindestens ein Produkt hinzufügen')
    }
   
});




async function searchFoodJson(query) {
    const url = `/BURN 🔥/Food.json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const serchdFoodJson = data.filter(product =>
        product.NAME.includes(query)
      );
     
      
      return serchdFoodJson;
    } catch (error) {
      console.error('Fehler bei der Suche:', error);
    }
  }  



  
