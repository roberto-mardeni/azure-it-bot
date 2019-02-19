const {
  DialogSet,
  TextPrompt,
  NumberPrompt,
  WaterfallDialog
} = require('botbuilder-dialogs');

const {
  SlotFillingDialog
} = require('./slotFillingDialog');
const {
  SlotDetails
} = require('./slotDetails');

class CommonDataDialog {
  constructor() {}

  /**
   * SampleBot defines the core business logic of this bot.
   * @param {DialogSet} dialogs The dialog set to add dialogs to.
   */
  static AddCommonDialogs(dialogs) {
    // Set up a series of questions for collecting the user's name.
    const fullnameSlots = [
      new SlotDetails('first', 'text', 'Please enter your first name.'),
      new SlotDetails('last', 'text', 'Please enter your last name.')
    ];

    // Link the questions together into a parent group that contains references
    // to both the fullname and other prompts.
    const slots = [
      new SlotDetails('fullname', 'fullname'),
      new SlotDetails('phone', 'phone', 'Please enter your phone.', 'You must enter a valid US phone number.')
    ];

    // Add the individual child dialogs and prompts used.
    // Note that the built-in prompts work hand-in-hand with our custom SlotFillingDialog class
    // because they are both based on the provided Dialog class.
    dialogs.add(new SlotFillingDialog('fullname', fullnameSlots));
    dialogs.add(new TextPrompt('text'));
    dialogs.add(new NumberPrompt('phone', this.phoneNumberValidator));
    dialogs.add(new SlotFillingDialog('slot-dialog', slots));
  }

  // Validate that the provided shoe size is between 0 and 16, and allow half steps.
  // This is used to instantiate a specialized NumberPrompt.
  static async phoneNumberValidator(prompt) {
    if (prompt.recognized.succeeded) {
      const phone = prompt.recognized.value;

      return /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/.test(phone);
    }

    return false;
  }
}

module.exports.CommonDataHelper = CommonDataDialog;