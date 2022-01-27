const api_url = "https://esdsem6fa2.herokuapp.com/food"
function loadData(records = []) {
var table_data = "";
for (let i = 0; i < records.length; i++) {
table_data += `<tr>`;
table_data += `<td>${records[i].customerid}</td>`;
table_data += `<td>${records[i].name}</td>`;
table_data += `<td>${records[i].userid}</td>`;
table_data += `<td>${records[i].email}</td>`;
table_data += `<td>${records[i].contact}</td>`;
table_data += `<td>${records[i].age}</td>`;
table_data += `<td>`;
table_data += `<a href="edit.html?id=${records[i]._id}"><button
class="btn btn-primary">Edit</button></a>`;
table_data += '&nbsp;&nbsp;';
table_data += `<button class="btn btn-danger"
onclick=deleteData('${records[i]._id}')>Delete</button>`;
table_data += `</td>`;
table_data += `</tr>`;
}
//console.log(table_data);
document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
fetch(api_url)
.then((response) => response.json())
.then((data) => {
console.table(data);
loadData(data);
});
}
function getDataById(id) {
fetch(`${api_url}/${id}`)
.then((response) => response.json())
.then((data) => {
console.log(data);
document.getElementById("id").value = data._id;
document.getElementById("customerid").value = data.customerid;
document.getElementById("name").value = data.name;
document.getElementById("userid").value = data.userid;
document.getElementById("email").value = data.email;
document.getElementById("contact").value = data.contact;
document.getElementById("age").value = data.age;
})
}
function postData() {
var customerid = document.getElementById("customerid").value;
var name = document.getElementById("name").value;
var userid = document.getElementById("userid").value;
var email = document.getElementById("email").value;
var contact = document.getElementById("contact").value;
var age = document.getElementById("age").value;
data = {customerid: customerid, name: name, userid: userid, email: email, contact:
    contact, age: age};
fetch(api_url, {
method: "POST",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.href = "index.html";
})
}
function putData() {
var _id = document.getElementById("id").value;
var customerid = document.getElementById("customerid").value;
var name = document.getElementById("name").value;
var userid = document.getElementById("userid").value;
var email = document.getElementById("email").value;
var contact = document.getElementById("contact").value;
var age = document.getElementById("age").value;
data = {_id:_id,customerid: customerid, name: name, userid: userid, email: email, contact:
    contact, age: age};
fetch(api_url, {
method: "PUT",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.table(data);
window.location.href = "index.html";
})
}
function deleteData(id) {
user_input = confirm("Are you sure you want to delete this record?");
if (user_input) {
fetch(api_url, {
method: "DELETE",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify({ "_id": id })
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.reload();
})
}
}