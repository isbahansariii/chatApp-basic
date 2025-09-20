let toConfirm = (e)=>{
    let confirmed = confirm("Do you want to delete?")
    if (!confirmed)
        e.preventDefault();
}

let toConfirmAllDel = (e)=>{
    let confirmed = confirm("Do you want to delete all?")
    if(!confirmed)
        e.preventDefault();
}