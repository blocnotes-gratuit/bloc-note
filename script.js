$('#bold').on('click', function() {
    document.execCommand('bold', false, null);
 });
 
 $('#italic').on('click', function() {
    document.execCommand('italic', false, null);
 });
 
 $('#underline').on('click', function() {
    document.execCommand('underline', false, null);
 });
 
 $('#align-left').on('click', function() {
    document.execCommand('justifyLeft', false, null);
 });
 
 $('#align-center').on('click', function() {
    document.execCommand('justifyCenter', false, null);
 });
 
 $('#align-right').on('click', function() {
    document.execCommand('justifyRight', false, null);
 });
 
 $('#list-ul').on('click', function() {
    document.execCommand('insertUnorderedList', false, null);
 });
 
 $('#list-ol').on('click', function() {
    document.execCommand('insertOrderedList', false, null);
 });
 
 $('#fonts').on('change', function() {
    console.log("Font changed"); // Check if the event handler is triggered
    var font = $(this).val();
    console.log("Selected font: " + font); // Check the selected font value
    document.execCommand('fontName', false, font);
});

 
 $('#size').on('change', function() {
    var size = $(this).val();
    $('.editor').css('fontSize', size + 'px');
 });
 
 $('#color').spectrum({
    color: '#000',
    showPalette: true,
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    showButtons: false,
    change: function(color) {
       color = color.toHexString();
       document.execCommand('foreColor', false, color);
    }
 });
 
 $('.editor').perfectScrollbar();
 
 
 // Function to handle creating a new document
 function createNewDocument() {
     // Clear the content of the editor
     document.querySelector('.editor').innerHTML = '';
 }
 
 // Add event listener to the new document button
 document.getElementById('new_document').addEventListener('click', createNewDocument);
 
 // Function to open a file
 document.getElementById('open_file_button').addEventListener('click', function() {
     var input = document.createElement('input');
     input.type = 'file';
 
     input.onchange = e => { 
         var file = e.target.files[0]; 
         var reader = new FileReader();
         reader.readAsText(file,'UTF-8');
         reader.onload = readerEvent => {
             document.querySelector('.editor').innerText = readerEvent.target.result;
         }
     }
     input.click();
 });
 
 
 document.getElementById('save_file').addEventListener('click', function() {
    document.getElementById('save_dialog').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('save_dialog').style.display = 'none';
});

document.getElementById('save_txt').addEventListener('click', function() {
    // Implement saving as TXT
    saveFile('.txt');
});

document.getElementById('save_doc').addEventListener('click', function() {
    // Implement saving as DOC
    saveFile('.doc');
});

document.getElementById('save_pdf').addEventListener('click', function() {
    // Implement saving as PDF
    saveFile('.pdf');
});

