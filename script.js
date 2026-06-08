const places=[
{title:"ВДНХ",category:"walk",mood:"Фонтаны и красивые павильоны",description:"Спокойная прогулка, красивые фото и разговоры без спешки.",image:"images/vdnh.jpg",tag:"романтичная прогулка"},
{title:"Речной трамвайчик",category:"view",mood:"Москва с воды",description:"Вечерняя прогулка по Москве-реке с видом на город.",image:"images/river.jpg",tag:"вечер с видом"},
{title:"Антикафе с минипигами",category:"cute",mood:"Мило и необычно",description:"Свидание с животными, какао и лёгкой атмосферой.",image:"images/pigs.jpg",tag:"самый милый вариант"},
{title:"Москва-Сити",category:"view",mood:"Небоскрёбы и огни",description:"Можно погулять рядом, подняться на смотровую или завершить вечер ужином.",image:"images/city.jpg",tag:"панорамный вечер"},
{title:"White Rabbit",category:"food",mood:"Ужин с панорамным видом",description:"Красивый ресторанный формат для особенного вечера.",image:"images/rabbit.jpg",tag:"особенный ужин"},
{title:"Патриаршие пруды",category:"walk",mood:"Кофе, прогулка и уют",description:"Очень московская атмосфера, спокойная прогулка и разговоры.",image:"images/patriarch.jpg",tag:"уютный вечер"},
{title:"Зарядье",category:"walk",mood:"Парк и парящий мост",description:"Центр Москвы, красивые виды и фотографии.",image:"images/zaryadye.jpg",tag:"красивый центр"},
{title:"Смотровая площадка",category:"view",mood:"Вид на город с высоты",description:"Вариант для вау-эффекта и запоминающегося вечера.",image:"images/rooftop.jpg",tag:"вау-вид"},
{title:"Аптекарский огород",category:"walk",mood:"Цветы и оранжереи",description:"Нежное свидание среди растений и зелени.",image:"images/garden.jpg",tag:"нежная прогулка"},
{title:"Кофейня с десертами",category:"food",mood:"Какао и сладкое",description:"Уютный столик, десерт и хороший разговор.",image:"images/coffee.jpg",tag:"уют и сладкое"},
{title:"VIP-кинотеатр",category:"cute",mood:"Уютное кино на двоих",description:"Лёгкий фильм, попкорн и спокойный вечер.",image:"images/cinema.jpg",tag:"спокойный вечер"},
{title:"ГУМ и Красная площадь",category:"walk",mood:"Классика Москвы",description:"Огни ГУМа, центр города, мороженое и фото.",image:"images/gum.jpg",tag:"московская классика"},
{title:"Пушкинский музей",category:"cute",mood:"Красиво и спокойно",description:"Искусство, прогулка и кофе после музея.",image:"images/museum.jpg",tag:"культурное свидание"},
{title:"Парк Горького",category:"walk",mood:"Набережная и прогулка",description:"Классика для свидания: пространство, воздух и приятная атмосфера.",image:"images/park.jpg",tag:"лёгкая прогулка"}
];

let selectedPlace=null,currentCategory="all";
const grid=document.getElementById("placesGrid");

function renderPlaces(){
  grid.innerHTML="";
  places.filter(p=>currentCategory==="all"||p.category===currentCategory).forEach(place=>{
    const card=document.createElement("article");
    card.className="place-card";
    if(selectedPlace&&selectedPlace.title===place.title) card.classList.add("active");

    card.innerHTML=`
      <img src="${place.image}" alt="${place.title}" loading="lazy">
      <div class="place-info">
        <h3>${place.title}</h3>
        <p><b>${place.mood}</b></p>
        <p>${place.description}</p>
        <span class="chip">${place.tag}</span>
      </div>
    `;

    card.addEventListener("click",()=>{
      selectedPlace=place;
      updateSelectedPreview();
      renderPlaces();
      document.getElementById("plan").scrollIntoView({behavior:"smooth"});
    });

    grid.appendChild(card);
  });
}

function filterPlaces(category,button){
  currentCategory=category;
  document.querySelectorAll(".filter").forEach(i=>i.classList.remove("active"));
  button.classList.add("active");
  renderPlaces();
}

function updateSelectedPreview(){
  const preview=document.getElementById("selectedPreview");
  if(!selectedPlace){
    preview.textContent="Пока место не выбрано 💙";
    return;
  }
  preview.innerHTML=`<b>Выбрано:</b> ${selectedPlace.title}<br><span>${selectedPlace.mood}</span>`;
}

function createInvite(){
  const date=document.getElementById("dateInput").value;
  const time=document.getElementById("timeInput").value;
  const wish=document.getElementById("wishInput").value.trim();
  const result=document.getElementById("result");
  const resultText=document.getElementById("resultText");

  if(!selectedPlace){
    alert("Сначала выбери место для свидания 💙");
    document.getElementById("places").scrollIntoView({behavior:"smooth"});
    return;
  }

  if(!date||!time){
    alert("Выбери дату и время 💌");
    return;
  }

  const formattedDate=new Date(date).toLocaleDateString("ru-RU",{
    day:"numeric",month:"long",year:"numeric"
  });

  result.style.display="block";
  resultText.innerHTML=`
    <b>Место:</b> ${selectedPlace.title}<br>
    <b>Дата:</b> ${formattedDate}<br>
    <b>Время:</b> ${time}<br><br>
    ${selectedPlace.description}<br><br>
    ${wish?`<i>«${wish}»</i><br><br>`:""}
    Обещаю красивый вечер, хорошее настроение и заботу о каждой детали ✨
  `;
  result.scrollIntoView({behavior:"smooth"});
}

function acceptInvite(){
  document.getElementById("acceptedText").textContent="Ура! Тогда это официально будет очень милое свидание 💙";
}

renderPlaces();
updateSelectedPreview();
