var searchstr;
var filteredsearchstr;
var typeSearch;
var numOfResultsPerPage;
var filterSymbols;
var orderSearch;
var pageNumber;
var totalCount;
var totalNumberOfPages;

function changeSearch(){
    searchstr = document.getElementById('navBarSearchBar').value;
    typeSearch = document.getElementById('typeSearch').value;
    numOfResultsPerPage = document.getElementById('numOfResultsPerPage').value;
    filterSymbols = document.getElementById('symbolfilter').value;
    orderSearch = document.getElementById('orderSearch').value;
    
    removeSymbols();
    if(filteredsearchstr == "")
    {
        window.alert("Can't search with no input...")
        return false
    }  
    updatePagenation();  
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
function updatePagenation(){

    $('#page-selection').twbsPagination('destroy');
    $.ajax({ 
        url: '/getcount', 
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
        
        
        totalNumberOfPages = data.pageCount;
        if($('#page-selection'))
        $('#page-selection').twbsPagination({
            totalPages: totalNumberOfPages,
            visiblePages: 5,
            startPage: 1,
            
            onPageClick: function (event, page) {
                filter(page);
            },
        });
        
       
    })
}    
function filter(page){
    
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
            pageNumber: page   
        }
     })
    .then(function(data)
    {
        console.log(data);
        
        totalNumberOfPages = data.pageCount;
        
        if(data.data.length === 0)
        {
            let card = document.createElement('div');
                card.className = 'row';
                card.innerHTML = '<div class="card-body"><h1 class="card-title"><a>No Results Found...</a></h1><p class="card-subtitle"></p><p class="card-text">Please enter a new search query.</p>'
                
                cards.appendChild(card);
        }
        else
        {
            data.data.forEach(element => {
                let card = document.createElement('div');
                    card.className = 'row';
                    card.innerHTML = '<div class="card-body"><h1 class="card-title"><a href="' + element.websiteurl + '">' + element.websiteurl + '</a></h1><p class="card-subtitle">' + element.websiteurl + '</p><p class="card-text">' + element.description + '</p>'
                    
                    cards.appendChild(card);
            });
        }          

        cardcontainer.appendChild(cards);
        
       
    })
    
    
}


$(document).ready(function(){

    $('#card-container').on("click", 'a', function(event){
        
        
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
    pageNumber = 1;
    document.getElementById('navBarSearchBar').value = searchstr;
    document.getElementById('typeSearch').value = typeSearch;
    document.getElementById('numOfResultsPerPage').value = numOfResultsPerPage;
    document.getElementById('symbolfilter').value = filterSymbols;
    document.getElementById('orderSearch').value = orderSearch;
    
    removeSymbols();
    if(filteredsearchstr == "")
    {
        window.alert("Can't search with no input...")
        return false
    }
    updatePagenation();
    
    
})
    
    

