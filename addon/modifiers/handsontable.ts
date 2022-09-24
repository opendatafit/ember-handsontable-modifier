import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

import { next } from '@ember/runloop';

interface HandsontableModifierArgs {
  Args: {
    Named: {
      data: Handsontable.RowObject[];
      config: Handsontable.GridSettings;
      isVisible: boolean;
    };
    Positional: [];
  };
}


export default class HandsontableModifier extends Modifier<HandsontableModifierArgs> {
  private _hot!: Handsontable;

  constructor(
    owner: unknown,
    args: ArgsFor<HandsontableModifierArgs>
  ) {
    super(owner, args);

    registerDestructor(this, this.destructor);
  }

  destructor(): void {
    if (this._hot) {
      this._hot.destroy();
    }
  }

  modify(
    element: Element,
    []: PositionalArgs<HandsontableModifierArgs>,
    { data, config, isVisible }: NamedArgs<HandsontableModifierArgs>
  ) {
    if (!element) {
      throw new Error('Handsontable has no element');
    }

    if (!this._hot) {
      this._createHot(element, data, config);
    } else {
      // should we do this in the next run loop?
      this._updateHot(data, config);

      if (isVisible) {
        next(() => {
          this._hot.refreshDimensions();
        });
      }
    }
  }

  private _createHot(
    element: Element,
    data: Handsontable.RowObject[],
    config: Handsontable.GridSettings,
  ): void {
    element.classList.add('handsontable-modifier');

    this._hot = new Handsontable(
      element,
      {
        'data': data,
        ...config,
      }
    );
  }

  private _updateHot(
    data: Handsontable.RowObject[],
    config: Handsontable.GridSettings,
  ): void {
    this._hot.updateSettings(
      {
        'data': data,
        ...config,
      }
    );
  }
}
