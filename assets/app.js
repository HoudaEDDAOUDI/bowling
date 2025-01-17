/*import './bootstrap.js';*/
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

//---------------------------------NOMBRE DE PERSONNE FROM 1------------------------------------------
try {
    const baisser = document.getElementById('baisse')
    const augmentation = document.getElementById('augmentation')
    const nombre = document.getElementById('nombre')
    let nombreValue = Number(nombre.value)
    baisser.addEventListener('click', (e) => {
        nombreValue -= 1
        if(nombreValue <=0){
            nombreValue = 1
        }
        nombre.value = nombreValue

    });

    augmentation.addEventListener('click', (e) => {
        nombreValue += 1
        nombre.value = nombreValue
    });

} catch (error) {
    console.error('Erreur détectée :', error);
}
//---------------------------------MENU BURGER------------------------------------------
try{
    document.addEventListener('DOMContentLoaded', () => {
        const burgerIcon = document.querySelector('.menu_burger');
        const closeIcon = document.querySelector('#cross');
        const menuTel = document.querySelector('.menu_burger_tel');

        burgerIcon.addEventListener('click', () => {
            menuTel.classList.add('is-open');
        });

        closeIcon.addEventListener('click', () => {
            menuTel.classList.remove('is-open');
        });

        document.addEventListener('click', (e) => {
            if (
                !burgerIcon.contains(e.target) &&
                !menuTel.contains(e.target) &&
                !closeIcon.contains(e.target)
            ) {
                menuTel.classList.remove('is-open');
            }
        });
    });
} catch (error) {
    console.error('Erreur détectée :', error);
}
//--------------------------------QUESTION-----------------------------------------------
try{
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            questions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                }
            });
            question.classList.toggle('active');
        });
    });
}catch (error) {
    console.error('Erreur détectée :', error);
}
//--------------------------------CALENDRIER -----------------------------------------------
try {
    const daysTag = document.querySelector(".days"),
        currentDate = document.querySelector(".current-date"),
        prevNextIcon = document.querySelectorAll(".icons svg");

// DATE ACTUELLE
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

// NOMS DES MOIS
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
        "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const renderCalendar = () => {
        // Décalage pour que la semaine commence par lundi
        let firstDayofMonth = (new Date(currYear, currMonth, 1).getDay() + 6) % 7,
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = (new Date(currYear, currMonth, lastDateofMonth).getDay() + 6) % 7,
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        let liTag = "";

        // JOURS DU MOIS PRÉCÉDENT
        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `
            <li class="inactive">
                ${lastDateofLastMonth - i + 1}
            </li>
            `;
            //console.log(lastDateofLastMonth);
        }

        // JOURS DU MOIS ACTUEL
        for (let i = 1; i <= lastDateofMonth; i++) {
            let className = "possible"; // Par défaut, aucune classe

            // Vérifie si le jour correspond à aujourd'hui
            if (i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
                className = "active";
            }
            else if (
                i < date.getDate() + 4 &&
                currMonth === new Date().getMonth() && currYear === new Date().getFullYear()
            ){
                className = "impossible";
            }


            liTag += `
                <li class="${className}">
                    ${i}
                </li>`;
        }

        // JOURS DU MOIS SUIVANT
        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `
        <li class="inactive">
            ${i - lastDayofMonth + 1}
        </li>`;
        }

        // MISE À JOUR DE L'ENTÊTE (MOIS + ANNÉE)
        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;

        const datePossible = document.querySelectorAll('li.possible');

        datePossible.forEach(li=> {
            li.addEventListener("click",()=>{
                const contenuLiJour = li.innerHTML;
                const contenuLiMoisAnne = currentDate.innerText;
                const inputDate =document.querySelector('.input_date');
                inputDate.value = `${contenuLiJour} ${contenuLiMoisAnne}`;
                datePossible.forEach(item => {
                    item.classList.remove('jourChoisi');
                });
                li.classList.toggle('jourChoisi');
                console.log(inputDate.value);
                console.log(inputDate);

                const horaireRerservation = document.querySelector('.horaireReservation');
                horaireRerservation.innerHTML=`
                    <li class="item1 heure">14:00</li>
                    <li class="item2 heure">15:00</li>
                    <li class="item3 heure">16:00</li>
                    <li class="item4 heure">17:00</li>
                    <li class="item5 heure">18:00</li>
                    <li class="item6 heure">19:00</li>
    
                    <li class="item7 heure">20:00</li>
                    <li class="item8 heure">21:00</li>
                    <li class="item9 heure">22:00</li>
                    <li class="item10 heure">23:00</li>
                    <li class="item11 heure">00:00</li>
                    <li class="item12 heure">01:00</li>
                `;


            })
        });

        const horaireRerservation = document.querySelector('.horaireReservation');
        const inputContainer = document.querySelector('.items_input2');

        horaireRerservation.addEventListener("click", (event) => {
            if (event.target.classList.contains('heure')) {
                const contenuHeures = event.target.innerHTML;

                event.target.classList.toggle('heureChoisi');

                if (event.target.classList.contains('heureChoisi')) {

                    const newLabel = document.createElement('label');
                    const newInput = document.createElement('input');
                    const uniqueId = `heure-${contenuHeures.replace(':', '-')}`;

                    //  label
                    newLabel.setAttribute('for', uniqueId);
                    newLabel.textContent = `Horaire ${contenuHeures}`;

                    //  l'input
                    newInput.type = 'text';
                    newInput.id = uniqueId;
                    newInput.classList.add('input_date2');
                    newInput.name = 'date';
                    newInput.value = contenuHeures;
                    newInput.placeholder = 'date';
                    newInput.required = true;

                    newInput.setAttribute('aria-required', 'true');

                    inputContainer.appendChild(newLabel);
                    inputContainer.appendChild(newInput);
                    console.log(inputContainer);
                } else {
                    const inputToRemove = document.querySelector(`#heure-${contenuHeures.replace(':', '-')}`);
                    const labelToRemove = document.querySelector(`label[for="heure-${contenuHeures.replace(':', '-')}"`);
                    if (inputToRemove) inputToRemove.remove();
                    if (labelToRemove) labelToRemove.remove();
                }
            }
        });


    };
    renderCalendar();
    function ChoixHoraire(){

    }
    ChoixHoraire();
    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {

            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if(currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            renderCalendar();
        });
    });

} catch (error) {
    console.error('Erreur détectée :', error);
}
//------------------------------- EVENEMENTS INDEX-------
try {
    const events_click = document.getElementById('events_noel');

    events_click.addEventListener('click', () => {
        // Si l'élément cliqué est déjà actif, on le ferme
        events_click.classList.toggle('active2');
    });

} catch (error) {
    console.error('Erreur détectée :', error);
}

