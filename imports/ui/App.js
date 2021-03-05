import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTracker } from 'meteor/react-meteor-data';
import { PositionsCollection } from '../api/PositionsCollection';

const block = {
  width: 100,
  height: 100,
};

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url("galaxy.jpg")',
    backgroundSize: 'cover',
  },
  content: {
    width: `${block.width}px`,
    height: `${block.height}px`,
    position: 'relative',
    transition: 'linear 0.5s',
  },
});

export const App = () => {
  const classes = useStyles();

  const [width, useWidth] = useState(block.width);
  const [height, useHeight] = useState(block.height);
  const [rotate, useRotate] = useState(0);

  const positions =
    useTracker(() => {
      return PositionsCollection.findOne();
    }, []) || {};

  useEffect(() => {
    const element = document.getElementById('container');
    useWidth(element.offsetWidth);
    useHeight(element.offsetHeight);
  }, [rotate]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => useRotate(t => (t === 360 ? 0 : t + 1)),
      10
    );
    return () => clearTimeout(timeoutId);
  }, [rotate]);

  return (
    <div id="container" className={classes.container}>
      <div
        className={classes.content}
        style={{
          top: `${Math.min(
            height - block.height - block.height * 1.5,
            positions.top
          )}px`,
          left: `${Math.min(
            width - block.width - block.height * 1.5,
            positions.left
          )}px`,
        }}
      >
        <img
          src={'yellow.gif'}
          alt="cat"
          style={{
            height: block.height,
            transform: `rotate(
            ${rotate}deg
          )`,
          }}
        />
      </div>
    </div>
  );
};
