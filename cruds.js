let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');

let mood = 'create';
let iforupdate;
//get total
function gettotal() {
    if (price.value != '') {
        let ruselt = (+price.value + +taxes.value + +ads.value);
        - +discount.value;
        total.innerHTML = ruselt;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
};

// create 
let datapro;
if (localStorage.prodct != null) {
    datapro = JSON.parse(localStorage.prodct);
} else {
    datapro = [];
}

create.onclick = function () {

    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count<= 100) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro)
            };

        } else {
            datapro[iforupdate] = newpro;
            mood = 'create';
            count.style.display = 'block';
            create.innerHTML = 'create';
        }
        cleardata();
    }

    if (datapro.length > 0) {
        localStorage.setItem('prodct', JSON.stringify(datapro));
    } else {
        localStorage.removeItem('prodct');
    }



    

    showpro();
};

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

function showpro() {
    let table = '';
    gettotal()
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr id ='${i}'>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td> 
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateing(${i})" id="btnupdate">update</button></td>
            <td><button onclick ="deletebtn(${i})"  id="btndelelet">delete</button></td>
        </tr>
        `;
        document.getElementById('tbody').innerHTML = table;

        let deleteall = document.getElementById('deleteall');
        if (datapro.length !== 0) {
            deleteall.innerHTML = `
             <button id='deleteallbtn' onclick ="delall()"> delete All(${datapro.length})</button>`;
        } else {
            deleteall.innerHTML = '';
        };

    };
}; showpro();

//delete

function deletebtn(i) {
    datapro.splice(i, 1);
    localStorage.prodct = JSON.stringify(datapro);
    let row = document.getElementById(i);
    row.innerHTML = '';
    let deleteallbtn = document.getElementById('deleteallbtn');
    deleteallbtn.remove();
    showpro();
};

//delete all
function delall() {
    localStorage.clear();
    datapro.splice(0, datapro.length);
    document.getElementById('tbody').innerHTML = '';
    let deleteallbtn = document.getElementById('deleteallbtn');
    deleteallbtn.remove();

    showpro();
};

//update
function updateing(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    gettotal();
    count.style.display = 'none';
    create.innerHTML = 'update';
    mood = 'update'
    iforupdate = i
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// saerch

let moodofsearch = 'title';

function searchbymood(id) {

    if (id == 'bytitle') {
        moodofsearch = 'title';

    } else {
        moodofsearch = 'category';
    }
    search.placeholder = 'search By ' + moodofsearch;
    search.focus();
    search.value = '';
    showpro();
}

function searchData(value) {

    let table = '';

    for (let i = 0; i < datapro.length; i++) {

        if (moodofsearch == 'title') {

            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr id ='${i}'>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td> 
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateing(${i})" id="btnupdate">update</button></td>
                <td><button onclick ="deletebtn(${i})"  id="btndelelet">delete</button></td>
            </tr>
            `
            }
        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr id ='${i}'>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td> 
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateing(${i})" id="btnupdate">update</button></td>
                <td><button onclick ="deletebtn(${i})"  id="btndelelet">delete</button></td>
            </tr>
            `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;

}