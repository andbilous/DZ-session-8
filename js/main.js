var btn = document.getElementById("play");

function transform() {
   arrToEdit = data.slice();
   arrToEdit.splice(5, 1);
   var editedArray = deleteIdField(arrToEdit);
   editingFields(editedArray);
   var resultArray = editedArray.filter(function (car) {
      return car.isVisible === true;
   });
   printResult(resultArray);
}

function editingFields(initialList) {
   initialList.forEach(function (car) {
      car.name = transformName(car.name);
      car.url = editUrl(car.url);
      car.description = editDescription(car.description);
      car.date = transformDate(car.date);
      car.isVisible = car.params.status;
      car.params = car.params.status + "=>" + car.params.progress;
   })
}

function transformDate(date) {
   var tmpDate = moment(date); //  
   var resultDate = tmpDate.format('YYYY/DD/MM H:mm:ss');
   return resultDate;
}

function editDescription(description) {
   if (description.length < 15) {
      return description;
   } else
      description = description.slice(0, 15) + '...';
   return description;
}

function editUrl(url) {
   return 'http://' + url;
}

function transformName(name) {
   var charArray = [];
   var result = name.toLowerCase();
   charArray = result.split('');
   charArray[0] = charArray[0].toUpperCase();
   return result;
}

function deleteIdField(input) {
   var resArray = [];
   input.forEach(function (item, index) {
      resArray.push({
         date: item.date,
         name: item.name,
         description: item.description,
         params: item.params,
         url: item.url
      });
   })
   return resArray;
}

function printResult(result) {
   console.log(result);
   var ul = document.createElement('ul');
   ul.style.listStyle = 'none';
   document.getElementById('result').appendChild(ul);
   result.forEach(function (car) {
      var carItem = document.createElement('li');
      carItem.innerHTML = car.name + '<br>' + car.description + '\n<img src=' + car.url + ' />\n';
      ul.appendChild(carItem);
   })
}


btn.addEventListener("click", transform);