const api_url = 'https://restcountries.com/v3/all?fields=name,flags,population,region,capital,timezones,languages,'
//console.log(api_url)
const sectioncard = document.querySelector('.card_item');

window.addEventListener('DOMContentLoaded', function () {
    getcountries().catch((error) => {
      console.error('error!')
      console.error(error)
    })
    getfilter().catch((error) => {
      console.error('error!')
      console.error(error)
    })
  
  })

  async function getcountries() {
    const response = await fetch(api_url)
    data = await response.json()
    console.log(data);

    let displaydata = data.map(function (item) {
        console.log(item);
        return ` <div class="border shadow-2xl bg-white rounded-2xl ">

        <img src="${item.flags[0]}" class="rounded-t-2xl object-cover w-[306px] h-[206px]"  alt="${item.name.common}">

        <div class="font-nunito p-4">
          <h1 class="font-bold text-blue900 text-2xl ">${item.name.official}</h1>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950">Population:</span> ${item.population}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950">Region:</span> ${item.region}</p>
          <p class="font-normal pt-1 text-grey400"><span class="font-bold text-grey950" >Capital:</span> ${item.capital}</p>

        </div>



      

      </div>`

    })

    displaydata = displaydata.join('')
    sectioncard.innerHTML = displaydata
   
  }

  const filterbtn = document.querySelector('.filterselect')

  async function getfilter() {
    const response = await fetch(api_url)
    const datas = await response.json()
    const filterdata = ['All', ...new Set(datas.map((item) => item.region))]
    filterdata.pop()
    console.log(filterdata)
    let filteritem = filterdata.map((regionitem) => {
      return `<option value="${regionitem}"> ${regionitem} </option>`
    })
  
    filteritem = filteritem.join('')
    filterbtn.innerHTML = filteritem
  }

  filterbtn.addEventListener('change', (e) => {
    const { value } = e.target
  
    const regionname = document.querySelectorAll('.country-region')
  
    regionname.forEach((region) => {
      //console.log(name.innerText);
      if (region.innerText.includes(value) || value === 'All') {
        region.parentElement.parentElement.style.display = 'flex'
      } else {
        region.parentElement.parentElement.style.display = 'none'
      }
    })
  
    // console.log(val);
  })
  
  const url_string = document.URL; //window.location.href
      const url = new URL(url_string);
      const c = url.searchParams.get("name");
      console.log(c);