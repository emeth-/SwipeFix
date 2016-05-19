this["TEMPLATES"] = this["TEMPLATES"] || {};

this["TEMPLATES"]["tmp/load.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["TEMPLATES"]["tmp/mainView.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\n                "
    + escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},data:data},helper ? helper.call(depth0, "tmp/oppContainer.hbs", options) : helperMissing.call(depth0, "partial", "tmp/oppContainer.hbs", options)))
    + "\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                <ul class=\"list-group\">\n                    ";
  stack1 = (helper = helpers.isEqual || (depth0 && depth0.isEqual),options={hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.thing), "task", options) : helperMissing.call(depth0, "isEqual", (depth0 && depth0.thing), "task", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </li>\n                </ul>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"list-group-item opp-profile-opener\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                        <h5 style=\"color: #777;\" class=\"upcoming-title\">\n                            Task due\n                            <span class=\"glyphicon glyphicon-check\"></span>\n                        </h5>\n                        <p><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.subject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></p>\n                        <p class=\"small\" style=\"color: #999;\">Due: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.due_date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                        ";
  stack1 = (helper = helpers.isEqual || (depth0 && depth0.isEqual),options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.thing), "opportunity", options) : helperMissing.call(depth0, "isEqual", (depth0 && depth0.thing), "opportunity", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"list-group-item opp-profile-opener\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                            <h5 style=\"color: #777;\" class=\"upcoming-title\">\n                                Opportunity closing\n                                <span class=\"glyphicon glyphicon-usd\"></span>\n                            </h5>\n                            <p><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></p>\n                            <p class=\"small\" style=\"color: #999;\">Close Date: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.expected_close_date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item opp-profile-opener\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <h5 style=\"color: #777;\" class=\"upcoming-title\">\n                            Opportunity closing\n                            <span class=\"glyphicon glyphicon-usd\"></span>\n                        </h5>\n                        <p><strong>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong></p>\n                        <p class=\"small\" style=\"color: #999;\">Last Updated: ";
  if (helper = helpers.expected_close_date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.expected_close_date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                        <p class=\"small\" style=\"color: #999;\">Close Date: ";
  if (helper = helpers.expected_close_date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.expected_close_date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                    </li>\n                </ul>\n            ";
  return buffer;
  }

  buffer += "<div class=\"container-fluid main-container\">\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <h4 class=\"section-header\">\n                <span>Bad data, swipe to fix!</span>\n            </h4>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.fix_me_data)),stack1 == null || stack1 === false ? stack1 : stack1.expected_close_date_past), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.fix_me_data)),stack1 == null || stack1 === false ? stack1 : stack1.no_contacts_assigned), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.fix_me_data)),stack1 == null || stack1 === false ? stack1 : stack1.open_task_due_in_past), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.fix_me_data)),stack1 == null || stack1 === false ? stack1 : stack1.assigned_to_invalid_stage), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.fix_me_data)),stack1 == null || stack1 === false ? stack1 : stack1.close_date_not_realistic_based_off_current_stage), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <h4 class=\"section-header\">\n                <span>What's Coming Up?</span>\n            </h4>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.upcoming_data), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <h4 class=\"section-header\">\n                <span>Opps that needs love!</span>\n            </h4>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.last_update_data), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });

this["TEMPLATES"]["tmp/modalView.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal fade assign-contact\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                <h4 class=\"modal-title\">Assign Contacts</h4>\n            </div>\n            <div class=\"modal-body\">\n                <ul class=\"list-group\"></ul>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-action=\"submitContactModal\">Save</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade fix-stage\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                <h4 class=\"modal-title\">Set Stage</h4>\n            </div>\n            <div class=\"modal-body\">\n                <select class=\"form-control\"></select>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-action=\"submitFixStage\">Save</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade fix-close-date\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                <h4 class=\"modal-title\">Set Expected Close Date</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <input type=\"date\" class=\"form-control\" />\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-action=\"submitNewCloseDate\">Save</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade fix-task\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                <h4 class=\"modal-title\">Edit Task</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <label for=\"\">Due Date</label>\n                    <input type=\"date\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"\">Task State</label>\n                    <select class=\"form-control\"></select>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-action=\"submitEditTask\">Save</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
  });

this["TEMPLATES"]["tmp/oppContainer.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"opp-container opp-profile-opener carousel\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.opp)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id_=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.opp)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.subkey), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.subkey), options)))
    + "\" data-data_type=\""
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.subkey), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.subkey), options)))
    + "\">\n    <ul class=\"list-unstyled\">\n        <li>\n            <div class=\"control\">\n                <span>";
  if (helper = helpers.default_text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.default_text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                <span class=\"glyphicon glyphicon-ok\"></span>\n            </div>\n        </li>\n        <li>\n            <div class=\"row\">\n                <div class=\"col-xs-2 icon-hole\">\n                    ";
  stack1 = (helper = helpers.iconify || (depth0 && depth0.iconify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.subkey), options) : helperMissing.call(depth0, "iconify", (depth0 && depth0.subkey), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"col-xs-10\">\n                    <p><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.opp)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></p>\n                    <p>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"control\">\n                <span class=\"glyphicon glyphicon-pencil\"></span>\n                <span>";
  if (helper = helpers.edit_thing) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.edit_thing); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </div>\n        </li>\n    </ul>\n</div>";
  return buffer;
  });