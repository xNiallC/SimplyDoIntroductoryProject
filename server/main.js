import { Meteor } from 'meteor/meteor';
import { People } from '/common/people.js';

Meteor.startup(() => {
  // Server methods
  Meteor.methods({
    // Add the person with the 'name' and 'age' parameters from the web page to the MongoDB instance
    addPerson(name, age) {
      People.insert({name: name, age: age});
    }
  })
  Meteor.publish('allPeople', function() {
    // Return all public lists when the client is subscribed
    return People.find({
      fields: People.publicFields
    });
  })
});
