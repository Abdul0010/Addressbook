  Contacts=  new Mongo.Collection('contacts');
  var checked=[];
if (Meteor.isClient) {
 
    Template.contacts.helpers({
    contacts:function(){
    var filter ={sort: {}};
    var query =Session.get('query');
    filter.sort[Session.get('sortby')]=1;
    return Contacts.find({name: new RegExp(query,'i'),user_id:Meteor.userId()},filter);

    }
    });
    
    Template.new_contact.events({
        "submit .contactForm": function(event){
            Contacts.insert({
              name:event.target.name.value,
              number:event.target.number.value,
              email: event.target.email.value,
              address: event.target.email.value,
              user_id:Meteor.userId(),
              CreatedAt: new Date()
            });

            name:event.target.name.value="";
            number:event.target.number.value ="";
            email: event.target.email.value ="";
            address: event.target.email.value =""; 
            $("#newContactModal").modal('toggle');
        }
    });
    
    Template.contacts.events({
    "click th": function(event){
    console.log($(event.target).text());
    var order =$(event.target).text().toLocaleLowerCase();
    Session.set('sortby',order);
    },
        
    
        
        
        
    "click.delete":function(){
    $.each(checked,function(index,value){
           Contacts.remove(value);
           });
        checked=[];
    }
    });
     Template.navbar.events({
    "keyup .searchbox": function(event){
    var query= event.target.value;
    Session.set('query',query);
        console.log(query);
    }
     });
     Template.contact.events({
     "click .toggle-checked": function(){
     var index=checked.indexOf(this._id);
     if(index> -1){
       checked.splice(index,1);
                             }
        else{
        checked.push(this._id);
        }
    
    }    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