function saveFile(extension) {
    var content = document.querySelector('.editor').innerText;
    var sitename = "bloc-notes.net"; // Change this to your site name
    var fileName = document.getElementById('filename').value.trim();
    var filename;
    if (fileName === '') {
        filename = sitename + extension; // If no file name is provided, use site name + extension
    } else {
        filename = fileName + " - " + sitename + extension; // Add site name to the file name
    }
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    document.getElementById('save_dialog').style.display = 'none';
}


 document.getElementById('cut_button').addEventListener('click', function () {
     var textarea = document.querySelector('.editor');
     var selectedText = window.getSelection().toString();
     if (selectedText !== "") {
         document.execCommand('cut');
         console.log("Text cut to clipboard:", selectedText);
     }
 });
 
 document.getElementById('copy_button').addEventListener('click', function () {
     var textarea = document.querySelector('.editor');
     var selectedText = window.getSelection().toString();
     if (selectedText !== "") {
         document.execCommand('copy');
         console.log("Text copied to clipboard:", selectedText);
     }
 });
 
 const pasteButton = document.querySelector('#paste_button');
 const textarea = document.querySelector('.editor');
 
 pasteButton.addEventListener('click', () => {
     navigator.clipboard.readText()
         .then(text => {
             const selectionStart = textarea.selectionStart;
             const selectionEnd = textarea.selectionEnd;
             const newText = textarea.value.substring(0, selectionStart) + text + textarea.value.substring(selectionEnd);
             textarea.value = newText;
             textarea.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
             console.log(`Pasted text: ${text}`);
         })
         .catch(err => {
             console.error(`Error pasting clipboard's content: ${err}`);
         });
 });
 document.getElementById('paste_button').addEventListener('click', function () {
     var editor = document.querySelector('.editor');
     navigator.clipboard.readText()
         .then(text => {
             editor.focus();
             document.execCommand('insertText', false, text);
         })
         .catch(err => {
             console.error('Failed to read clipboard contents: ', err);
         });
 });
 
 
 // Initialize an empty array to store the history of text changes
 let history = [];
 // Index to keep track of the current state in the history array
 let currentIndex = -1;
 
 // Function to save the state of the editor
 function saveState() {
     // Push the current value of the editor to the history array
     history.push(document.querySelector('.editor').innerHTML);
     // Increment the currentIndex to point to the latest state
     currentIndex++;
 }
 
 // Function to perform undo operation
 function undo() {
     if (currentIndex > 0) {
         // Decrement the currentIndex to move to the previous state
         currentIndex--;
         // Set the innerHTML of the editor to the previous state
         document.querySelector('.editor').innerHTML = history[currentIndex];
     }
 }
 
 // Function to perform redo operation
 function redo() {
     if (currentIndex < history.length - 1) {
         // Increment the currentIndex to move to the next state
         currentIndex++;
         // Set the innerHTML of the editor to the next state
         document.querySelector('.editor').innerHTML = history[currentIndex];
     }
 }
 
 // Event listeners to save the state of the editor on input
 document.querySelector('.editor').addEventListener('input', function() {
     saveState();
 });
 
 // Event listener for undo button
 document.getElementById('undo_button').addEventListener('click', function() {
     undo();
 });
 
 // Event listener for redo button
 document.getElementById('redo_button').addEventListener('click', function() {
     redo();
 });
 
 
 document.getElementById('find_replace_button').addEventListener('click', function() {
     document.getElementById('find_replace_dialog').style.display = 'block';
 });
 
 document.getElementById('close_dialog_button').addEventListener('click', function() {
     document.getElementById('find_replace_dialog').style.display = 'none';
 });
 
 document.getElementById('find_button').addEventListener('click', function() {
     var searchText = document.getElementById('find_input').value;
     var editorContent = document.querySelector('.editor').innerText;
     var regex = new RegExp(searchText, 'gi');
     var matches = editorContent.match(regex);
     if (matches) {
         // Highlight or display matches in the editor
     } else {
         alert('Text not found');
     }
 });
 
 document.getElementById('replace_button').addEventListener('click', function() {
     var searchText = document.getElementById('find_input').value;
     var replaceText = document.getElementById('replace_input').value;
     var editorContent = document.querySelector('.editor').innerText;
     var regex = new RegExp(searchText, 'gi');
     var replacedContent = editorContent.replace(regex, replaceText);
     document.querySelector('.editor').innerText = replacedContent;
 });
 
 document.getElementById('replace_all_button').addEventListener('click', function() {
     var searchText = document.getElementById('find_input').value;
     var replaceText = document.getElementById('replace_input').value;
     var editorContent = document.querySelector('.editor').innerText;
     var regex = new RegExp(searchText, 'gi');
     var replacedContent = editorContent.replace(regex, replaceText);
     document.querySelector('.editor').innerText = replacedContent;
 });
 
 // Function to insert image from URL
function insertImageFromURL() {
    var imageUrl = prompt("Enter the URL of the image:");
    if (imageUrl) {
        var img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%'; // Ensure the image fits within the editor width
        img.style.height = 'auto'; // Maintain aspect ratio
        img.style.resize = 'both'; // Allow resizing
        img.style.overflow = 'auto'; // Enable scrolling if necessary
        document.querySelector('.editor').appendChild(img);
    }
}

// Add event listener to the insert image from URL button
document.getElementById('insert_image_url_button').addEventListener('click', insertImageFromURL);

