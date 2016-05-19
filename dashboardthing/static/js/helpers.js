
/**
 * ### partial Helper
 *
 * This will include a template as a partial
 * use instead of {{> partialname}}
 * Example :
 *
 * {{#each someVariable}}
 *
 *     {{partial "templates/someTemplate.hbs"}}
 *
 * {{/each}}
 *
 * someTemplate will have access to the variables from the parent template
 *
 *
 **/
Handlebars.registerHelper('partial', function (templateName, context) {
    return new Handlebars.SafeString(TEMPLATES[templateName](this));
});


Handlebars.registerHelper('slugify', function (word, context) {
    return word ? new Handlebars.SafeString(word.replace(/\s/g, '_')): '';
});

Handlebars.registerHelper('iconify', function (word, context) {
    if (word === 'Assigned to invalid stage') {
        return '<span class="glyphicon glyphicon-exclamation-sign"></span>';
    } else if (word === 'Close date not realistic based off current stage') {
        return '<span class="glyphicon glyphicon-calendar"></span>';
    } else if (word === 'Expected close date past') {
        return '<span class="glyphicon glyphicon-calendar"></span>';
    } else if (word === 'No contacts assigned') {
        return '<span class="glyphicon glyphicon-phone-alt"></span>';
    } else if (word === 'Open task due in past') {
        return '<span class="glyphicon glyphicon-calendar"></span>';
    }

});

Handlebars.registerHelper( 'isEqual', function( thing1, thing2, options ) {
    //does strict equality comparison
    if (thing1 === thing2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});