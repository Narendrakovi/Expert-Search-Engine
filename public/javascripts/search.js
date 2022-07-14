var searchstr;
var filteredsearchstr;
var typeSearch;
var numOfResultsPerPage;
var filterSymbols;
var orderSearch;
function changeSearch(){
    searchstr = document.getElementById('navBarSearchBar').value;
    typeSearch = document.getElementById('typeSearch').value;
    numOfResultsPerPage = document.getElementById('numOfResultsPerPage').value;
    filterSymbols = document.getElementById('symbolfilter').value;
    orderSearch = document.getElementById('orderSearch').value;

    removeSymbols();
    filter();
    return false;
}
function removeSymbols(){

    let rmspaces = filterSymbols.replaceAll(/\s{2,}/g,' ');
    rmspaces = rmspaces.split(' ');
    filteredsearchstr = searchstr;
    rmspaces.forEach(element => {
        
        filteredsearchstr = filteredsearchstr.replaceAll(element, "");
    });
    filteredsearchstr = filteredsearchstr.trim();
}
function filter(){
    
    

    var cardcontainer = document.getElementById('card-container');
    
    
    cardcontainer.innerHTML="";
    
    let cards = document.createElement('div');
    cards.className ='container-fluid';

    $.ajax({ 
        url: '/getdata', 
        method: 'GET',
        dataType: 'json',
        data:
        {
            query: filteredsearchstr,
            type: typeSearch,
            order: orderSearch,
            resultsperPage: numOfResultsPerPage,     
        }
     })
    .then(function(data)
    {
        
        data.forEach(element => {
            let card = document.createElement('div');
                card.className = 'row';
                card.innerHTML = '<div class="card-body"><h1 class="card-title"><a href="' + element.websiteurl + '">' + element.websiteurl + '</a></h1><p class="card-subtitle">' + element.websiteurl + '</p><p class="card-text">' + element.description + '</p>'
                
                cards.appendChild(card);
        });
        cardcontainer.appendChild(cards);
    })
    
    return false;
}

    

window.addEventListener('load', () => {
    
    $('#card-container').on("click", 'a', function(event){
        
        var urls = {updateurl: event.currentTarget.innerHTML}
        console.log("Card innerHTML = " + event.currentTarget.innerHTML);
        console.log("Test string = https://www.amctheatres.com")
        $.post("/update",
         {
            updateurl: event.currentTarget.innerHTML
            
         },
         function (response, status) {
            console.log(response);
         });
         
    })
    searchstr = sessionStorage.getItem('str');
    typeSearch = sessionStorage.getItem('typeSearch');
    numOfResultsPerPage = sessionStorage.getItem('numOfResultsPerPage');
    filterSymbols = sessionStorage.getItem('filterSymbols');   
    orderSearch = sessionStorage.getItem('orderSearch');
    document.getElementById('navBarSearchBar').value = searchstr;
    document.getElementById('typeSearch').value = typeSearch;
    document.getElementById('numOfResultsPerPage').value = numOfResultsPerPage;
    document.getElementById('symbolfilter').value = filterSymbols;
    document.getElementById('orderSearch').value = orderSearch;
    removeSymbols();
    filter();
    
})

