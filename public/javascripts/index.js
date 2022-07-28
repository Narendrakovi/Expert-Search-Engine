function sendToPage(){
    var input = document.getElementById('indexSearchBar').value;
    var typeSearch = document.getElementById('typeSearch').value;
    var numOfResultsPerPage = document.getElementById('numOfResultsPerPage').value;
    var filterSymbols = document.getElementById('symbolfilter').value;
    var orderSearch = document.getElementById('orderSearch').value;
    sessionStorage.setItem('str',input);
    sessionStorage.setItem('typeSearch',typeSearch);
    sessionStorage.setItem('numOfResultsPerPage',numOfResultsPerPage);
    sessionStorage.setItem('filterSymbols',filterSymbols);
    sessionStorage.setItem('orderSearch',orderSearch);
    return false;
}
   
window.addEventListener('load', () => {
    sessionStorage.clear();

})
