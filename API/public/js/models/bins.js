var binsHTML = ""

const getBinData = async function(url, binLoc, binNum, binID){
    try{
        const response =  await fetch(url);
        const binData =  await response.json();

        if(binData.error == "Bin data not found"){
            return showError("No bin data found in Bin " + binNum)
        }

        binsHTML += generateBinCard(binData, binLoc, binNum, binID);
        document.querySelector("#card-wrapper").innerHTML = binsHTML;

    } catch(e){
        console.log(e)
    }
}

const getBin = async function(number){
    url1 = "/api/bins/" + number;
    try{
        const response =  await fetch(url1);
        const bin =  await response.json();
        
        if(bin.error == "Bin not found"){
            return showError("Bin not Found!");
        } 
        var url2 = "/api/bindata/" + bin._id;
        getBinData(url2, bin.binLocation, bin.binNumber, bin._id);

    } catch(e){
        console.log(e)
    }

}

const getBins = async function(){
    
    const url = "/api/bins";

    try{
        const response = await fetch(url);
        const bins = await response.json();

        localStorage.setItem("totalBins", bins.length);

        if (bins.length <1){
            return document.querySelector("#card-wrapper").innerHTML = "<p>No Bins found!</p>";
        }
        
        var binsHTML = "";
        bins.forEach( async(bin) => {
            var binNum = bin.binNumber;
            var binID = bin._id

            var url = "/api/bindata/" + binID;

            getBinData(url, bin.binLocation, binNum, binID);
        });

    }  catch(error){
        console.log(error);
    }
    
}

const createBin = async function(){
    const url1 = "/api/bins";
    // const url2 = "/api/bindata";

    const bin ={
        binNumber : document.querySelector("#binNumber").value,
        binLocation : document.querySelector("#binLocation").value,
        compostStatus : document.querySelector("#compostStatus").value
    }
    
    // const data ={
    //     binNumber :  document.querySelector("#binNumber").value,
    //     compostStatus : document.querySelector("#compostStatus").value
    // }

    hideModal("BinCreateModal");
    showLoader("#btn_add", {content: addingLoader});
    

    try{
        const response1 = await fetch(url1, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(bin)
        })

        // const response2 = await fetch(url2, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type" : "application/json"
        //     },
        //     body : JSON.stringify(data)
        // })

        const newBin = await response1.json();
        // const newData = await response2.json();

    
        if(!newBin){
            return showError("Unable to add Bin.");
        }

        // if(!newData){
        //     return showError("Unable to add Data.");
        // }

        const binCard = generateBinCard(newBin, newBin.binLocation, newBin.binNumber, newBin._id);
    
        const binList = document.querySelector("#card-wrapper");
        binList.innerHTML += binCard ;
    
        
        showSuccess("Bin successfully added!");
        

    } catch(e){
        console.log(e);
        showError("Something went wrong");
    }finally{
        hideLoader("#btn_add", {content: "ADD a BIN"});
    }
}

const initiateUpdate = async function(id){
    const url = "/api/bins/" + id;
    
    const locationInput =  document.querySelector("#Update-binLocation");
    const compostInput =  document.querySelector("#Update-compostStatus");
    updateValidation.resetForm();
    locationInput.classList.remove("error");
    compostInput.classList.remove("error");

    try{
        const response = await fetch(url);
        const bin = await response.json();

        if(!bin){
            console.log("No bin found");
        }

        document.querySelector("#Update-binLocation").value = bin.binLocation;
        document.querySelector("#Update-compostStatus").value = bin.compostStatus;
        document.querySelector("#Update-binNumber").value = bin.binNumber;
        localStorage.setItem("updBinID", bin._id);
        $("#BinUpdateModal").modal();

    } catch(e){
        console.log(e);
    }
}

const updateBin = async function (){
    const binNum = document.querySelector("#Update-binNumber").value;
    const binID = localStorage.getItem("updBinID");
    const url1 = "/api/bins/" + binNum;
    const url2 = "/api/binData/" + binID;

    hideModal("BinUpdateModal");
    showLoader("#bin-"+binNum + " .btn-primary", {content: generalLoader});

    const bin ={
        binLocation : document.querySelector("#Update-binLocation").value,
        compostStatus : document.querySelector("#Update-compostStatus").value
    }

    const binData ={
        compostStatus : document.querySelector("#Update-compostStatus").value
    }

    try{
        const response1 = await fetch(url1, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(bin)
        });

        const response2 = await fetch(url2, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(binData)
        });

        const uptBin = await response1.json();

        if(!uptBin){
            return showError("Bin not Found");
        }

        
        const x = document.querySelector("#bin-" + binNum +" table").rows[5].cells;
        x[1].innerHTML = uptBin.binLocation;
        const y = document.querySelector("#bin-" + binNum +" table").rows[4].cells;
        y[1].innerHTML = uptBin.compostStatus;
        

        
        showSuccess("Bin successfully updated!");
    

    } catch(e){
        showError("Unable to update the Bin!");
    }finally{
        hideLoader("#bin-"+binNum + " .btn-primary", {content: `<i class="fa-solid fa-pen-to-square"></i>`});
    }

    
}

const initiateDelete = function(id){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this bin!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            resetBin(id);
            deleteBin(id);
          swal("Poof! Your Bin has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Bin is safe!");
        }
      });
      localStorage.setItem("dltBinID", )
}

