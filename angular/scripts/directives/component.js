// Filters
componentModule.filter('paymeth', function () {
  return function (param) {
    var str = "";
    if(param.hasOwnProperty("nickname")){
      str = param.nickname;
    }else{
      if(param.type == "account"){
        str = param.accountType+" (...."+param.cardNumber+")";
      }else{
        str = param.cardType+" (...."+param.cardNumber+")";
      }
    }
  }
})

componentModule.filter('formattedPaymentMethod', function () {
  return function (paymentMethod) {
    var str = "";
    if(paymentMethod){
      if(paymentMethod.hasOwnProperty("cardNickName") || paymentMethod.hasOwnProperty("bankAccountHolderNickName")){
        str = paymentMethod.hasOwnProperty("cardNickName") && paymentMethod.cardNickName.length > 0 ? paymentMethod.cardNickName : paymentMethod.bankAccountHolderNickName;
      }else{
        if(paymentMethod.hasOwnProperty("maskedValueForEncryptedValueForCreditCard") &&  paymentMethod.maskedValueForEncryptedValueForCreditCard.length > 0){
          str = paymentMethod.maskedValueForEncryptedValueForCreditCard;
        }else{
          str = paymentMethod.maskedValueForValueForBank;
        }
      }  
    }   
    return str;
  };
});

/**
 * Filter to display correct payment method type
 * Used in Manage Payments Landing Page
 */
componentModule.filter('paymentMethodDefault', function () {
    return function (param) {
        var str = '';
        if(param.hasOwnProperty("defaultPayment")) {
            str = (param.defaultPayment) ? ' - Default' : '';
        }

        return str;
    };
});

componentModule.filter('paymentSubmittedBy', function () {
    return function (param) {
        if(param == null) return '';
        var str = '';
        if(param.submittedBy.toLowerCase() == 'agent') {
            str = "Your Agent - " + param.agentName;
        }
        else {
            str = param.submittedBy;
        }

        return str;
    };
});

/**
 * Filter to display correct payment method type
 * Used in Manage Payments Landing Page
 */
componentModule.filter('paymentMethodType', function () {
    return function (param) {
        var str = '';

        if(param && param.indicatorForBankOrCreditCard === 'B') {
            str = PAYMENT_METHOD_CODES[ param.bankAccountType ];
        }
        else if(param && param.indicatorForBankOrCreditCard === 'C'){
            str = PAYMENT_METHOD_CODES[ param.cardType ];
        }
        return str;
    };
});

/**
 * Filter to display correct payment method name
 * Used in Manage Payments Landing Page
 */
componentModule.filter('paymentHolderName', function () {
    return function (param) {
        var str = '';

        if(param && param.indicatorForBankOrCreditCard === 'B') {
            str = param.accountHolderName;
        }
        else if(param && param.indicatorForBankOrCreditCard === 'C'){
            str = param.cardHolderName;
        }
        return str;
    };
});

/**
 * Filter to display payment method description
 * Used in Manage Payments Landing Page
 */
componentModule.filter('paymentMethodDescription', function (stringUtils) {
    return function (param) {
        if(param == null) return '';

        var str = '';

        if(param && param.indicatorForBankOrCreditCard === 'B') {
          if(!stringUtils.isBlank(param.bankAccountHolderNickName)) {
              str = param.bankAccountHolderNickName;
          }
          else {
             str = PAYMENT_METHOD_CODES[ param.bankAccountType ];
          }
          str +=  stringUtils.fourDigitFormat(param.maskedValueForValueForBank);
        }
        else if(param && param.indicatorForBankOrCreditCard === 'C') {
            if(!stringUtils.isBlank(param.cardNickName)) {
                str = param.cardNickName;
            }
            else {
                str = PAYMENT_METHOD_CODES[ param.creditCardType ];
            }
            str +=  stringUtils.fourDigitFormat(param.maskedValueForEncryptedValueForCreditCard);
        }
        return str;
    };
});

/**
 * Filter to display payment history date
 * Used in Payment History landing page
 */
componentModule.filter('paymentHistoryDate', function (stringUtils) {
    return function (param) {
        if(param == null) return '';
        var str = '';
        if(param && param.paymentStatus.toLowerCase() === 'scheduled') {
            str = 'Pending';
        }
        else {
           str = param.paymentDate;
        }
        return str;
    };
});

