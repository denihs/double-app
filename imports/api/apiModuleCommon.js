import { Meteor } from 'meteor/meteor';

// when running GraphQL external API
export const isAPIModule = () => !!Meteor.settings.public.isAPIModule;
