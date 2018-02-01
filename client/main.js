import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { People } from '/common/people.js';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  Meteor.subscribe('allPeople');
});

Template.hello.helpers({
  getPeople() {
    return People.find({
      fields: People.publicFields
    });
  },
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // Take the user's name from input box
    const name = instance.$('[name="name"]').val();
    // Take the user's age from input box
    const age = instance.$('[name="age"]').val();
    // Call the 'addPerson' method on the server
    Meteor.call('addPerson', name, age);
  },
});
