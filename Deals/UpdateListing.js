$('form').on('focus', 'input[type=number]', function (e) {
  $(this).on('wheel.disableScroll', function (e) {
    e.preventDefault()
  })
})
$('form').on('blur', 'input[type=number]', function (e) {
  $(this).off('wheel.disableScroll')
})


    var we_tabs_next_button = '[bloc=next-question]';
    var we_tabs_prev_button = '[bloc=prev-question]';
    var we_tabs_active_class = 'active';

    var tabList = ['Images', 'Details', 'Description', 'Tags', 'Numbers', 'Message'];

    openTab(tabList[0]);

    $(we_tabs_next_button).on("click", function () {
        if ($(".w--tab-active").attr("data-w-tab") === "Message") {
            // Click the button with the id "Submit"
            $("#Submit").click();
        } else {
            navigateTabs("next");
        }
    });

    $(we_tabs_prev_button).on("click", function () {
        navigateTabs("prev");
    });

    function navigateTabs(direction) {
        var activeTab = $(".w--tab-active").attr("data-w-tab");
        var indexOfActiveTab = tabList.indexOf(activeTab);
        var indexOfNextTab = indexOfActiveTab + 1;
        var indexOfPrevTab = indexOfActiveTab - 1;
        var nextTab = tabList[indexOfNextTab];
        var prevTab = tabList[indexOfPrevTab];

        window.scrollTo(0, 0);  // This ensures the page returns to the top

        if (direction === "next" && indexOfNextTab < tabList.length) {
            openTab(nextTab);
        } else if (direction === "prev" && indexOfPrevTab >= 0) {
            openTab(prevTab);
        }

        updateButtonsState(indexOfActiveTab);
    }

    function updateButtonsState(indexOfActiveTab) {
        if (indexOfActiveTab === 0) {
            $(we_tabs_prev_button).removeClass(we_tabs_active_class);
        } else if (indexOfActiveTab === tabList.length - 1) {
            $(we_tabs_next_button).removeClass(we_tabs_active_class);
        } else {
            $(we_tabs_next_button).addClass(we_tabs_active_class);
            $(we_tabs_prev_button).addClass(we_tabs_active_class);
        }
    }

    function openTab(tab) {
    var tab_link = "a[data-w-tab=" + tab + "]";
    tab = "div[data-w-tab=" + tab + "]";

    $(tab).siblings().removeClass("w--tab-active");
    $(tab).addClass("w--tab-active");
    $(tab_link).siblings("a").removeClass("w--current");
    $(tab_link).addClass("w--current");

    // Update the button text based on the tab
    if (tab === "div[data-w-tab=Message]") {
        $(we_tabs_next_button).text("Create Listing");
    } else {
        $(we_tabs_next_button).text("Next");
    }

    // Log the active tab name and the current button text
    console.log("Active Tab:", tab);
    console.log("Button Text:", $(we_tabs_next_button).text());
}


    var widget = uploadcare.Widget("[role=uploadcare-uploader]");
    widget.onUploadComplete(function (info) {
      widget.inputElement.value = info.cdnUrl;
    });

// Jquery Dependency

$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
//
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}


$("input[data-type='percentage']").on({
    keyup: function() {
      formatPercentage($(this));
    },
    blur: function() { 
      formatPercentage($(this), "blur");
    }
});


function formatPercentage(input, blur) {
    var input_val = input.val();
    input_val = input_val.replace(/[^0-9]/g, ''); // Remove non-numeric chars

    while (input_val.length < 3) {
        input_val = '0' + input_val; // Add leading zeros
    }
    
    // Split into left and right parts
    var left_side = input_val.substring(0, input_val.length - 2);
    var right_side = input_val.substring(input_val.length - 2);

    if (blur === "blur") {
        while (right_side.length < 2) {
            right_side += '0'; // Ensure two decimals
        }
    }

    // Combine and append '%'
    input_val = left_side + "." + right_side + "%";

    // Limit the whole number to 2 digits
    if (left_side.length > 2) {
        input_val = input_val.substring(1);
    }

    // Update the input
    input.val(input_val);

    // Ensure caret is at end of input
    input[0].setSelectionRange(input_val.length, input_val.length);
}

    // Select the form using its ID
    document.getElementById('updateListing').addEventListener('submit', function (event) {
        // The default form submission will continue
        setTimeout(function () {
            window.location.href = "https://www.usefrontdoor.com/deals/my-deals";
        }, 5000); // 5000 milliseconds = 5 seconds
    });

