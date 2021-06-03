window.addEventListener("load", () => {
    
    let character1 = document.querySelector("select#character1")
    let divChar2 = document.querySelector("div#character2")


    let character2 = document.querySelector("select#character2")
    let divChar3 = document.querySelector("div#character3")
    
    let character3 = document.querySelector("select#character3")

    character1.addEventListener("change", function(e){
        divChar2.classList.remove('hide');
        character2.classList.add('temp-flash');
        character2.classList.add('temp-border');
        
    })

    character2.addEventListener("change", function(e){
        divChar3.classList.remove('hide');
        character3.classList.add('temp-flash');
        character3.classList.add('temp-border');
    })

    let selectGenre1 = document.querySelector("select#genre1")
    let divNewGenre1 = document.querySelector("div#newGenre1")
    let inputNewGenre1 = document.querySelector("input#NewGenre1")
    let divGenre2 = document.querySelector("div#divGenre2")
    let selectGenre2 = document.querySelector("select#genre2")
    let divNewGenre2 = document.querySelector("div#newGenre2")
    let inputNewGenre2 = document.querySelector("input#NewGenre2")
    let divGenre3 = document.querySelector("div#divGenre3")
    let selectGenre3 = document.querySelector("select#genre3")
    let divNewGenre3 = document.querySelector("div#newGenre3")
    let inputNewGenre3 = document.querySelector("input#NewGenre3")

    // let genre1Container = document.querySelector("div#genre1-container")
    let genre2Container = document.querySelector("div#genre2-container")
    let genre3Container = document.querySelector("div#genre3-container")


    selectGenre1.addEventListener("change", function(e){
        genre2Container.classList.remove('hide');
        genre2Container.classList.add('genre-container-style');

        divGenre2.classList.remove('hide');
        selectGenre2.classList.add('temp-flash');
        selectGenre2.classList.add('temp-border');

        let choice = e.target.value;
        if (choice == 'new'){
            divNewGenre1.classList.remove('hide');
            inputNewGenre1.classList.add('temp-flash');
            inputNewGenre1.classList.add('temp-border');
        }
        })

    selectGenre2.addEventListener("click", function(e){
        genre3Container.classList.remove('hide');
        genre3Container.classList.add('genre-container-style');

        divGenre3.classList.remove('hide');
        selectGenre3.classList.add('temp-flash');
        selectGenre3.classList.add('temp-border');
    })

    selectGenre2.addEventListener("change", function(e){
        let choice = e.target.value;
        if (choice == 'new'){
            divNewGenre2.classList.remove('hide');
            inputNewGenre2.classList.add('temp-flash');
            inputNewGenre2.classList.add('temp-border');

        }
    })

    selectGenre3.addEventListener("change", function(e){
    let choice = e.target.value;
    if (choice == 'new'){
        divNewGenre3.classList.remove('hide');
        inputNewGenre3.classList.add('temp-flash');
        inputNewGenre3.classList.add('temp-border');
    }
    })
})