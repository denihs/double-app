import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/littledata:synced-cron';
import { isAPIModule } from './apiModuleCommon';
import { PositionsCollection } from './PositionsCollection';

const tryRunJob = job => {
  try {
    return job();
  } catch (e) {
    console.error('Error running a job', e);
    return 0;
  }
};

Meteor.startup(() => {
  console.time('cron');
  if (!isAPIModule()) {
    console.warn('** APP: SyncedCron are not started on www instance **');
    console.timeEnd('cron');
    return;
  }

  SyncedCron.config({
    log: true,
  });

  SyncedCron.add({
    name: 'Change positions',
    schedule(parser) {
      return parser.text('every 5 seconds');
    },
    job() {
      return tryRunJob(() => PositionsCollection.updatePosition());
    },
  });

  SyncedCron.start();
  console.timeEnd('cron');
});
