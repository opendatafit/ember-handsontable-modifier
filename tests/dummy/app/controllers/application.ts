import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import Handsontable from 'handsontable';


export default class Application extends Controller.extend({}) {
  @tracked data: Handsontable.RowObject[];
  @tracked settings: Handsontable.GridSettings;
  @tracked isVisible: boolean;

  constructor() {
    super(...arguments);

    this.data = [
      ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
      ['2017', 10, 11, 12, 13, 15, 16],
      ['2018', 10, 11, 12, 13, 15, 16],
      ['2019', 10, 11, 12, 13, 15, 16],
      ['2020', 10, 11, 12, 13, 15, 16],
      ['2021', 10, 11, 12, 13, 15, 16]
    ];

    this.settings = {
      colHeaders: true,
      minSpareRows: 1,
      height: 'auto',
      width: 'auto',
      licenseKey: 'non-commercial-and-evaluation'
    };

    this.isVisible = false;

    console.log('settings', this.settings);
    console.log('data', this.data);
  }

  @action updateData() {
    // Update data here
    console.log('updateData called');

    this.settings = {
      colHeaders: false,
      height: 'auto',
      width: 'auto',
      minSpareRows: 1,
      licenseKey: 'non-commercial-and-evaluation'
    };

    this.data = [
      { id: 1, name: 'Ted Right', address: '' },
      { id: 2, name: 'Frank Honest', address: '' },
      { id: 3, name: 'Joan Well', address: '' },
      { id: 4, name: 'Gail Polite', address: '' },
      { id: 5, name: 'Michael Fair', address: '' },
    ];
  }
  
  @action toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.data = this.data;
  }
}


// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
