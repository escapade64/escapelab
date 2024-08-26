Specification technique et projet pour le service Brescapade. 

Objectif de Brescapade : 
- Aider à la prise de décision en mer, et à terre, en vue de la navigation et de la peche à Keranguilis

Attendu : 
- Site web ou web app accessible sur PC ou téléphone (responsive) permettant l'accès à un bouquet de services
- Rapidité et simplicité d'accès
- Hebergé sur un serveur (ex Git) et non référencé (attention aux données perso peche)
 
Principes : 
- Pour la version live : données actuelles et projection à +6h (durée max d'une sortie)
- Pour la version planning : ensemble des données temporelles

Données de base : 
- Heure
- Position GPS du téléphone
- Hauteur d'eau
- Montant / descendant
- Heure de la prochaine étale
- Horaire des prochaines vedettes et cales associées

Type de services : 
- Carte avec photos aérienne et couches d'eau en fonction des hauteurs d'eau
- Suggestions de zone et techniques de pêche
- Marquage point de casier
- Marquage point de peche
- Infos météo : Vent, nébulosité et évolution à 6h
- Hauteur d'eau estimée sous le bateau, sur la base du litto3D (zone proche et info type radar)
- zones des cales à l'Arcouest et notamment le moment favorable où on peux accoster à l'Est sans les vedettes

Découpage et livrables : 
- Une page accueil sans carte avec données de base, hyper slim
- Une page live carte avec le niveau d'eau actuel et un toggle horaire jusqu'à +6h
- Une page planning avec plus de réglage horaire
- Une page données avec paramètres et réglages

Solutions préconisées :
- Données marée à rentrer à la main dans tableau sur serveur
- API météo sur Meteoblue (ils ont la nébulosité), même s'il faut payer
- Carto Leaflet
- Génération des tiles avec Qgis ou via appli perso sous Python
- Données vedette à rentrer également à la main (Vedettes de Bréhat, tours de l'île, Sur Mer, vedettes de Perros ou de St Quay).
- API de tracking bateau avec affichage carte (là, il y aurait du niveau...)  
  