const deleteBin = async function(id){
    

    const url = "api/bins/" + id;
    showLoader("#bin-"+id + " .btn-danger", {content: generalLoader});

    try{
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        
    

        const bin = await response.json();

        if (!bin){
            return showError("Bin not Found!");
        }

        document.querySelector("#bin-" + id).remove();
        showSuccess("Bin deleted successfully!");
        resetBin(id);
        
    } catch(e){
        showError("Unable to Delete Bin!");
    }finally{
        hideLoader("#bin-"+id + " .btn-danger", {content: `<i class="fa-solid fa-trash-can"></i>`});
    }
}

const moreDetails =  function(binNum){

    localStorage.setItem("binNumber", binNum);   
    return;

}


const initiateReset = function(binNum){
    swal({
        title: "Are you sure?",
        text: "Once reset, all the data of this bin will be deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            resetBin(binNum)
          swal("Poof! Your Bin has been reset!", {
            icon: "success",
          });
        } else {
          swal("Your Bin is safe!");
        }
      });
}

const getBinID = async function(binNum){
    const url =  "/api/bins/" + binNum;

    try{
        const response = await fetch(url);
        const bin = await response.json();

        if(!bin){
            return showError("Bin not Found")
        }

        return bin._id;

    } catch(e){
        console.log(e);
    }

}

const resetBin = async function(binNum){
    const binID = await getBinID(binNum)
    
    const url =  "/api/bindata/all/" + binID;

    try{
        const response = await fetch(url);
        const binData = await response.json();

        binData.forEach( async(data) => {
            var binDataId = data._id;
            deleteData(binDataId);
        });

    } catch(e){
        console.log(e);
    }

}

const deleteData = async function(id){
    const url =  "/api/bindata/" + id;

    try{
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        });
    
        const data = await response.json();

        if (!data){
            return showError("Data not Found!");
        }    

    } catch(e){
        console.log(e);
    }
}
getBins();


const createForm = $("#create-bin-form");
const updateForm = $("#update-bin-form");
const searchForm = $("#search_form");

createForm.validate({
    rules:{
        binNumber: {
            required: true
        },
        binLocation: {
            required: true
        },
        compostStatus:{
            required: true
        }
    }
})

const updateValidation = updateForm.validate({
    rules:{
        update_binLocation: {
            required: true
        },
        update_compostStatus:{
            required: true
        }
    }
})

createForm.on("submit", function(e){
    e.preventDefault();

    if(createForm.valid()){
        createBin();
        createForm[0].reset();
    }

})

updateForm.on("submit", function(e){
    e.preventDefault();

    if(updateForm.valid()){
        updateBin();
        updateForm[0].reset();
    }
})

searchForm.on("submit",  (e) => {
    e.preventDefault();

    var searchText = document.querySelector("#search_text").value;
    var num = searchText.match(/\d/g);
    num = num.join("");

    const total = localStorage.getItem("totalBins");
    
    
    binsHTML = "";
    return getBin(num);
    


})


const generateBinCard = function(bin, binLoc, binNum, binID){
    const temp = (bin.temperatureL1 + bin.temperatureL2)/2;
    const humidity = (bin.humidityL1 + bin.humidityL2)/2;
    document
    return `
    <div class="col" id="bin-${binNum}">
        <div class="card h-100 bg-dark border-2 text-center border-success">
            <div class="card-header border-dark text-white"><h5>BIN ${binNum} COMPOST</h5></div>
            <img src="https://raw.githubusercontent.com/cepdnaclk/e18-3yp-Smart-Compost-Management-System/main/docs/images/frontend/bin.png" class="card-img-top" alt="...">		
            <div class="card-body text-white">
                <table class="table table-sm table-dark">
                <tbody>
                    <tr>
                    <td colspan="2">Will be ready in ${28 - bin.day} days</td>
                    </tr>				  
                    <tr>
                    <td scope="row">Temperature</td>
                    <td scope="row"> ${temp} °F</td>
                    </tr>
                    <tr>
                    <td scope="row">Humidity</td>
                    <td scope="row"> ${humidity} %</td>
                    </tr>
                    <tr>
                    <td scope="row">Methane</td>
                    <td scope="row"> ${bin.methaneOutput} ppm</td>
                    </tr>
                    <tr>
                    <td scope="row">Compost Status</td>
                    <td scope="row"> ${bin.compostStatus} </td>
                    </tr>
                    <tr>
                    <td scope="row">Bin Location</td>
                    <td scope="row" class="binLoc"> ${binLoc}</td>
                    </tr>
                </tbody>
                </table>			
            </div>
            
            <div class="text-center"><a class="btn btn-success w-75 buttonBottomMargin" onclick="moreDetails(${binNum})"  href="/bindata/bin">More Details</a></div>
            <br>
            <div class="text-center"><button class="btn btn-success w-75 buttonBottomMargin" onclick="initiateReset(${binNum})">Reset Bin</button></div>
            <div class="card-footer border-dark">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            <div class="crud-buttons">
            <button type="button" class="btn btn-danger" onclick="initiateDelete(${binNum})"><i class="fa-solid fa-trash-can"></i></button>
            <button type="button" class="btn btn-primary" onclick="initiateUpdate(${binNum})"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
    </div>
    `
}