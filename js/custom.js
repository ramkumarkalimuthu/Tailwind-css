const api_url = 'https://restcountries.com/v3/all?fields=name,flags,population,region,capital,timezones,languages,'
const itemsperpage = 4;
let currentpage = 1;
let items = [];

async function fetchData() {
    try {
        const response = await fetch(api_url);
        items = await response.json();
        //console.log(items);
        displayitem();
    }
    catch (error) {

        console.log("Error fetching data:", error);


    }

}

function displayitem() {
    const start = (currentpage - 1) * itemsperpage;
    const end = start + itemsperpage;
    const paginateditem = items.slice(start, end);
    const card = document.getElementById('card_item');
    card.innerHTML = paginateditem.map((item) => {
        return `<div class="border shadow-2xl bg-white rounded-2xl cards"  data-item="${item.name.common}">

        <img src="${item.flags[0]}" class="rounded-t-2xl object-cover w-[306px] h-[206px]"  alt="${item.name.common}">

        <div class="font-nunito p-4" id="card_body">
          <h1 class="font-bold text-blue900 text-xl" id="country-name"  data-item="${item.name.common}">${item.name.common}</h1>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950">Population:</span> ${item.population}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" data-filter=${item.region}>Region:</span> ${item.region}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" >Capital:</span> ${item.capital}</p>

        </div>     

      </div>`
    }).join("");

    updatepaginationbutton();
    

}

function updatepaginationbutton() {
    const totalpages = Math.ceil(items.length / itemsperpage);
    const showtotalpage = document.getElementById("totalpage_content");
    showtotalpage.innerText = totalpages;
    const showstartpage = document.getElementById("start_page");

    showstartpage.innerText = currentpage;

    const showendpage = document.getElementById("end_page");
    showendpage.innerText = itemsperpage;

    const pagecontent = document.getElementById("page_button");
    pagecontent.innerHTML = "";
    let startpages = Math.max(1, currentpage - 2);
    let endpages = Math.min(totalpages, currentpage + 2);
    //console.log( startpages, endpages);

    for (let i = startpages; i <= endpages; i++) {

        //return `<button class="bg-blue-400 text-white p-4">${i}</button>`
        const pagebutton = document.createElement("button");
        pagebutton.textContent = i;
        if(i===currentpage){
            pagebutton.className +="bg-blue950 "
        }
        pagecontent.appendChild(pagebutton);
        pagebutton.onclick = () => goTopage(i);
        pagebutton.className += " bg-blue900 text-white p-2 ";
    }

    const prevbtn= document.getElementById("prev");
    const nextbtn= document.getElementById("next");

   if(prevbtn.disabled = currentpage === 1) 
   {    
    prevbtn.className += " cursor-not-allowed bg-grey400 opacity-25 ";
   }
   else
   {
    prevbtn.classList.remove('cursor-not-allowed');
    prevbtn.classList.remove('bg-grey400');
    prevbtn.classList.remove('opacity-25');
    prevbtn.className += " bg-blue950 ";
   }
       

    if(nextbtn.disabled = currentpage === totalpages)
    {    
        nextbtn.className += " cursor-not-allowed bg-grey400 opacity-25 ";
    } 

    else
    {
        nextbtn.classList.remove('cursor-not-allowed');
        nextbtn.classList.remove('bg-grey400');
        nextbtn.classList.remove('opacity-25');
        nextbtn.className += " bg-blue950 ";
    }
        

}

function goTopage(page)
{
    currentpage = page;
    displayitem();
}

function prevpage(){
    if(currentpage>1){
        currentpage--;
        displayitem();
    }

}

function nextpage(){
    if(currentpage<Math.ceil(items.length / itemsperpage)){
        currentpage++;
        displayitem();
    }
}

/*document.getElementById('search').addEventListener('keyup', (e)=> {
    currentpage=1;
    fetchData(e.target.value);

});*/


//console.log(cardcontent);
const searchvalue = document.getElementById('search');
searchvalue.addEventListener('keyup', (e) => {
 
    searchtext=e.target.value.toLowerCase().trim();
    const cardcontent = document.querySelectorAll('.cards');
    //console.log(cardcontent);
 cardcontent.forEach((carditems) => {
   //console.log(carditems);
   const carddata = carditems.dataset.item;
   console.log(carddata);
 });

});


fetchData();