// Add this for multi-selection without using ctrl key for select2
$('option').mousedown(function(e) {
    e.preventDefault();
    var originalScrollTop = $(this).parent().scrollTop();
    console.log(originalScrollTop);
    $(this).prop('selected', $(this).prop('selected') ? false : true);
    var self = this;
    $(this).parent().focus();
    setTimeout(function() {
        $(self).parent().scrollTop(originalScrollTop);
    }, 0);
    return false;
});

// Update list for Select2
var data = [
    "1% Rule", 
    "50% Rule", 
    "70% Rule", 
    "Airbnb", 
    "BRRRR", 
    "Cash Flow", 
    "Development", 
    "Fix-n-Flip", 
    "High Equity", 
    "Land", 
    "Low Entry", 
    "Low Interest", 
    "Rental", 
    "Seller Finance", 
    "STR", 
    "Subject-To", 
    "Wrap"
];
var placeholder = "Select Category";
$(".mySelect").select2({
    data: data,
    placeholder: placeholder,
    allowClear: false,
    minimumResultsForSearch: 5
});

// New code starts here
$(document).ready(function () {
    // Listen for changes on the multi-select dropdown
    $('#Listing-Labels').on('change', function () {
        // Gather selected option values into an array
        var selectedValues = $(this).val() || [];

        // Join the values with a comma and set it to the 'Tags' input field
        $('#Tags').val(selectedValues.join(', '));
    });

    // Before form submission, deselect all options from the multi-select
    // to ensure they are not included in the form submission
    $('form').on('submit', function () {
        $('#Listing-Labels option').prop('selected', false);
    });
});

let checkCount = 0;  // To keep track of how many times we've checked

const interval = setInterval(() => {
    // Increment the check count
    checkCount++;

    // Execute your function here
    checkListing();

    // If we've checked 10 times (which is 30 seconds at 3-second intervals), clear the interval
    if (checkCount >= 3) {
        clearInterval(interval);
    }
}, 4000);  // 3 seconds interval

function checkListing() {
    // 1. Grab the `listingID` value from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const listingIDValue = urlParams.get('listingID');
    console.log('listingIDValue:', listingIDValue);

    // 2. URL encode the listingIDValue and construct the NoCodeAPI URL
    const encodedListingID = encodeURIComponent(`Slug="${listingIDValue}"`);
    const apiUrl = `https://v1.nocodeapi.com/frontdoor/airtable/vktIHOcIfjTcpnvI?tableName=$Deals&api_key=oDEXttypMcVRLZFdZ&view=Deals&filterByFormula=${encodedListingID}`;
    console.log('API URL:', apiUrl);

    // 3. Fetch data from Airtable via NoCodeAPI
    fetch(apiUrl)
        .then(response => {
            console.log('API Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            if (data && data.records && data.records.length > 0) {
                const record = data.records[0].fields;
                console.log('Selected Record:', record);
                prefillForm(record);
            } else {
                console.log('No records found in the fetched data.');
            }
        })
        .catch(error => {
            console.error('Error fetching data from Airtable:', error);
        });
}

// 4. Prefill the form fields using the data
function prefillForm(record) {
    const mapping = {
        'Beds': 'Listing-Bed',
        'Baths': 'Listing-Baths',
        'Sqft': 'Listing-Sqft',
        'Lot Size': 'Listing-Lot',
        'Floors': 'Listing-Floors',
        'Year': 'Listing-Year',
        'Garage': 'Listing-Garage',
        'Assessed': 'Numbers_Assessed',
        'Taxes': 'Numbers_Taxes',
        'AirtableID': 'AirtableID'
    };

    for (let key in mapping) {
        let htmlElement = document.getElementById(mapping[key]);
        
        // Check if the key exists in the record and is not empty 
        // AND if the corresponding HTML element exists
        if (record[key] && htmlElement) {
            console.log(`Setting field ${mapping[key]} with value:`, record[key]);
            htmlElement.value = record[key];
        } else if (!record[key]) {
            console.log(`No value found for field ${key}.`);
        } else if (!htmlElement) {
            console.log(`HTML element with ID ${mapping[key]} not found.`);
        }
    }
}