// Directives
componentModule.filter('paymentMethodEditNumber', function (stringUtils) {
    return function (str) {
        return stringUtils.fourDigitFormat(str);
    };
});


componentModule.filter('orderObjectBy', function(paymentMethodDescriptionFilter,paymentHolderNameFilter,paymentMethodTypeFilter){
    return function(input, attribute,direction) {
        if (!angular.isObject(input)) return input;

        var array = [];
        for(var i=0; i<input.length; i++) {
            array.push(input[i]);
        }

        array.sort(function(a, b){
            //get attribute
            if(attribute === 'type') {
              a = paymentMethodTypeFilter(a);
              b = paymentMethodTypeFilter(b);
            }
            else if(attribute === 'nickname'){
              a = paymentMethodDescriptionFilter(a);
              b = paymentMethodDescriptionFilter(b);
            }
            else {
                //default to payment holder name
                a = paymentHolderNameFilter(a);
                b = paymentHolderNameFilter(b);
            }

            if(direction)
                return a >  b;
            else
                return a < b;
        });
        return array;
    }
});


// Directives
componentModule.filter('formattedPolicyTitle', function(){
  return function (regarding) {
    return "#" + regarding.billingAccountNumber + " - " + regarding.policyNickName + " - " + regarding.description;
  };
});

// Directives

//used for character counter for input/textarea elements
componentModule.directive('handleBack', function($rootScope, $location, $routeParams) {
  return {
    restrict: 'A',
    link: function(scope, elm, attr) {
      $rootScope.$on('$routeChangeStart', function(scope, next, current) {
        if(current && current.$$route && current.$$route.pageName == "step2" && next && next.$$route && next.$$route.pageName == "step1"){
          if(!confirm("Are you sure you want to leave this page?")){
            $location.path("/"+$routeParams.user_id+"/verify");
          }
        }
      });
    }
  };
});