// Function to insert image from device
function insertImageFromDevice() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = document.createElement('img');
                img.src = event.target.result;
                img.style.maxWidth = '100%'; // Ensure the image fits within the editor width
                img.style.height = 'auto'; // Maintain aspect ratio
                img.style.resize = 'both'; // Allow resizing
                img.style.overflow = 'auto'; // Enable scrolling if necessary
                document.querySelector('.editor').appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
}

// Add event listener to the insert image from device button
document.getElementById('insert_image_device_button').addEventListener('click', insertImageFromDevice);

 
 // Function to handle link insertion
function insertLink() {
    // Create a dialog box
    var url = window.prompt("Enter the URL:");
  
    // Check if the user entered a URL
    if (url) {
        // Get the selected text in the editor
        var selectedText = document.getSelection().toString();

        // If no text is selected, use the URL as the link text
        if (!selectedText) {
            selectedText = url;
        }

        // Create an anchor element
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Open link in new tab
        link.textContent = selectedText;

        // Insert the anchor element at the current cursor position in the editor
        document.execCommand('insertHTML', false, link.outerHTML);
    }
}

// Add event listener to the insert link button
document.getElementById('insert_link_button').addEventListener('click', insertLink);

 


function printContent() {
    // Get the content of the editor
    var editorContent = $('.editor').html();
    
    // Create a new iframe element
    var iframe = document.createElement('iframe');
    iframe.style.height = '0';
    iframe.style.width = '0';
    iframe.style.position = 'absolute';
    document.body.appendChild(iframe);
    
    // Write the content to the iframe
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.write('<html><head><title>Print</title></head><body>');
    doc.write(editorContent);
    doc.write('</body></html>');
    doc.close();
    
    // Print the content
    iframe.contentWindow.print();
    
    // Remove the iframe from the document
    setTimeout(function() {
        document.body.removeChild(iframe);
    }, 100);
}

document.addEventListener('keydown', function(event) {
    // Combine all shortcut keys into a single event listener
    
    // For saving document (Ctrl + S)
    if (event.ctrlKey && event.key === 's') {
        document.getElementById('save_file').click();
        event.preventDefault(); // Prevent default browser save behavior
    }
    // For cut (Ctrl + X)
    else if (event.ctrlKey && event.key === 'x') {
        document.execCommand('cut');
    }
    // For copy (Ctrl + C)
    else if (event.ctrlKey && event.key === 'c') {
        document.execCommand('copy');
    }
    // For paste (Ctrl + V)
    else if (event.ctrlKey && event.key === 'v') {
        document.execCommand('paste');
    }
    // For printing (Ctrl + P)
    else if (event.ctrlKey && event.key === 'p') {
        printContent();
        event.preventDefault(); // Prevent default browser print behavior
    }
    // For finding and replacing text (Ctrl + F)
    else if (event.ctrlKey && event.key === 'f') {
        document.getElementById('find_replace_button').click();
        event.preventDefault(); // Prevent default browser behavior
    }
    // For undo (Ctrl + Z)
    else if (event.ctrlKey && event.key === 'z') {
        undo();
        event.preventDefault(); // Prevent default browser behavior
    }
    // For redo (Ctrl + Shift + Z or Ctrl + Y)
    else if ((event.ctrlKey && event.shiftKey && event.key === 'Z') || (event.ctrlKey && event.key === 'y')) {
        redo();
        event.preventDefault(); // Prevent default browser behavior
    }
});




$(document).ready(function() {
    // Check if there are unsaved changes when the user tries to leave the page
    window.addEventListener('beforeunload', function(event) {
        if (document.querySelector('.editor').textContent.trim().length > 0) {
            // Prompt user to confirm leaving the page if there are unsaved changes
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
        }
    });

    // Handle saving the text when the user closes the tab or shuts down the device
    window.addEventListener('unload', function(event) {
        // Here you can save the text using your preferred method, such as localStorage or a server-side script
        // For example, you can save the text to localStorage
        localStorage.setItem('unsavedText', document.querySelector('.editor').textContent);
    });

    // Load the unsaved text from localStorage if available
    var unsavedText = localStorage.getItem('unsavedText');
    if (unsavedText) {
        document.querySelector('.editor').textContent = unsavedText;
    }
});


    
class ShortcutMenu {
    constructor(buttonId, menuId) {
        this.button = document.getElementById(buttonId);
        this.menu = document.getElementById(menuId);
        this.isVisible = false;
        
        // Bind 'this' to the toggleMenu method
        this.toggleMenu = this.toggleMenu.bind(this);
        
        // Add event listener to the button
        this.button.addEventListener('click', this.toggleMenu);
    }
    
