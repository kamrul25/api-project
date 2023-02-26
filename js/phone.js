const loadPhones = async (searchText, dataLimit) => {
  try {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
  } catch (error) {
    console.log(error);
  }
};

const displayPhones = (phones , dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // display only 10 phones
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 12){
    phones = phones.slice(0, 12);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');
  }
 
  // display massage when no phone found
  const noPhone = document.getElementById("no-found-massage");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  //   display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
          <img src="${phone.image}" class="card-img-top img-fluid" alt="">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
          </div>
        </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
   // stopSpinners
   toggleSpinner(false);
};

const processSearch = (dataLimit) =>{
   //start Spinners
   toggleSpinner(true);
   const searchText = document.getElementById("search-field").value;
   loadPhones(searchText, dataLimit);
}
// search button handel
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(12);
});
document.getElementById("search-field").addEventListener("keyup", function (event) {
  if(event.key == 'Enter'){
    processSearch(12);
  }
});

// Spinner 
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
};

// not the best way to load show all
document.getElementById("btn-show-all").addEventListener('click', function(){
  processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = phone.name;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML =`
  <p>ChipSet:- ${phone.mainFeatures.chipSet}</p>
  <p>DisplaySize:- ${phone.mainFeatures.displaySize}</p>
  <p>Storage:- ${phone.mainFeatures.storage}</p>
  <p>WLAN:- ${phone.others.WLAN}</p>
  <p>Bluetooth:- ${phone.others.Bluetooth}</p>
  <p>ReleaseDate:- ${phone.releaseDate ? phone.releaseDate : 'No releaseDate found' }</p>
  `;
}
// loadPhones('apple');
