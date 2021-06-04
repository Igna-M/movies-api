window.addEventListener("load", () => {

    let selectMovie1 = document.querySelector("select#movie1")
    let divMovie2 = document.querySelector("div#movie2")
    let selectMovie2 = document.querySelector("select#movie2")


    selectMovie1.addEventListener("change", function(e){
        let selectMovie = e.target.value;
        if (selectMovie != "new"){
            divMovie2.classList.remove('hide');
            selectMovie2.classList.add('temp-flash');
            selectMovie2.classList.add('temp-border');
        }
    })

    let divMovie3 = document.querySelector("div#movie3")
    let selectMovie3 = document.querySelector("select#movie3")

    selectMovie2.addEventListener("change", function(e){
        let selectMovie = e.target.value;
        if (selectMovie != "new"){
            divMovie3.classList.remove('hide');
            selectMovie3.classList.add('temp-flash');
            selectMovie3.classList.add('temp-border');
        }        
    })

    let divMovie4 = document.querySelector("div#movie4")
    let selectMovie4 = document.querySelector("select#movie4")

    selectMovie3.addEventListener("change", function(e){
        let selectMovie = e.target.value;
        if (selectMovie != "new"){
            divMovie4.classList.remove('hide');
            selectMovie4.classList.add('temp-flash');
            selectMovie4.classList.add('temp-border');
        }
    })

    let divMovie5 = document.querySelector("div#movie5")
    let selectMovie5 = document.querySelector("select#movie5")

    selectMovie4.addEventListener("change", function(e){
        let selectMovie = e.target.value;
        if (selectMovie != "new"){
            divMovie5.classList.remove('hide');
            selectMovie5.classList.add('temp-flash');
            selectMovie5.classList.add('temp-border');
        }
    })


    // New movie button
    let newMovieButton = document.querySelector("div#new-movie-button")
    // let buttonNewMovieButton = document.querySelector("a#new-movie-button")

    selectMovie1.addEventListener("change", function(e){
        let selectMovie = e.target.value;

        if (selectMovie == "new"){
            newMovieButton.classList.remove('hide');
        }
    })

    selectMovie2.addEventListener("change", function(e){
        let selectMovie = e.target.value;

        if (selectMovie == "new"){
            newMovieButton.classList.remove('hide');
        }
    })

    selectMovie3.addEventListener("change", function(e){
        let selectMovie = e.target.value;

        if (selectMovie == "new"){
            newMovieButton.classList.remove('hide');
        }
    })

    selectMovie4.addEventListener("change", function(e){
        let selectMovie = e.target.value;

        if (selectMovie == "new"){
            newMovieButton.classList.remove('hide');
        }
    })

    selectMovie5.addEventListener("change", function(e){
        let selectMovie = e.target.value;

        if (selectMovie == "new"){
            newMovieButton.classList.remove('hide');
        }
    
    })

})