    toggleMenu() {
        this.isVisible = !this.isVisible;
        this.menu.style.display = this.isVisible ? 'block' : 'none';
    }
}

// Create a new instance of ShortcutMenu
const shortcutMenu = new ShortcutMenu('shortcutButton', 'shortcutMenu');

// Populate the menu with shortcuts
const shortcuts = {
    'Raccourcis d\'Édition': [
        { key: 'Ctrl + X', action: 'Couper' },
        { key: 'Cmd + X', action: 'Couper' },
        { key: 'Ctrl + C', action: 'Copier' },
        { key: 'Cmd + C', action: 'Copier' },
        { key: 'Ctrl + V', action: 'Coller' },
        { key: 'Cmd + V', action: 'Coller' },
        { key: 'Ctrl + Z', action: 'Annuler' },
        { key: 'Cmd + Z', action: 'Annuler' },
        { key: 'Ctrl + Y ou Ctrl + Maj + Z', action: 'Rétablir' },
        { key: 'Cmd + Y ou Cmd + Maj + Z', action: 'Rétablir' }
    ],
    'Opérations sur le Document': [
        { key: 'Ctrl + S', action: 'Enregistrer' },
        { key: 'Cmd + S', action: 'Enregistrer' },
        { key: 'Ctrl + P', action: 'Imprimer' },
        { key: 'Cmd + P', action: 'Imprimer' }
    ],
    'Mise en Forme du Texte': [
        { key: 'Ctrl + B', action: 'Gras' },
        { key: 'Cmd + B', action: 'Gras' },
        { key: 'Ctrl + I', action: 'Italique' },
        { key: 'Cmd + I', action: 'Italique' },
        { key: 'Ctrl + U', action: 'Souligner' },
        { key: 'Cmd + U', action: 'Souligner' }
    ],
    'Navigation': [
        { key: 'Ctrl + F', action: 'Rechercher' },
        { key: 'Cmd + F', action: 'Rechercher' },
        { key: 'Début / Fin', action: 'Aller au Début/à la Fin de la Ligne' },
        { key: 'Cmd + Flèche Gauche / Cmd + Flèche Droite', action: 'Aller au Début/à la Fin de la Ligne' }
    ],
    'Raccourcis Navigateur (pendant la navigation)': [
        { key: 'Ctrl + R', action: 'Recharger la Page' },
        { key: 'Cmd + R', action: 'Recharger la Page' },
        { key: 'Ctrl + T', action: 'Ouvrir un Nouvel Onglet' },
        { key: 'Cmd + T', action: 'Ouvrir un Nouvel Onglet' },
        { key: 'Ctrl + W', action: 'Fermer un Onglet' },
        { key: 'Cmd + W', action: 'Fermer un Onglet' }
    ],
    'Raccourcis Système': [
        { key: 'Touche Windows + L', action: 'Verrouiller l\'Ordinateur/Se Déconnecter' },
        { key: 'Ctrl + Maj + Power (ou Eject)', action: 'Verrouiller l\'Ordinateur/Se Déconnecter' },
        { key: 'Ctrl + Maj + Échap', action: 'Forcer la Fermeture d\'une Application' },
        { key: 'Cmd + Option + Échap', action: 'Forcer la Fermeture d\'une Application' }
    ],
};

// Populate the menu with shortcuts
Object.keys(shortcuts).forEach(category => {
    const categoryHeader = document.createElement('div');
    categoryHeader.innerHTML = `<b>${category}</b>`;
    shortcutMenu.menu.appendChild(categoryHeader);
    
    shortcuts[category].forEach(shortcut => {
        const shortcutEntry = document.createElement('div');
        shortcutEntry.innerHTML = `<span>${shortcut.key}</span> - ${shortcut.action}`;
        shortcutMenu.menu.appendChild(shortcutEntry);
    });
});



