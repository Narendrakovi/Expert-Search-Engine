function sendToPage(){
    var input = document.getElementById('indexSearchBar').value;
    sessionStorage.setItem('str',input);

    return false;
}   
window.addEventListener('load', () => {
    sessionStorage.clear();

})