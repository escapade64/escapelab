fetch('https://nominis.cef.fr/json/saintdujour.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Convertit la réponse en JSON
    })
    .then(data => {
        console.log(data); // `data` est un objet JavaScript contenant les données JSON
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
