import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';


interface HandsontableModifierArgs {
  Args: {
    Named: {
      data: Handsontable.RowObject[];
      settings: Handsontable.GridSettings;
    };
    Positional: never;
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
    positionalArgs: PositionalArgs<HandsontableModifierArgs>,
    args: NamedArgs<HandsontableModifierArgs>
  ) {
    if (!element) {
      throw new Error('Handsontable has no element');
    }

    if (!this._hot) {
      this._createHot(element, args);
    } else {
      this._updateHot(args);
    }
  }

  private _createHot(
    element: Element,
    args: NamedArgs<HandsontableModifierArgs>
  ): void {
    element.classList.add('handsontable-modifier');

    this._hot = new Handsontable(
      element,
      {
        'data': args.data,
        ...args.settings
      }
    );
  }

  private _updateHot(
    args: NamedArgs<HandsontableModifierArgs>
  ): void {
    this._hot.updateSettings(
      {
        'data': args.data,
        ...args.settings
      }
    );
  }
}
