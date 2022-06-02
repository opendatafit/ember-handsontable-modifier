import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import Handsontable from 'handsontable';


export default class Application extends Controller.extend({}) {
  @tracked settings: Handsontable.GridSettings;

  constructor() {
    super(...arguments);

    const data = [
      ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
      ['2017', 10, 11, 12, 13, 15, 16],
      ['2018', 10, 11, 12, 13, 15, 16],
      ['2019', 10, 11, 12, 13, 15, 16],
      ['2020', 10, 11, 12, 13, 15, 16],
      ['2021', 10, 11, 12, 13, 15, 16]
    ];

    const settings: Handsontable.GridSettings = {
      data: data,
      colHeaders: true,
      minSpareRows: 1,
      height: 'auto',
      width: 'auto',
      columns: [
        { data: 0 },
        // skip the second column
        { data: 2 },
        { data: 3 },
        { data: 4 },
        { data: 5 },
        { data: 6 }
      ],
      licenseKey: 'non-commercial-and-evaluation'
    };

    console.log('settings', settings);

    this.settings = settings;
  }

  @action updateData() {
    // Update data here
    console.log('updateData called');
  }
}


// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
