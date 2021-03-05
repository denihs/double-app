import { Mongo } from 'meteor/mongo';

const positionCollection = Object.assign(new Mongo.Collection('positions'), {
  updatePosition() {
    const getRandom = () => {
      return Math.floor(Math.random() * 1000);
    };

    this.remove({});
    this.insert({
      top: getRandom(),
      left: getRandom(),
    });
  },
});

export const PositionsCollection = positionCollection;
