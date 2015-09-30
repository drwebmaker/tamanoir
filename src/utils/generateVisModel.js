/**
 * Created by valeriy.abornyev on 9/29/2015.
 */
define(function (require) {

    function generateVisModel(collection) {
        collection.each(function(model){
            model.attributes.metadata.elements.forEach(function(item) {
                    console.log(item);
            });
        });

    }
    return generateVisModel;
});