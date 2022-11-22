// write your code here
document.addEventListener('DOMContentLoaded', () => {
    //load ramen to the page
    
    function fetchRamen(){
        return fetch('http://localhost:3000/ramens/')
        .then(res => res.json())
        .then(data => data.forEach(ramen => getRamen(ramen)))
    }

    
    function getRamen(noodle){
        const chooseRamen = document.querySelector('#ramen-menu')
        
        let img = document.createElement('img')
        img.src = noodle.image
        
        chooseRamen.append(img)
       
        img.addEventListener('click', (e) => {
            let clickOnRamen = noodle.id
            //console.log(clickOnRamen)

            return fetch(`http://localhost:3000/ramens/${clickOnRamen}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const name = document.querySelector('div#ramen-detail h2')
                const restaurant = document.querySelector('div#ramen-detail h3')
                const rating = document.querySelector('span#rating-display')
                const comment = document.querySelector('p#comment-display')
                const image = document.querySelector('div#ramen-detail img')
    
                name.innerText = data.name
                restaurant.innerText = data.restaurant
                rating.innerText = data.rating
                comment.innerText = data.comment
                image.src = data.image
            })
        })
    }

    fetchRamen();

    function handleSubmit(e){
        e.preventDefault()
        let ramenObj = {
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target.children[10].value
            
        }
        
        getRamen(ramenObj)
        moreRamen(ramenObj)
    }
    function moreRamen(ramenObj){
        console.log(JSON.stringify(ramenObj))
        return fetch("http://localhost:3000/ramens/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ramenObj)
        })
        .then(res => res.json())
        .then(ramen => console.log(ramen))
    }
    //Event Listener
    document.querySelector('#new-ramen').addEventListener('submit', handleSubmit)
    
})