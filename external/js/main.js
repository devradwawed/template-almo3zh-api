// explore button
let explorBtn = document.querySelector(".title .btn");
let hadithSection  = document.querySelector(".hadith");
explorBtn.addEventListener("click" ,()=>{
  hadithSection.scrollIntoView({
    behavior:"smooth"
  })


})
let fixeNav = document.querySelector(".header");
let scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll" , ()=>{
  window.scrollY > 100 ? fixeNav.classList.add("active") : fixeNav.classList.remove("active")
  window.scrollY > 500 ? scrollBtn.classList.add("active") : scrollBtn.classList.remove("active")
  list.classList.remove("active");
})
// hadith changer
let hadithContainer = document.querySelector(".hadithContainer");
let next = document.querySelector(".buttons .next");
let prev = document.querySelector(".buttons .prev");
let number = document.querySelector(".buttons .number");
let hadithIndex = 0;

hadithChanger()
function hadithChanger (){
  fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
  .then(res => res.json())
  .then(data =>{
    let Hadiths = data.data.hadiths;
    changeHadith();
    next.addEventListener("click" ,()=>{
      hadithIndex == 299 ? hadithIndex =0 : hadithIndex++;
      changeHadith();
    })
    prev.addEventListener("click" ,()=>{
      hadithIndex == 0 ? hadithIndex =299 : hadithIndex--;
      changeHadith();
    })
    function changeHadith (){
      hadithContainer.innerHTML = Hadiths[hadithIndex].arab;
      number.innerText = `300 - ${hadithIndex +1} `
    }
  })
}


let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");
links.forEach(link=>{
  link.addEventListener("click" , ()=>{
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let terget = link.dataset.filter;
    sections.forEach(section =>{
      if(section.classList.contains(terget)){
        section.scrollIntoView({
          behavior:"smooth"
        })
      }
      link.classList.add("active")
    })
  })
})

//Surah Api
getSurahs()

function getSurahs(){
  fetch("http://api.alquran.cloud/v1/meta")
  .then(res => res.json())
  .then(data =>{
    let surahs = data.data.surahs.references;
    let numberOfSurahs = 114;
    let temp =``;
    surahs.forEach(i=>{
      temp+=`
        <div class="surah">
        <p>${i.name}</p>
        <p>${i.englishName}</p>
      </div>
      `
    })
    document.querySelector(".surhasContainer").innerHTML =temp;
    let surahsTitles = document.querySelectorAll(".surah");
    let popup = document.querySelector(".surah-popup");
    let ayatContainer = document.querySelector(".ayat");
    surahsTitles.forEach((title , index) =>{
      title.addEventListener("click" ,()=>{
        fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
        .then((res)=> res.json())
        .then(data => {
          ayatContainer.innerHTML ="";
          let ayat = data.data.ayahs;
          ayat.forEach(aya =>{
            popup.classList.add("active");
            ayatContainer.innerHTML += `
            <p>(${aya.numberInSurah}) - ${aya.text}</p>
            `
          })
        })
      })
    })
    let closePopup = document.querySelector(".close-popup");
    closePopup.addEventListener("click" ,()=>{
      popup.classList.remove("active")
    })
  })
}
// اوقات الصلاه
let cards = document.querySelector(".cards");
getPrayTimes()
function getPrayTimes(){
  fetch("http://api.aladhan.com/v1/timingsByCity?city=Dubai&country=egypt%20Arab%20Emirates&method=8")
  .then(res => res.json())
  .then((data) =>{
    let times = data.data.timings;
    cards.innerHTML ="";
    for(let time in times ){
      console.log(times[time])
      console.log(time)
      cards.innerHTML +=`
      <div class="card">
      <div class="circle">
        <svg>
          <circle cx="100" cy="100" r="100"></circle>
        </svg>
        <div class="praytime">${times[time]}</div>
      </div>
      <p>${time}</p>
      </div>`
    }
  })

}

// btn scroll
scrollBtn.addEventListener("click" , ()=>{
  window.scrollTo({
    top: 0,
    behavior:"smooth"
  })
})

// active sidbar
let bars = document.querySelector(".bars");
let list = document.querySelector(".header .container ul");
let btnClose = document.querySelector(".close")
bars.addEventListener("click" ,()=>{
  list.classList.add("active");
})
btnClose.addEventListener("click" ,()=>{
  list.classList.remove("active");
})