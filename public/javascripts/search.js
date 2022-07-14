function filter(){
    
    var cardcontainer = document.getElementById('card-container');
    var search = document.getElementById('navBarSearchBar').value;
    
    cardcontainer.innerHTML="";
    
    let cards = document.createElement('div');
    cards.className ='container-fluid';
    //console.log(search);        // Search is correctly allocated
    $.ajax({ 
        url: '/getdata', 
        method: 'GET',
        dataType: 'json',
        data:
        {
            query: search      
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
    /*
    fetch('./public/text/database.txt').then(response => response.text()).then(text =>{
        
        let db = text.split('\r\n');
        console.log(db);
        for(var i = 0; i < db.length; i++)
        {
            if(db[i].includes(search))
            {
                let entry = db[i].split(' ');
                let url = entry.pop();
                let arr = url.split('https://')
                let short_url = arr.slice(1).toString();
                let description = entry.toString().replaceAll(',', ' ');
                let card = document.createElement('div');
                card.className = 'row';
                card.innerHTML = '<div class="card-body"><h1 class="card-title"><a href="' + url + '">' + short_url + '</a></h1><p class="card-subtitle">' + url + '</p><p class="card-text">' + description + '</p>'
                
                cards.appendChild(card);
                
                
            }
        }
        cardcontainer.appendChild(cards);
    });
    */
    return false;
}

    

window.addEventListener('load', () => {
    searchstr = sessionStorage.getItem('str');   
    document.getElementById('navBarSearchBar').value = searchstr;
    filter();
    document.getElementById("searchbtn").addEventListener("click", function(event){
        event.preventDefault();
        filter();
      });
})

