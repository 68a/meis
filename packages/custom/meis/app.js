'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Meis = new Module('meis');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Meis.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Meis.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Meis.menus.add({
    title: 'Meis',
    link: 'all meis',
    roles: ['authenticated'],
  });

  Meis.menus.add({
    title: 'Create New Mei',
    link: 'create mei',
    roles: ['authenticated'],
  });

  
  Meis.aggregateAsset('css', 'meis.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Meis.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Meis.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Meis.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Meis;
});
