const searchvalue = document.getElementById('search');

searchvalue.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase().trim();
//console.log(value);
if(value){
const searchapi =`https://restcountries.com/v3/name/${value}`
search(searchapi);
}

})

async function search(searchapi){
    const searchitem = await fetch(searchapi);
            searchdata = await searchitem.json();
            console.log(searchdata);


            
            //const start = (currentpage - 1) * itemsperpage;
   // const end = start + itemsperpage;
    //const paginateditem = searchdata.slice(start, end);
    const card = document.getElementById('card_item');
    card.innerHTML = searchdata.map((searchitem) => {
        return `<div class="border shadow-2xl bg-white rounded-2xl" id="card">

        <img src="${searchitem.flags[0]}" class="rounded-t-2xl object-cover w-[306px] h-[206px]"  alt="${searchitem.name.common}">

        <div class="font-nunito p-4">
          <h1 class="font-bold text-blue900 text-xl" id="country-name" data-item="${searchitem.name.common}">${searchitem.name.common}</h1>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950">Population:</span> ${searchitem.population}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" data-filter=${searchitem.region}>Region:</span> ${searchitem.region}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" >Capital:</span> ${searchitem.capital}</p>

        </div>     

      </div>`
    }).join("");

    
        }