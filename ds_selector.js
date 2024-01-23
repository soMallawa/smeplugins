//DS Division selector
var district_input = document.getElementById("id_profile_field_user_dist");

const api_url = 'https://admin.smeconnect.lk/api/';
const ds_selector = createDsSelector("fitem_id_profile_field_user_dist");
hideElement("fitem_id_profile_field_ds_division");

function getDivisions($districtName) {
  let url = api_url + 'ds-divisions?filters[district][name][$eq]=' + $districtName;

  return fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
}

district_input.addEventListener('change', function handleChange(event) {
  let district = event.target.value;
  getDivisions(district).then(response => response.json())
  .then((data) => {
    let divisions = data['data'];
    const division_names = divisions.map(item => item.attributes.name);
    setDivisions(division_names, ds_selector);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  

});

function createDsSelector(container_id) {
  // Create a select element

   // Create a div element
   var divElement = document.createElement("div");

   // Add Bootstrap classes to the div element
   divElement.classList.add("col-md-9", "form-inline", "align-items-start", "mt-3");

   
  var selectElement = document.createElement("select");
  let newOption = document.createElement('option');

  newOption.value = null;
  newOption.text = "District Secretary Division";
  newOption.disabled;

  selectElement.appendChild(newOption);



  // Set an id for the select element (optional)
  selectElement.id = "custom_ds_selector";
  selectElement.classList.add("custom-select");
  // Get the container where the select element will be appended

  selectElement.addEventListener('change', function handleChange(event) {
    let ds_text = document.getElementById("id_profile_field_ds_division");
    ds_text.value = event.target.value;
    //console.log("Selected: ", event.target.value);
  });

  var container = document.getElementById(container_id);

  divElement.appendChild(selectElement);
  container.appendChild(divElement);
  return selectElement.id;
}

function setDivisions(divisions, selector_id) {
  var ds_select = document.getElementById(selector_id);
  ds_select.replaceChildren();

  //console.log(divisions);

  //let divisions = divisions;

  divisions.forEach(ds_division => {
      let newOption = document.createElement('option');
      newOption.value = ds_division;
      newOption.text = ds_division;

  // Append the new option to the select element
  ds_select.appendChild(newOption);
  });
}

function hideElement(id){
  let elm = document.getElementById(id);
  elm.classList.add("d-none");

}