componentModule.directive('overPayment', function($location, $routeParams){
  return {
    restrict: 'E',
    link: function(scope, elm, attr){

      scope.gotoStep2 = function(){
        $location.path($routeParams.user_id+'/verify'); 
        scope.closeOoverPaymentModal(); 
      }

      scope.$on("overpayment", function(event, args){
        scope.showOverPaymentDialog(args.title, args.description);
      });

      scope.showOverPaymentDialog = function(title, description){
        var popupDom = $("#ui_popup_overpayment");
        if (popupDom.length == 0){
          popupDom = $('<div id="ui_popup_overpayment">');  
        }
        elm.find('#pop_title').html(title);
        elm.find('#pop_description').html(description);
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      
      scope.closeOoverPaymentModal = function(){
        $('body').find('#ui_blackout').hide().end().find('#ui_popup_overpayment').hide();
      }
    },
    templateUrl: siteprefix + 'angular/views/billing/overpayment.html'
  };
});

//for showing the popup for cancel payment confirmation
componentModule.directive('cancelPayment', function($timeout) {
  return {
    restrict:'E',
    link: function(scope, elm, attr){
      scope.popup_id = 'ui_popup_cancel';

      scope.showDialog = function(){
        var popupDom = $("#"+scope.popup_id);
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', scope.popup_id);  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      scope.confirm = function(){
        window.location.href = 'home.html'
      }
      scope.close = function(){
        $('body').find('#ui_blackout').hide().end().find('#'+scope.popup_id).hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/billing/cancel.html'
  };
});

//for showing the popup for remove account confirmation
componentModule.directive('removeAccount', function($timeout) {
  return {
    restrict:'E',
    link: function(scope, elm, attr){
      scope.popup_id = 'ui_popup_remove_account';

      scope.showDialog = function(){
        var popupDom = $("#"+scope.popup_id);
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', scope.popup_id);  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      scope.confirm = function(){
        this.account.active = false;
        scope.close_account();
      }
      scope.close_account = function(){
        $('body').find('#ui_blackout').hide().end().find('#'+scope.popup_id).hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/billing/remove_account_confirm.html'
  };
});

//sets the current step of registration as active
componentModule.directive('billStep', function($location){
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, elm, attr){      
      scope.addSel = function(hashVal){        
        if (hashVal.indexOf(attr.billStep) >= 0){
          elm.parent().find('.Sel').removeClass('Sel');
          elm.addClass('Sel');
          elm.prevAll('li').addClass('Completed')
        }        
      }

      scope.$watch(function(){
        scope.addSel($location.path());
      })      
    }
  }
});

//opens modal to add payment method
componentModule.directive('addPaymentMethod', function($timeout, account){
  return {
    controller: AddPaymentCtrl,
    restrict:'E',
    link: function(scope, elm, attr){
      var popupDom = $("#ui_popup");
      var modal = elm.find('.modal');
      scope.showApDialog = function(){
        modal.scope().renderDialog = true;
        if (popupDom.length == 0){
          popupDom = $('<div id="ui_popup">');  
        }
        
        popupDom.append(modal.show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      
      scope.closePayment = function(){
          $('.ui-warning-pop').remove();
        $('body').find('#ui_blackout').hide().end().find('#ui_popup').hide();
        modal.scope().initModal();
      }
    },
    templateUrl: siteprefix + 'angular/views/billing/add_payment.html'
  };
});


componentModule.directive('errorTooltip', function($timeout){
  return{
    restrict: 'A',
    scope: { 
      fieldlabel: '@',
      onmodal: "=",
      show: "@",
      pm: "=",
      account: "=",
      authorized: "=",
      loggedinuser: "=",
      questiondetails: "="
    },
    link: function(scope, elm, attr){

      var template = "<div class='ui-warning-pop' style='position: absolute; border: 1px solid #CCC; padding: 10px; background-color: #FFC; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; background-position: initial initial; background-repeat: initial initial; -webkit-box-shadow: 0px 0px 6px rgba(50, 50, 50, 0.4); -moz-box-shadow: 0px 0px 6px; box-shadow: 0px 0px 6px rgba(50, 50, 50, 0.4);'><span></span><div class='error-down'></div></div>";
      scope.errorMsg = "";
      scope.optionalParams = scope.$eval(attr.errorTooltip);

      scope.showTt = function(){
        if(scope.hasOwnProperty("tooltip")){
          scope.tooltip.show();
        }
      }

      scope.hideTt = function(){
        if(scope.hasOwnProperty("tooltip")){
          scope.tooltip.hide();  
        }
      }

      scope.buildErrMsg = function(){
        var msg = "";
        if(typeof scope.optionalParams != 'undefined' && scope.optionalParams[scope.errCondition] != null){
          //Use message is specified as parameter
          if(Array.isArray(scope.errCondition)){
            msg = scope.optionalParams[scope.errCondition[0]];  
          }else{
            msg = scope.optionalParams[scope.errCondition];  
          }
        }else{
          //Build message if not specified as parameter
          if(scope.errCondition == "minlength"){
            msg = "'"+scope.fieldlabel+"' must be at least "+elm.attr("ng-minlength")+" characters.";
          }
          if(scope.errCondition == "maxlength"){
            msg = "'"+scope.fieldlabel+"' can be at the most  "+elm.attr("ng-maxlength")+" characters.";
          }
          if(scope.errCondition == "required"){
            msg = "'"+scope.fieldlabel+"' is a required field.";
          }
          if(scope.errCondition == "pattern"){
            msg = "Please enter a valid "+scope.fieldlabel+".";
          }
          if(scope.errCondition == "email"){
            msg = "Please enter a valid email.";
          }
        }
        
        return msg;
      }

      scope.setErrMsg = function(){
        try{
          scope.errCondition = elm.attr("class").match(/ng-invalid[-]*[a-zA-Z]+/)[0].match(/[a-zA-Z]*$/);
        }catch(e){
          errCondition = "default";
        }

        scope.errorMsg = (scope.errCondition != "default") ? scope.buildErrMsg() : ("Please enter a valid '"+scope.errorComponent.label+"'");
        scope.tooltip.find("span").text(scope.errorMsg);
      }

      scope.buildTt = function(){
        if(scope.hasOwnProperty("tooltip")){
          scope.tooltip.remove();
          delete scope.tooltip;
        }
        var 
          display = (scope.hasOwnProperty("show") && scope.show == "auto") ? "block" : "none", 
          zIndex = (scope.hasOwnProperty("onmodal") && scope.onmodal == true) ? "9002" : "1000";
        
        scope.tooltip = $(template);
        scope.tooltip.css({
          left: elm.offset().left + elm.width() - 19,
          top: elm.offset().top - 38,
          "z-index": zIndex,
          display: display
        });

        $("body").append(scope.tooltip);
        scope.setErrMsg();
      }

      scope.setUpTt = function(){
        //check if ng-invalid is one of the classes
        if(elm.attr("class").indexOf("ng-invalid") > -1){ //if YES
          scope.buildTt();
          elm.css({"background-color": "#FFC"});
        }

        elm
          .mouseover(function(){
            if(elm.attr("class").indexOf("ng-invalid") > -1){
              $(".ui-warning-pop").hide();
              scope.showTt();  
            }
          })
          .blur(function(){
            //check if ng-invalid is one of the classes
            if(elm.attr("class").indexOf("ng-invalid") < 0){ //if NO
              //remove associated tooltip
              if(scope.hasOwnProperty("tooltip")){
                scope.tooltip.remove();
              }
              //un-highlight element
              elm.css({"background-color": "rgb(255, 255, 255)"});
            }else{
              scope.hideTt();
            }
          });
      }

      //setup
      scope.$on("showerrors", function(event, args){
        var f = function(){
          scope.setUpTt();
          $timeout(function(){
            $(".ui-warning-pop:first").show();
          }, 100);
        };
        //
        if(angular.isDefined(args) && args.hasOwnProperty("onmodal") && args.onmodal == true){
          if(scope.hasOwnProperty("onmodal") && scope.onmodal == true){
            f();
          }
        }else{
          f();
        }
      });
    }
  };
});

//opens modal to show account details
componentModule.directive('viewAccountDetails', function($timeout, account){
  return {
    restrict:'E',
    link: function(scope, elm, attr){
      scope.showAcdialog = function(){
        var self = this;        
        account.getPolicyDetails(this.account.id,function(res){
          self.account.Policies = res;
        },function(error){
          //TODO: Add error display logic here.
        });
        
        var popupDom = $("#ui_popup_account_details");
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', 'ui_popup_account_details');  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      
      scope.closeAccount = function(){
        $('body').find('#ui_blackout').hide().end().find('#ui_popup_account_details').hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/billing/account_detail.html'
  };
});

//opens modal to show account details
componentModule.directive('viewActivityDetail', function($timeout, account){
  return {
    restrict:'E',
    link: function(scope, elm, attr){
      scope.showActivityDialog = function(){
        var self = this;
        account.getActivityDetails(this.account.id,
          function(res){
            self.account.Payment.RecentActivity = res;
          },function(error){

          });
        
        var popupDom = $("#ui_popup_activity_details");
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', 'ui_popup_activity_details');  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      
      scope.close = function(){
        $('body').find('#ui_blackout').hide().end().find('#ui_popup_activity_details').hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/billing/activity_detail.html'
  };
});

//opens popup to enable auto payment for account
componentModule.directive('enableAutoPayment', function($timeout){
  return {
    restrict:'E',
    link: function(scope, elm, attr){
      elm.click(function(e){
        if ($(e.target).is(':checked')){
          scope.showPaymentAuto();
        }
      })
      scope.showPaymentAuto = function(){
        var popupDom = $("#ui_popup_auto_pay");
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', 'ui_popup_auto_pay');  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      
      scope.close = function(){
        this.account.autoPaymentChecked = false;
        $('body').find('#ui_blackout').hide().end().find('#ui_popup_auto_pay').hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/billing/auto_payment.html'
  };
});

componentModule.directive('triggerPopup', function () {
  return {
    restrict: 'A',
    link: function (scope, elm, attr) {
      elm.click(function (event) {
        event.stopPropagation();
        if(elm.find("input[type=checkbox]").is(":checked")){
          elm.parent().find(".ui-popup").click();
        }else{
          $(".ui-info-popup").remove();
        }
      });
    }
  };
});


//used for showing info pop-ups
componentModule.directive('infoPopup', function(){
  return {
    restrict: 'A',
    link: function(scope, elm, attr){
      elm.click(function(e){
        e.stopPropagation();
        $(".ui-info-popup").remove();
        var popup = $('<div class="nicknamecontainerStyle ui-info-popup"><div class="popoverLeft"></div><span></span></div>');
        popup.css({
          left: elm.offset().left + elm.width() + 12,
          top: elm.offset().top - elm.height() - 8,
          "z-index": "9002",
          display: "block"
        });
        popup.find('span').html(attr.infoPopup);
        $("body").append(popup);
        popup.blur(function(){
          popup.hide();
        });

        //this hides any open popup when clicked outside the popup
        $('html').click(function() {
          popup.hide();
        });
        popup.click(function(event){
          event.stopPropagation();
        });

      });
    }
  };
});


//wrapper around bootstrap datepicker as directive
componentModule.directive('datePicker', function($timeout) {
  return {
    restrict:'A',
    require: '?ngModel',
    link: function(scope, elm, attr){
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
      var today = new Date();
      if(angular.isUndefined(scope.account.Ent_PaymentDate)){
        scope.account.Ent_PaymentDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();  
      }
      var launchDate = elm.datepicker({
        minDate: '0',
        showOn: "button",
        buttonImage: siteprefix + "assets/images/ico_calendar.png",
        buttonImageOnly: true,
        onSelect: function(date) {
          scope.$apply(function(){
            scope.account.Ent_PaymentDate = elm.val();  
          });
          
          }
      });
    }
  };
});

/**
 * Edit Payment Modal
 */
componentModule.directive('editPaymentMethod', function($timeout, account){
    return {
        controller: EditPaymentMethodCtrl,
        restrict:'E',
        link: function(scope, elm, attr){
            var popupDom = $("#pm_ui_popup");
            scope.modal = elm.find('.modalme');

            /**
             * Takes a selected paymentMethod record/object from the logged in users PayMethod array
             * @param paymentMethod
             */
            scope.showEditPaymentDialog = function(paymentMethod){
                //set form values
                scope.setEditRecord(paymentMethod);

                //this will be available in the controller as $scope.$parent.editPm, not sure why
                scope.editPm = paymentMethod;

                //accessing controller scope
                scope.modal.scope().currentScreen = (paymentMethod.indicatorForBankOrCreditCard === 'C') ? "card" : "account";

                if (popupDom.length == 0){
                    popupDom = $('<div id="pm_ui_popup">');
                }

                popupDom.append(scope.modal.show()).show();
                $('body').find('#ui_blackout').show().end().prepend(popupDom);
            }

            /**
             * close modal
             */
            scope.closeEditPaymentModal = function(){
                //remove errors as they are appended to the to 'body' tag, maybe they should in individual template directive html?
                $('.ui-warning-pop').remove();
                $('body').find('#ui_blackout').hide().end().find('#pm_ui_popup').hide();
                scope.modal.scope().resetModal();
                scope.editPm = {};
            }

        },
        templateUrl: siteprefix + 'angular/views/payment_methods/edit_payment_method.html'
    };
});

//opens modal to create payment method
componentModule.directive('createPaymentMethod', function($timeout, account){
    return {
        controller: CreatePaymentCtrl,
        restrict:'E',
        link: function(scope, elm, attr){
            var popupDom = $("#ui_popup");
            var modal = elm.find('.modal');
            scope.showApDialog = function(){
                modal.scope().renderDialog = true;
                if (popupDom.length == 0){
                    popupDom = $('<div id="ui_popup">');
                }

                popupDom.append(modal.show()).show();
                $('body').find('#ui_blackout').show().end().prepend(popupDom);
            }

            scope.closePayment = function(){
                $('.ui-warning-pop').remove();
                $('body').find('#ui_blackout').hide().end().find('#ui_popup').hide();
                modal.scope().initModal();
            }
        },
        templateUrl: siteprefix + 'angular/views/payment_methods/create_payment.html'
    };
});

componentModule.directive('deletePaymentMethod', function($timeout, account){
    return {
        controller: EditPaymentMethodCtrl,
        restrict:'E',
        link: function(scope, elm, attr){
            var popupId = 'del_pm_ui_popup';
            var blackoutDiv = "#ui_blackout";
            var popupDom = $('#'+ popupId);
            var modal = elm.find('.modalme');

            /**
             * Takes a selected paymentMethod record/object from the logged in users PayMethod array
             * @param paymentMethod
             */
            scope.showDeletePaymentModal = function(paymentMethod){
                //set form values
                //scope.setEditRecord(paymentMethod);

                scope.deletePm = paymentMethod;

                if (popupDom.length == 0){
                    popupDom = $('<div id="del_pm_ui_popup">');
                }

                popupDom.append(modal.show()).show();
                $('body').find(blackoutDiv).show().end().prepend(popupDom);
            }

            /**
             * close modal
             */
            scope.closeDeletePaymentModal = function(){
                $('body').find(blackoutDiv).hide().end().find('#del_pm_ui_popup').hide();
                scope.deletePm = {};
            }

        },
        templateUrl: siteprefix + 'angular/views/payment_methods/delete.html'
    };
});
//for showing the popup for remove account confirmation
componentModule.directive('removePayment', function($timeout) {
  return {
    restrict:'E',
    link: function(scope, elm, attr, $event){
      scope.popup_id = 'ui_popup_remove_account';

      scope.showRmDialog = function(){
        var popupDom = $("#"+scope.popup_id);
        if (popupDom.length == 0){
          popupDom = $('<div>').attr('id', scope.popup_id);  
        }
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }
      scope.confirm = function(){
        // if(scope.loggedinuser.usertype == "customer" || scope.loggedinuser.usertype == "super_sa"){
          scope.removeAutoPayment($event, this.account, scope);
        // }
      }
      scope.close_account = function(){
        $('body').find('#ui_blackout').hide().end().find('#'+scope.popup_id).hide();
      }      
    },
    templateUrl: siteprefix + 'angular/views/auto_payment/remove_payment.html'
  };
});

// Contuctus success error model popup
componentModule.directive('contactInfo', function($route, $routeParams){
  return {
    restrict: 'E',
    link: function(scope, elm, attr){

      scope.$on("contactinfo", function(event, args){
        scope.showInfo(args.title, args.description, args.status);
      });

      scope.showInfo = function(title, description, status){
        var popupDom = $("#ui_popup_overpayment");
        if (popupDom.length == 0){
          popupDom = $('<div id="ui_popup_overpayment">');  
        }
        elm.find('#pop_title').html(title);
        elm.find('#pop_description').html(description);
        scope.status = status;
        popupDom.append(elm.find('.modal').show()).show();
        $('body').find('#ui_blackout').show().end().prepend(popupDom);
      }

      scope.closeInfoModal = function(){
        if(scope.status == 'success'){
          $route.reload();
        }
        $('body').find('#ui_blackout').hide().end().find('#ui_popup_overpayment').hide();
      }
    },
    templateUrl: siteprefix + 'angular/views/contact_us/contact_info.html'
  };
});


//wrapper around bootstrap datepicker as directive
componentModule.directive('datePickerHistory', function($timeout) {
    return {
        restrict:'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModel){
            var launchDate = elm.datepicker({
                minDate: '-730', //only allow 24 months in past from current day
                maxDate: 0, //don't allow user to choose date beyond current day
                showOn: "both",
                buttonImage: siteprefix + "assets/images/ico_calendar.png",
                buttonImageOnly: true,
                onSelect: function(dateText) {
                   scope.$apply(function(){
                       //set value to ng-model specified on element
                       ngModel.$setViewValue(dateText);
                   });

                }
            });
        }
    };
});


componentModule.directive('paginator', function() {
    //http://beta.plnkr.co/edit/7vX3l0 pagination example
    return {
        restrict: 'E',
        scope: {
            numPages: '=',
            currentPage: '=',
            onSelectPage: '&'
        },
        templateUrl: siteprefix + 'angular/views/pagination/pagination.html',
        replace: true,
        link: function(scope) {
            scope.$watch('numPages', function(value) {
                scope.pages = [];
                for(var i=1;i<=value;i++) {
                    scope.pages.push(i);
                }
                if ( scope.currentPage > value ) {
                    scope.selectPage(value);
                }
            });
            scope.noPrevious = function() {
                return scope.currentPage === 1;
            };
            scope.noNext = function() {
                return scope.currentPage === scope.numPages;
            };
            scope.isActive = function(page) {
                return scope.currentPage === page;
            };

            scope.selectPage = function(page) {
                if ( ! scope.isActive(page) ) {
                    scope.currentPage = page;
                    scope.onSelectPage({ page: page });
                }
            };

            scope.selectPrevious = function() {
                if ( !scope.noPrevious() ) {
                    scope.selectPage(scope.currentPage-1);
                }
            };
            scope.selectNext = function() {
                if ( !scope.noNext() ) {
                    scope.selectPage(scope.currentPage+1);
                }
            };
        }
    };
});