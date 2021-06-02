window.addEventListener("load", () => {
    
    let character1 = document.querySelector("input#character1")
    let divChar2 = document.querySelector("div#character2")


    let character2 = document.querySelector("input#character2")
    let divChar3 = document.querySelector("div#character3")
    
    // let character3 = document.querySelector("input#character3")

    character1.addEventListener("change", function(e){
        divChar2.classList.remove('hide');
    })

    character2.addEventListener("change", function(e){
        divChar3.classList.remove('hide');
    })

    // Agregar que se encienda como una luz el campo que aparece nuevo.

    let selectGenre1 = document.querySelector("select#genre1")
    let divNewGenre1 = document.querySelector("div#newGenre1")

    let divGenre2 = document.querySelector("div#divGenre2")
    let selectGenre2 = document.querySelector("select#genre2")
    let divNewGenre2 = document.querySelector("div#newGenre2")
    let divGenre3 = document.querySelector("div#divGenre3")
    let selectGenre3 = document.querySelector("select#genre3")
    let divNewGenre3 = document.querySelector("div#newGenre3")


    selectGenre1.addEventListener("change", function(e){
        divGenre2.classList.remove('hide');
        let choice = e.target.value;
        if (choice == 'New'){
            divNewGenre1.classList.remove('hide');
        }
        })

    selectGenre2.addEventListener("click", function(e){
        divGenre3.classList.remove('hide');
    })

    selectGenre2.addEventListener("change", function(e){
        let choice = e.target.value;
        if (choice == 'New'){
            divNewGenre2.classList.remove('hide');
        }
    })

    selectGenre3.addEventListener("change", function(e){
    let choice = e.target.value;
    if (choice == 'New'){
        divNewGenre3.classList.remove('hide');
    }
    })
})