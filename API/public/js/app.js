// Gloabl reusable variables
const addingLoader = ` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Adding...`;
const generalLoader = ` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;                       

// -------------------------------- UTILITY FUNCTIONS -------------------------

const showModal = (id, data) => {
    $("label.error").hide();
    $(".error").removeClass("error");
    $('#' + id).modal();
}

const hideModal = (id, data) => {
    $('#' + id).modal("hide");
}

const showSuccess = (message, options) => {
    toastr.success(message);
}

const showError = (message, options) => {
    toastr.error(message);
}

const showLoader = function(selecter, data){
    document.querySelector(selecter).innerHTML = data.content;
    document.querySelector(selecter).disabled = true;
}

const hideLoader = function(selecter, data){
    document.querySelector(selecter).innerHTML = data.content;
    document.querySelector(selecter).disabled = false;
}
