var namespace = 'NIME_BASE__';
require.config({
    baseUrl: '/resource',
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds: 1200,
    paths : {
        constants : namespace+'Constants?noext',
        jquery : namespace+'jquery?noext',
        ractive : namespace+'ractiveJs?noext',
        pubSub : namespace+'pubSub?noext',
        bootstrap : namespace+'js/bootstrap.min.js?noext',
        jqueryui : namespace+'js/jquery-ui-1.10.4.min.js?noext',
        underscore : namespace+'underscore?noext',
        metisMenu : namespace+'metisMenu/jquery.metisMenu.js?noext',
        select2 : namespace+'select2/select2.full.min.js?noext',
        select2AdaptorJs : namespace+'select2AdaptorJs?noext',
        slimscroll : namespace+'slimscroll/jquery.slimscroll.min.js?noext',
        moment : 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js?noext',
        icheck : 'https://cdnjs.cloudflare.com/ajax/libs/iCheck/1.0.2/icheck.js?noext',
        sweetalert : 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js?noext',
        selectize : 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.4/js/standalone/selectize.min.js?noext',
        tinymce : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.9/tinymce.min.js?noext',
        Chart : 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js?noext',
        inspinia : namespace+'js/inspinia.js?noext',
        nime : namespace+'nime?noext',
        text : namespace+'text_loader?notext',
        Template : namespace+'TemplateController?noext',
        LeftProfile : namespace+'LeftProfileController?noext',
        Heading : namespace+'HeadingController?noext',
        LeftNavigation : namespace+'LeftNavigationController?noext',
        LOADING : namespace+'LOADINGController?noext',
        LeftNavigation_p : namespace+'LeftNavigation_Partials?noext',
        LeftProfile_p : namespace+'LeftProfile_partials?noext',
        Template_p : namespace+'Template_partials?noext',
        Header_p : namespace+'Header_partials?noext',
        Footer_p : namespace+'Footer_partials?noext',
        Heading_p : namespace+'Heading_partials?noext',
        Home_p : namespace+'Home_partials?noext',
        Setting_p : namespace+'Setting_partials?noext',
        LOADING_p : namespace+'LOADING_partials?noext',
        SELECTIZE_p : namespace+'SELECTIZE_partials?noext'


        
    },
    shim : {
        ractive : ['bootstrap'],
        bootstrap : ['jquery','jqueryui'],
        jqueryui : ['jquery'],
        select2AdaptorJs : ['select2'],
        metisMenu : ['jquery'],
        slimscroll : ['jquery'],
        icheck : ['jquery'],
        pubSub : {
          exports: 'PubSub'  
        },
        tinymce : {
            exports : 'tinyMCE'
        },
        select2: {
            exports: "$.fn.select2"
        },
        inspinia : ['pubSub','constants','metisMenu','LOADING'],
        nime : ['inspinia']

    }
});

require( ["Template"], function (template) {
    template.app.init()
    .done(function(){
        var finalnamespace = nimeConfig.context.breadCrumbMapping == null ? '':namespace;
        PubSub.publish(constants.TEMPLATE_LOAD);
        require(['/resource/'+finalnamespace+nimeConfig.context.page+'Controller?noext'],function(home){
            console.log(home);
        });
    });
    
});