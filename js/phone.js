const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(data.data);
    // console.log(searchText);
    const noData = document.getElementById('no-data');
    if(phones.length === 0){
        console.log('No Data Found');    
        noData.classList.remove('hidden');
    }
    else{
        noData.classList.add('hidden');
    }
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phonecontainer = document.getElementById('phone-container');
    phonecontainer.textContent = '';
    const showAllContainer = document.getElementById('show-all');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
        phones = phones.slice(0, 12);
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    phones.forEach(element => {
        console.log(element);
        const phonecard = document.createElement('div');
        phonecard.classList = `card p-4 bg-base-100 shadow-xl`
        phonecard.innerHTML = `
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${element.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `
        phonecontainer.appendChild(phonecard);
    });
    loadingSpinner(false);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    showPhoneDetails(data.data);
}
const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetails = document.getElementById('show-details-container')
    showDetails.innerHTML = `
    <div>
        <div class="flex justify-center bg-sky-100 m-2 p-4">
            <img src="${phone.image}" alt="">
        </div>
        <h1 class="text-2xl font-bold">${phone.name}</h1>
        <p><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
        <p><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
        <p><span class="font-bold">Release Date:</span> ${phone.releaseDate}</p>
        <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
        <p><span class="font-bold">GPS:</span> ${phone.others?.GPS || 'No GPS Available'}</p>
        <p><span class="font-bold">GPS:</span> ${phone.others?.GPS? phone.others.GPS:'No GPS Available'}</p>
    </div>
    `
    // show_details_modal.showModal(phone);
}

const searchButton = (isShowAll) => {
    const serachField = document.getElementById('input-field');
    const searchText = serachField.value;
    loadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const searchButton2 = (isShowAll) => {
    const serachField = document.getElementById('input-field2');
    const searchText = serachField.value;
    loadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    searchButton(true);
    searchButton2(true);
}

// loadPhone();