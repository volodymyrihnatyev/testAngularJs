/**
 * Route definitions is here
 */
module.exports = function(router) {


 
    router.route('/form')
        .post(function (req, res) {
         var response = "third";
        res.send(response);
});

                
      };