const templates = [
    {
        name: 'Ordre du jour de la réunion',
        content: `
            <h2>Ordre du jour de la réunion</h2>
            <ol>
                <li>Introduction</li>
                <li>Examen du compte rendu de la réunion précédente</li>
                <li>Sujets de discussion</li>
                <li>Actions à entreprendre</li>
                <li>Prochaines étapes</li>
            </ol>
        `
    },
    {
        name: 'Liste de tâches',
        content: `
            <h2>Liste de tâches</h2>
            <ul>
                <li>Tâche 1</li>
                <li>Tâche 2</li>
                <li>Tâche 3</li>
            </ul>
        `
    },
    {
        name: 'Feuille de présence',
        content: `
            <h2>Feuille de présence</h2>
            <table>
                <tr>
                    <th>Nom</th>
                    <th>Présent</th>
                    <th>Absent</th>
                </tr>
                <tr>
                    <td>Nom 1</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                </tr>
                <tr>
                    <td>Nom 2</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                </tr>
            </table>
        `
    },
    {
        name: 'Facture',
        content: `
            <h2>Facture</h2>
            <p><strong>Numéro de facture:</strong> XXX</p>
            <p><strong>Date:</strong> [Date]</p>
            <p><strong>Client:</strong> [Nom du client]</p>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Produit 1</td>
                    <td>1</td>
                    <td>10€</td>
                    <td>10€</td>
                </tr>
                <tr>
                    <td>Produit 2</td>
                    <td>2</td>
                    <td>20€</td>
                    <td>40€</td>
                </tr>
            </table>
            <p><strong>Total à payer:</strong> [Total]</p>
        `
    },
    {
        name: 'Contrat de service',
        content: `
            <h2>Contrat de service</h2>
            <p>Le [Date], entre [Nom du fournisseur] (le « Fournisseur »), situé au [Adresse du fournisseur], et [Nom du client] (le « Client »), situé au [Adresse du client].</p>
            <p>Les parties conviennent des conditions suivantes:</p>
            <ol>
                <li>Description du service</li>
                <li>Conditions de paiement</li>
                <li>Responsabilités du fournisseur</li>
                <li>Responsabilités du client</li>
                <li>Clause de résiliation</li>
            </ol>
        `
    },
    {
        name: 'Invitation à un événement',
        content: `
            <h2>Invitation à un événement</h2>
            <p>Cher [Nom du destinataire],</p>
            <p>Nous sommes heureux de vous inviter à notre événement qui aura lieu le [Date] à [Lieu].</p>
            <p>Merci de confirmer votre présence avant le [Date limite de confirmation].</p>
            <p>Cordialement,</p>
            <p>[Votre nom]</p>
        `
    },
    {
        name: 'Note de service',
        content: `
            <h2>Note de service</h2>
            <p>Chers collègues,</p>
            <p>Nous tenons à vous informer que [Détails de la note de service].</p>
            <p>Merci de prendre note de cette information et de contacter [Nom de la personne de contact] pour toute question.</p>
            <p>Cordialement,</p>
            <p>[Votre nom]</p>
        `
    },
    {
        name: 'Rapport mensuel',
        content: `
            <h2>Rapport mensuel</h2>
            <p><strong>Mois:</strong> [Mois]</p>
            <p><strong>Résumé:</strong> [Résumé des activités du mois]</p>
            <p><strong>Objectifs atteints:</strong> [Liste des objectifs atteints]</p>
            <p><strong>Prochaines étapes:</strong> [Liste des prochaines étapes]</p>
        `
    },
    {
        name: 'Plan de projet',
        content: `
            <h2>Plan de projet</h2>
            <ol>
                <li>Introduction</li>
                <li>Objectifs du projet</li>
                <li>Portée du projet</li>
                <li>Étapes du projet</li>
                <li>Échéancier</li>
            </ol>
        `
    },
    {
        name: 'CV',
        content: `
            <h2>Curriculum Vitae</h2>
            <p><strong>Nom:</strong> [Nom]</p>
            <p><strong>Adresse:</strong> [Adresse]</p>
            <p><strong>Téléphone:</strong> [Téléphone]</p>
            <p><strong>Email:</strong> [Email]</p>
            <p><strong>Expérience professionnelle:</strong></p>
            <ul>
                <li>Poste 1</li>
                <li>Poste 2</li>
            </ul>
            <p><strong>Formation:</strong></p>
            <ul>
                <li>Formation 1</li>
                <li>Formation 2</li>
            </ul>
        `
    },
    {
        name: 'Carte de visite',
        content: `
            <h2>Carte de visite</h2>
            <p><strong>Nom:</strong> [Nom]</p>
            <p><strong>Titre:</strong> [Titre]</p>
            <p><strong>Adresse:</strong> [Adresse]</p>
            <p><strong>Téléphone:</strong> [Téléphone]</p>
            <p><strong>Email:</strong> [Email]</p>
        `
    },
    {
        name: 'Liste de présence',
        content: `
            <h2>Liste de présence</h2>
            <table>
                <tr>
                    <th>Nom</th>
                    <th>Présent</th>
                    <th>Absent</th>
                </tr>
                <tr>
                    <td>Nom 1</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                </tr>
                <tr>
                    <td>Nom 2</td>
                    <td><input type="checkbox"></td>
                    <td><input type="checkbox"></td>
                </tr>
            </table>
        `
    },
    {
        name: 'Carte d\'invitation',
        content: `
            <h2>Carte d'invitation</h2>
            <p>Cher [Nom du destinataire],</p>
            <p>Nous sommes heureux de vous inviter à [Nom de l'événement] qui aura lieu le [Date] à [Lieu].</p>
            <p>Veuillez confirmer votre présence avant le [Date limite de confirmation].</p>
            <p>Au plaisir de vous voir!</p>
        `
    },
    {
        name: 'Rapport de dépenses',
        content: `
            <h2>Rapport de dépenses</h2>
            <p><strong>Période:</strong> [Période]</p>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Montant (€)</th>
                </tr>
                <tr>
                    <td>01/01/2024</td>
                    <td>Repas d'affaires</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>02/01/2024</td>
                    <td>Frais de déplacement</td>
                    <td>30</td>
                </tr>
            </table>
            <p><strong>Total:</strong> [Total]</p>
        `
    }
];

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
    document.getElementById("templateDropdown").classList.toggle("show");
}

