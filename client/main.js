import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { People } from '/common/people.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  Meteor.subscribe('allPeople');
});

Template.hello.helpers({
  getPeople() {
    // Return all fields
    return People.find({
      fields: People.publicFields
    });
  },
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click .submitData'(event, instance) {
    // Take the user's name from input box
    const name = instance.$('[name="name"]').val();
    // Take the user's age from input box
    const age = instance.$('[name="age"]').val();
    // Call the 'addPerson' method on the server if the age meets the requirements
    if(isNaN(age) || age < 18 || age > 65) {
      return false;
    }
    else {
      Meteor.call('addPerson', name, age);
      // Once a person is successfully added the input fields are cleaned
      instance.$('[name="age"]').val("");
      instance.$('[name="name"]').val("");
    }
  },
  'click .deleteData'(event, instance) {
    const id = instance.$('[name="id"]').val();
    Meteor.call('deletePerson', id);
    instance.$('[name="id"]').val("");
  },
});
