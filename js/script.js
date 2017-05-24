
;(function($){ 
    $(document).ready(function() {
        $('.information_menu').find('li').hover(function(e) {
            $('.information_menu').find('li').removeClass('active');
            $(this).addClass('active');
            $(".overlay-item").removeClass("active");
            $(".overlay-item").removeClass("inactive");
            $(".overlay-id"+$(this).data("id")).addClass("active").removeClass("inactive");

            $(".overlay-id"+$(this).data("id")).prev().addClass("inactive")
        });     

        $('.slideshow').children().on('mouseleave',function(e) {
            $(this).removeClass("active");
        });    

        $('.carousel').carousel();
    });
})(jQuery);



/* portfolio  JS*/

$( document ).ready(function() {

    $(function() {
        var selectedClass = "";

        $(".fil-cat").click(function(){ 
            selectedClass = $(this).attr("data-rel"); 
            console.log(selectedClass)
            $(".portfolio").fadeTo(100, 0.1);
            $(".portfolio div").not("."+selectedClass).not(".redsquare").not(".textport").not("#lightbox").not(".modal-dialog").not(".modal-content").not(".modal-body").not("#myCarousel").not(".carousel-indicator").not(".item").fadeOut().removeClass('scale-anm');

            setTimeout(function() {
                $("."+selectedClass).fadeIn().addClass('scale-anm');
                $(".portfolio").fadeTo(300, 1);
            }, 300); 
        });
    });
}); 


$(document).ready(function() {
    var $lightbox = $('#lightbox');
    var $carousel = $('#carousel-inner');

    $('[data-target="#lightbox"]').on('click', function(event) {
        var $img = $(this).find('img'), 
            src = $img.attr('src'),
            alt = $img.attr('alt'),
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };

        $lightbox.find('.close').addClass('hidden');
        $lightbox.find('img').attr('src', src);
        $lightbox.find('img').attr('alt', alt);
        $lightbox.find('img').css(css);
    });

    $lightbox.on('shown.bs.modal', function (e) {
        $lightbox.find('.close').removeClass('hidden');

    });
});


/*bouton envoyer*/

var envoyer = document.querySelector('.submit')

envoyer.addEventListener('mouseover', secondColor);

function secondColor() {
    envoyer.style.color = "white";
    envoyer.style.backgroundColor = "var(--black)";
}


/*FORMULAIRE    */


$(document).ready(function() {
    // Lorsque je soumets le formulaire
    $('#formu').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire (ça empêche de recharger la page)

        // je déclare les variables dont j'aurai besoin pour le jQuery et JSON
        var name = $("#nom").val();
        var mail = $("#mail").val();
        var message = $("#message").val();
        var categorie = $("#categorie").val();


        // fonction REGEX Jquery qui vérifie la validité d'une adresse mail
        function isValidEmailAddress(emailAddress) {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
        };

        
        
        // je déclare une variable pour récupérer l'url avec les infos
        var url="contact.php?categorie=" + categorie + "&nom=" + name + "&mail=" + mail + "&message=" + message;

        
        
        // AJAX qui envoie la requête HTTP
        $.ajax({
            url: url, // je dis que l'url correspond à la variable url plus haut
            type: 'GET', // La méthode indiquée dans le formulaire (get ou post)
            success: function(data) { // Je récupère la réponse du fichier PHP sans aucun erreur 
                data = JSON.parse(data); /* je récupère ces données et les traduit en JSON pour en faire
                des objets et pouvoir parcourir le JSON comme je veux*/
                
                
                // si la personne n'a pas rentré son nom
                if (data.nom == true) {
                    $("#nom").css('border', '1px dotted red');
                    $("#nom").css('background-color', 'rgba(255,0,0,0.5)');
                } // si la personne a entré son nom
                else{
                    $("#nom").css('border', '1px dotted black');
                    $("#nom").css('background-color', 'transparent');
                }

                
                // si la personne n'a pas rentré son email
                if (data.mail == true) {
                    $("#mail").css('border', '1px dotted red');
                    $("#mail").css('background-color', 'rgba(255,0,0,0.5)');
                    
                } // si la personne a rentré son email
                // alors je regarde s'il est bien écrit en appelant la fonction REGEX
                else if(isValidEmailAddress(mail)){
                    $("#mail").css('border', '1px dotted green');
                    $("#mail").css('background-color', 'rgba(0,241,140,0.7)');
                }// si la personne a rentré son mail mais qu'il n'est pas valide
                else{
                    $("#mail").css('background-color', 'rgba(255,0,0,0.5)');
                    $("#mail").css('border', '1px dotted red');
                }
                
                
                // si la personne n'a pas rentré de message
                if (data.message == true) {
                    $("#message").css('border', '1px dotted red');
                    $("#message").css('background-color', 'rgba(255,0,0,0.5)');
                }//si la personne a rentré un message
                else{
                    $("#message").css('border', '1px dotted black');
                    $("#message").css('background-color', 'white');
                }
            }
        });
    });
});