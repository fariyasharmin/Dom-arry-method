const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const shortBtn = document.getElementById('short');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

getRamdomUser();


//fetch random user and add money
async function getRamdomUser(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
 
  const user = data.results[0];
  const newUser = {
      name:`${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

// double money
function doublemoney(){
  data = data.map((user) => {
    return{ ...user , money:user.money * 2 }
  });
  updateDom();
}

//short by richest
function shortByRichest(){
data.sort((a, b) => a.money - b.money);
updateDom();
}

// only show Million
function showMillionaires(){
  data=data.filter( user => user.money > 1000000);
  updateDom();
}
 
//calculate the total wealth
function calculateWealth(){
  const wealth = data.reduce((acc, user) =>(acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// add new obj to data arr
function addData(obj){
    data.push(obj);

    updateDom();
}

//updateDom

function updateDom(providedData = data){
// clear main div
main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

providedData.forEach((item) => {
const element = document.createElement('div');
element.classList.add('person');
element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
main.appendChild(element);

});
}


//format money aS number
function formatMoney(number){
return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

addUserBtn.addEventListener('click', getRamdomUser);
doubleBtn.addEventListener('click', doublemoney);
shortBtn.addEventListener('click', shortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);