// Function to insert the selected template into the editor
function insertTemplate(templateContent) {
    document.querySelector('.editor').innerHTML += templateContent;
}

// Create template options dynamically and add event listeners
document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenu = document.getElementById("templateDropdown");
    templates.forEach(template => {
        const option = document.createElement("a");
        option.textContent = template.name;
        option.addEventListener("click", function() {
            insertTemplate(template.content);
            toggleDropdown();
        });
        dropdownMenu.appendChild(option);
    });
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}







// Function to handle social media sharing
function shareOnSocialMedia(url) {
    // Open the sharing URL in a new window
    window.open(url, '_blank', 'width=600,height=400');
  }
  
  // Add event listeners to each social media button
  document.querySelectorAll('.social-icon').forEach(function(button) {
    button.addEventListener('click', function() {
      // Get the target URL based on the clicked button
      var shareUrl = '';
      switch (button.classList[1]) {
        case 'facebook':
          shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
          break;
        case 'pinterest':
          shareUrl = 'https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(window.location.href);
          break;
        case 'twitter':
          shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href);
          break;
        case 'whatsapp':
          shareUrl = 'whatsapp://send?text=' + encodeURIComponent(document.title + ': ' + window.location.href);
          break;
        case 'reddit':
          shareUrl = 'https://reddit.com/submit?url=' + encodeURIComponent(window.location.href);
          break;
        case 'quora':
          shareUrl = 'https://www.quora.com/share?url=' + encodeURIComponent(window.location.href);
          break;
        case 'telegram':
          shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent(window.location.href);
          break;
        default:
          // Do nothing if the button class doesn't match
          return;
      }
      // Call the sharing function with the constructed URL
      shareOnSocialMedia(shareUrl);
    });
  });
  