try {
    const events_click = document.getElementById('events_rose');

    events_click.addEventListener('click', () => {
        // Si l'élément cliqué est déjà actif, on le ferme
        events_click.classList.toggle('active2');
    });

} catch (error) {
    console.error('Erreur détectée :', error);
}

try {
    const events_click = document.getElementById('events_etud');

    events_click.addEventListener('click', () => {
        // Si l'élément cliqué est déjà actif, on le ferme
        events_click.classList.toggle('active2');
    });

} catch (error) {
    console.error('Erreur détectée :', error);
}
//---------------------------------TARIFS BOWLING LASER GAME------------------------------
try{
    document.addEventListener("DOMContentLoaded", () => {
        const boutonBowling = document.getElementById("bouton_bowling");
        const boutonLaser = document.getElementById("bouton_laser");
        const blocBowling = document.getElementById("bowling");
        const blocLaser = document.getElementById("laser");

        boutonBowling.addEventListener("click", () => {
            blocBowling.classList.add("visible");
            blocBowling.classList.remove("hidden");
            blocLaser.classList.add("hidden");
            blocLaser.classList.remove("visible");
        });

        boutonLaser.addEventListener("click", () => {
            blocLaser.classList.add("visible");
            blocLaser.classList.remove("hidden");
            blocBowling.classList.add("hidden");
            blocBowling.classList.remove("visible");
        });
    });



}catch (error) {
    console.error('Erreur détectée :', error);
}
//-------------------------VALIDATION FORMULAIRE CONTACT----------------------------------
try{
    document.addEventListener("DOMContentLoaded", () => {
        const boutonEnvoiContact = document.getElementById("bouton_envoi_contact");
        const messageValidEnvoi = document.getElementById("validation_envoi");
        const form = document.getElementById("form_contact");

        boutonEnvoiContact.addEventListener("click", (event) => {
            event.preventDefault();

            const inputs = form.querySelectorAll("input[required], select[required], textarea[required]");
            let allFieldsValid = true;

            inputs.forEach((input) => {
                const pattern = input.getAttribute("pattern");
                const regex = pattern ? new RegExp(pattern) : null;

                // VÃ©rifie si le champ est vide
                if (!input.value.trim()) {
                    allFieldsValid = false;
                    showError(input, "Ce champ est requis.");
                }
                else if (regex && !regex.test(input.value.trim())) {
                    allFieldsValid = false;
                    showError(input, input.title || "Format invalide.");
                } else {
                    clearError(input);
                }
            });

            if (allFieldsValid) {
                messageValidEnvoi.classList.add("visible");

                setTimeout(() => {
                    messageValidEnvoi.classList.remove("visible");
                }, 3500);

                form.reset();

                inputs.forEach((input) => {
                    input.classList.remove("error");
                    input.classList.remove("valid");
                });
            } else {
                alert("Veuillez corriger les erreurs avant de soumettre le formulaire.");
            }
        });

        // Fonction pour afficher une erreur
        function showError(input, message) {
            input.classList.add("error");
            input.classList.remove("valid");

            let errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains("error-message")) {
                errorElement = document.createElement("span");
                errorElement.classList.add("error-message");
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
            errorElement.textContent = message;
        }

        function clearError(input) {
            input.classList.remove("error");
            input.classList.add("valid");

            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains("error-message")) {
                errorElement.remove();
            }
        }
    });
}catch (error) {
    console.error('Erreur détectée :', error);
}
//-------------------------------LANCER CONFETTIS-----------------------------------------
try{
    function generateConfetti(event) {
        const formule = event.currentTarget;
        for (let i = 0; i < 30; i++) {  // Nombre de confettis
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const maxX = formule.offsetWidth;
            const maxY = formule.offsetHeight;
            const xPos = Math.random() * maxX;
            const yPos = Math.random() * maxY;

            confetti.style.left = `${xPos}px`;
            confetti.style.top = `${yPos}px`;

            formule.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    document.querySelectorAll('.formule').forEach(formule => {
        formule.addEventListener('mouseenter', generateConfetti);
    });
}catch (error) {
    console.error('Erreur détectée :', error);
}