define( 'nime', ["inspinia","ractive","moment","jquery","underscore"], function (inspinia,Ractive,moment,jquery,underscore) {

    // set up the app instance
    var nime = {
        config  : {
            modalData : {


                'schedule_sync' : {
                    'id' : 'jmModal',
                    'size' : 'modal-xl',
                    'Title':'Sync Existing Jobs',
                    'partialName':'Schedule_Sync_Partials',
                    'buttons' : [
                    {'name' : 'Select','icon' : ' fa-send','event' : 'select','color' : 'bg-green text-white'}
                    ]
                },
                'inbound_sync' : {
                    'id' : 'jmModal',
                    'size' : 'modal-xl',
                    'Title':'Sync Existing Integration Jobs',
                    'partialName':'Inbound_Sync_Partials',
                    'buttons' : [
                    {'name' : 'Select','icon' : ' fa-send','event' : 'select','color' : 'bg-green text-white'}
                    ]
                },
                'schedule_create' : {
                    'id' : 'jmModal',
                    'size' : 'modal-xl',
                    'Title':'Edit Schedule Job',
                    'partialName':'Schedule_Create_Partials',
                    'buttons' : [
                    {'name' : ' Save ','icon' : ' fa-send','event' : 'select','color' : 'bg-green text-white'}
                    ]
                },
                'apex_sync' : {
                    'id' : 'jmModal',
                    'size' : 'modal-lg',
                    'Title':'Sync Details',
                    'partialName':'ApexJob_Sync_Partials',
                    'buttons' : [
                    {'name' : ' Sync ','icon' : ' fa-send','event' : 'select','color' : 'bg-green text-white'}
                    ]
                },
                'error' : {
                    'id' : 'jmModal',
                    'size' : 'modal-lg',
                    'Title':'Error Detail',
                    'partialName':'error_partials',
                    'buttons' : [
                    ]
                },
                'showbody' : {
                    'id' : 'jmModal',
                    'size' : 'modal-lg',
                    'Title':'Request Body Detail',
                    'partialName':'ShowRequestBody_Partials',
                    'buttons' : [
                    ]
                },
                'showLogs' : {
                    'id' : 'jmModal',
                    'size' : 'modal-lg',
                    'Title':'Job/Request Logs',
                    'partialName':'ShowLogs_Partials',
                    'buttons' : [
                    ]
                },
                'apexjob_instancelist' : {
                    'id' : 'jmModal',
                    'size' : 'modal-xl',
                    'Title':'Jobs History',
                    'partialName':'ApexJob_Instance_Modal_Partials',
                    'buttons' : [

                    ]
                },
                'restjob_historylist' : {
                    'id' : 'jmModal',
                    'size' : 'modal-xl',
                    'Title':'Jobs History',
                    'partialName':'Restjob_Instance_Modal_Partials',
                    'buttons' : [

                    ]
                }
                
            }
        },
        utility : {
            sendRequest : function(request){ 
                //$('input,button,a').addClass('disabled');
                var showError = request.showError || true;
                var d = $.Deferred();
                $.ajax({
                    type: request.method,
                    url: request.endpoint,
                    data : {'data' : JSON.stringify(request.data)},
                    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        xhrObj.setRequestHeader("Accept","application/json");
                    }
                }).done(function(response) {
                    //$('input,button,a').removeClass('disabled');
                    if (response != undefined && 'success' === response.status) {
                        d.resolve(response);
                    } else {
                        if(showError){
                            nime.utility.showNoty('error',response.message);
                        }
                        
                        d.reject(response.message);
                    }
                }).fail(function(error) {
                    var message = 'Oh snap! something went wrong!';
                    if(error.status == 401){
                        message = 'Session time out! Please refresh the page!';
                    }
                    $('input,button,a').removeClass('disabled');
                    if(showError){
                        nime.utility.showNoty('error',message);
                    }
                    d.reject(error);
                });
                
                return d;
            },
            initUrl : function(url){
                console.log(url);
                History.pushState({},url ,url);
            },
            loadStyles : function(urls){
                var d = $.Deferred(); 
                var queue = [];
                _.each(urls,function(el, index) {
                    var css = jQuery("<link>");
                    css.attr({
                        rel:  "stylesheet",
                        type: "text/css",
                        href: el
                    });
                    if (!$("link[href='"+el+"']").length)
                        queue.push($("head").append(css));
                });
                $.when.apply(null, queue).done(function() {
                    console.log('yeee loading css files');
                    d.resolve();
                    
                });
                return d;
                
            },
            loadScripts : function(urls){
                var d = $.Deferred();
                var queue = [];
                _.each(urls,function(el, index) {
                    console.log(el);
                    if($('script[src="'+el+'"]').length == 0)
                        queue.push($jm.App.loadScript(el));
                });
                $.when.apply(null, queue).done(function() {
                    console.log('yeee loading files');
                    d.resolve();
                    
                });
                return d.promise();
                
            },
            loadScript : function(path) {
                var d = $.Deferred(); 
                var scr = document.createElement('script');
                scr.onload = function(){
                    d.resolve();
                };
                scr.src = path;
                document.body.appendChild(scr);
                return d;
            },
            urlExists : function(url)
            {
                var http = new XMLHttpRequest();
                http.open('HEAD', url, false);
                http.send();
                return http.status!=404;
            },
            prepareErrorPageData(type,title,message){
                return {'type':type,'title':title,'message':message};
            },
            isMobile : function() {
                var a = navigator.userAgent||navigator.vendor||window.opera;
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
            },
            parseUrl : function(){ 
                return _.object(_.compact(_.map(location.search.slice(1).split('&'), function(item) {  if (item) return item.split('='); })));
            },
            convertDataURIToBinary : function(dataURI) {
                var BASE64_MARKER = ';base64,';
                var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                var base64 = dataURI.substring(base64Index);
                var raw = window.atob(base64);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));

                for(i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                }
                return array;
            },
            filesize : function(size) {
                var string;
                if (size >= 1024 * 1024 * 1024 * 1024 / 10) {
                    size = size / (1024 * 1024 * 1024 * 1024 / 10);
                    string = "TB";
                } else if (size >= 1024 * 1024 * 1024 / 10) {
                    size = size / (1024 * 1024 * 1024 / 10);
                    string = "GB";
                } else if (size >= 1024 * 1024 / 10) {
                    size = size / (1024 * 1024 / 10);
                    string = "MB";
                } else if (size >= 1024 / 10) {
                    size = size / (1024 / 10);
                    string = "KB";
                } else {
                    size = size * 10;
                    string = "BT";
                }
                return (Math.round(size) / 10) +''+ string;
            },
            subString : function(element,start,end){
                return element.substring(start,end);
            },
            makePartial : function(key,template){
                console.log(key);
                console.log(template);
                if (!!Ractive.partials[key]) return key;
                Ractive.partials[key] = template;
                return key;
            },
            addRactiveHealper : function(){
                Ractive.prototype.data = { _: _ };
                Ractive.prototype.data.$ = $;
                Ractive.prototype.data.moment = moment;
                Ractive.prototype.data.nimeConfig = nimeConfig;
                Ractive.prototype.data.constants = constants;
                var helpers = Ractive.defaults.data;



            },

            ractiveExtend : function(){




                Ractive.components.ICHECK = Ractive.extend({
                    template: '<input type="checkbox"/>',
                    onrender() {
                        var thisElement ;
                        this.observe('check', function(newValue, oldValue, keypath){
                            console.log(newValue);
                            if(newValue && _.isUndefined(oldValue)){
                                $(this.find('input[type="checkbox"]'))[0].setAttribute("checked", "checked");
                            }

                            if(!_.isUndefined(oldValue)){
                                console.log(newValue);
                                console.log(thisElement);
                                thisElement.icheck.iCheck(newValue?'check':'uncheck');
                            }

                            if(_.isUndefined(oldValue)){
                                thisElement = this;
                                var icheck = this.icheck = $(this.find('input[type="checkbox"]'))

                                .iCheck({
                                    checkboxClass: 'icheckbox_square-green',
                                    radioClass: 'iradio_square-green'
                                });

                                icheck.on('ifChecked', function(evt){

                                    console.log(thisElement.get());
                                    thisElement.set( 'check', true );
                                    thisElement.fire('icheckClicked');
                                });
                                icheck.on('ifUnchecked', function(evt){

                                    console.log(evt);
                                    console.log(thisElement);
                                    thisElement.set( 'check', false );
                                    thisElement.fire('icheckClicked');
                                }); 
                            }

                        }, { defer: true })



                    },
                    onteardown() {
                        this.icheck.iCheck('destroy')
                    }
                });

                Ractive.components.tinyEditor = Ractive.extend({
                    template: '<textarea  twoway="false" >{{>content}}</textarea>',
                    onrender() {
                        var thisInstance = this;
                        tinymce.init({ 
                            branding : false,
                            selector: 'textarea',  
                            cleanup_on_startup : true,
                            verify_html : true,
                            fix_content_duplication : true,
                            fix_nesting : true,
                            fix_table_elements : true,
                            height: thisInstance.get('height'),
                            plugins: [
                            'advlist autolink lists link image imagetools charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code',
                            'textcolor colorpicker','emoticons hr pagebreak','codesample'
                            ],
                            menubar : ['file','insert'],
                            toolbar: 'insertfile undo redo | styleselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample | forecolor backcolor',
                            visualblocks_default_state : true,
                            pagebreak_split_block : true,
                            imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
                            entity_encoding : 'raw',
                            setup : function(ed) {
                                thisInstance.editor = ed;
                                ed.on("change redo undo paste cut keyup NodeChange SetContent", function(e){
                                    thisInstance.set('content',ed.getContent());

                                });
                            }

                        });



                    },
                    onteardown() {
                        this.editor.destroy();
                    }
                });


                Ractive.components.SELECTIZE = Ractive.extend({
                    template: '<select>{{yield}}</select>',
                    onrender() {
                        console.log(this);
                        var thisElement ;
                        thisElement = this;
                        var selectize = this.selectize = $(this.find('select'))
                        .selectize({
                            create: false,
                            options : thisElement.get('options'),
                            valueField : thisElement.get('valueField'),
                            labelField : thisElement.get('labelField'),
                            placeholder : _.isUndefined(thisElement.get('placeholder')) ? 'Select Value' : thisElement.get('placeholder'),
                            onChange : function(){
                                console.log(this);
                                console.log(this.getValue());
                                thisElement.set('selectizeItem',this.getValue());
                            }

                        });



                    },
                    onteardown() {

                    }
                });

                Ractive.components.SELECTIZEEMAIL = Ractive.extend({
                    template: '<select>{{yield}}</select>',
                    onrender() {
                        console.log(this);
                        var thisElement ;
                        thisElement = this;
                        var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                        '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

                        var selectize = this.selectize = $(this.find('select'))
                        .selectize({
                            persist: false,
                            maxItems: null,
                            valueField: 'id',
                            labelField: 'text',
                            options : [],
                            items : _.isUndefined(thisElement.get('items')) ? [] : thisElement.get('items'),
                            searchField: ['id', 'text'],
                            placeholder : _.isUndefined(thisElement.get('placeholder')) ? 'Select Value' : thisElement.get('placeholder'),
                            onChange : function(){
                                console.log(thisElement.get('property'));
                                thisElement.set(thisElement.get('property'),this.getValue());
                            },
                            render: {
                                item: function(item, escape) {
                                    return '<div>' +
                                    (item.text ? '<span class="text">' + escape(item.text) + '</span>' : '') +
                                    (item.id ? '<span class="id">' + escape(item.id) + '</span>' : '') +
                                    '</div>';
                                },
                                option: function(item, escape) {
                                    var label = item.text || item.id;
                                    var caption = item.text ? item.id : null;
                                    return '<div>' +
                                    '<span class="label">' + escape(label) + '</span>' +
                                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                                    '</div>';
                                }
                            },
                            createFilter: function(input) {
                                var match, regex;

                                // email@address.com
                                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                                match = input.match(regex);
                                if (match) return !this.options.hasOwnProperty(match[0]);
                                
                                // name <email@address.com>
                                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                                match = input.match(regex);
                                if (match) return !this.options.hasOwnProperty(match[2]);
                                
                                return false;
                            },
                            create: function(input) {
                                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                                    return {id: input};
                                }
                                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                                if (match) {
                                    return {
                                        id : match[2],
                                        text  : $.trim(match[1])
                                    };
                                }
                                alert('Invalid email address.');
                                return false;
                            }
                        });



                    },
                    onteardown() {

                    }
                });

                Ractive.decorators.select2.type.recordsSelection = function (node) {
                    return {
                        width : '100%',
                        tokenSeparators: [','],
                        closeOnSelect:true,
                        allowClear: true,
                        minimumInputLength: 1,
                        tags : true,
                        ajax: {
                            url: $jm.endpoints.search.searchRecords.endpoint,
                            dataType: 'json',
                            delay: 250,
                            type: $jm.endpoints.search.searchRecords.endpoint.method,
                            quietMillis: 50,
                            data: function (params) {
                                var objectNames = $(node).attr('data-object');
                                objectNames = objectNames.split(',');
                                var dataObj = $jm.endpoints.search.searchRecords.data;
                                dataObj.payload = {};
                                dataObj.payload.query = params.term || "";
                                dataObj.payload.page = params.page || 1;
                                dataObj.payload.objectNames = objectNames;
                                return {'data' : JSON.stringify(dataObj)};
                            },
                            processResults: function (dataSource, page) {
                                dataSource.result.results = _.map(dataSource.result.results,function(objectValue,key){
                                    objectValue.children =  _.map(_. mapObject(objectValue.children,function(value,key){
                                        return {id :value.Id,text :value.Id,data : value}
                                    }));
                                    return objectValue;

                                });
                                return dataSource.result;
                            },
                            cache: true
                        },
                        templateResult : function(state)
                        {   
                            if (!state.id) { return state.text; }
                            data=state.data;
                            if(data){
                                this.description = data.Name ? data.Name : data.CaseNumber? data.CaseNumber : data.Title? data.Title : data.Id; 
                            }else{
                                this.description = state.text;
                            }

                            return this.description;
                        },
                        templateSelection: function(state)
                        {
                            if (!state.id) { return state.text; }
                            data=state.data ? state.data : state.text ? state.text:state.id;
                            return  data.Name ? data.Name : data.CaseNumber? data.CaseNumber : data.Title? data.Title : data.Id ? data.Id :data;
                        },
                        escapeMarkup: function (m) { return m; },
                        dropdownCssClass: "bigdrop"
                    }
                };



            },
            cuniq : function() {
                $jm.Data.c = $jm.Data.c || 1;
                var d = new Date(),
                m = d.getMilliseconds() + "",
                u = ++d + m + (++$jm.Data.c === 10000 ? ($jm.Data.c = 1) : $jm.Data.c);
                
                return u;
            },
            encode :function(data){
                return window.btoa(JSON.stringify(data));
            },
            decode : function(data){
                return JSON.parse(window.atob(data));
            },
            showNoty : function(msgtype,msg){
                swal({
                    title : '',
                    text: msg,
                    type: msgtype
                });
                navigator.vibrate(50);
            },
            showConfirm : function(){
                return swal(_.toArray(arguments));
            },
            initModal : function(data,id){
                var d = $.Deferred();
                var modalTemplate = new Ractive({
                    el: '.modalContainer',
                    template: id,
                    data: {

                        Context : data
                    },
                    onrender : function(data){
                        d.resolve(this);

                    }


                });

                return d;
            },
            initSubModal : function(data,id){
                var d = $.Deferred();
                var modalTemplate = new Ractive({
                    el: '.modalContainer_sub',
                    template: id,
                    data: {

                        Context : data
                    },
                    onrender : function(data){
                        d.resolve(this);

                    }


                });

                return d;
            }
        }
    };
	PubSub.subscribe(constants.TEMPLATE_LOAD,function(){
        nime.utility.addRactiveHealper();
    });
    return nime;
});