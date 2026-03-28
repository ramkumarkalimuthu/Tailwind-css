const api_url = 'https://restcountries.com/v3/all?fields=name,flags,population,region,capital,timezones,languages,'
let allData = [];      // full API data
let filteredData = []; // after search
const itemsperpage = 8;
let currentpage = 1;
let items = [];

async function fetchData() {
    try {
        const response = await fetch(api_url);
        items = await response.json();
        //console.log(items);
        allData = items.slice(0, 250); // simulate 250 records
        filteredData = [...allData];
         console.log(filteredData);

        displayitem();
        updatepaginationbutton();
        
        
    }
    catch (error) {

        console.log("Error fetching data:", error);


    }

}

function displayitem() {
    const start = (currentpage - 1) * itemsperpage;
    const end = start + itemsperpage;
    const paginateditem = filteredData.slice(start, end);
    const card = document.getElementById('card_item');
    card.innerHTML = paginateditem.map((item) => {
        return `<div class="border shadow-2xl bg-white rounded-2xl cards"  data-item="${item.name.common}">

        <img src="${item.flags[0]}" class="rounded-t-2xl object-cover w-[306px] h-[206px] sm:w-[350px]"  alt="${item.name.common}">

        <div class="font-nunito p-4" id="card_body">
          <h1 class="font-bold text-blue900 text-xl" id="country-name"  data-item="${item.name.common}">${item.name.common}</h1>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950">Population:</span> ${item.population}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" data-filter=${item.region}>Region:</span> ${item.region}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" >Capital:</span> ${item.capital}</p>

        </div>     

      </div>`
    }).join("");
   
 updateEntryInfo();
   
    

}

function updatepaginationbutton() {
    const totalpages = Math.ceil(filteredData.length / itemsperpage);   

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
            pagebutton.className +=" bg-blue950 ";
            

        }
        pagecontent.appendChild(pagebutton);
        pagebutton.onclick = () => goTopage(i);
        pagebutton.className += " bg-blue900 text-white p-2 ";
    }

    const prevbtn= document.getElementById("prev");
    const nextbtn= document.getElementById("next");
prevbtn.disabled = currentpage === 1;
nextbtn.disabled = currentpage === totalpages;
   if(prevbtn.disabled) 
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
       

    if(nextbtn.disabled)
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
    updatepaginationbutton();
}

function prevpage(){
    if(currentpage>1){
        currentpage--;
        displayitem();
         updatepaginationbutton();
    }

}

function nextpage(){
    if(currentpage<Math.ceil(filteredData.length / itemsperpage)){
        currentpage++;
        displayitem();
        updatepaginationbutton();
    }
}




// Search
document.getElementById('search').addEventListener('input', function () {
  const value = this.value.toLowerCase();

  filteredData = allData.filter(item =>
    item.name.common.toLowerCase().includes(value)
  );

  currentpage = 1; // FIXED
  displayitem();
  updatepaginationbutton();
  // ADD THIS
});



function updateEntryInfo() {
  const total = filteredData.length;

  if (total === 0) {
    document.getElementById('entryInfo').innerText = "No entries found";
    return;
  }

  const start = (currentpage - 1) * itemsperpage + 1;
  const end = Math.min(currentpage * itemsperpage, total);

  document.getElementById('entryInfo').innerText =
    `Showing ${start} to ${end} of ${total} entries`;
   
}



fetchData();
