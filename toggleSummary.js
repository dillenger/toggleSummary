
updateButton = (rssPrefValue) => {
  switch (rssPrefValue) {
    case 0:
      messenger.messageDisplayAction.setIcon({path: "toggleSummary1.png"});
      messenger.messageDisplayAction.setTitle({title: "Toggle Summary (viewing full page)"});
      break;

    case 1:
      messenger.messageDisplayAction.setIcon({path: "toggleSummary2.png"});
      messenger.messageDisplayAction.setTitle({title: "Toggle Summary (viewing page summary)"});
      break;

    case 2:
      messenger.messageDisplayAction.setIcon({path: "toggleSummary1.png"});
      messenger.messageDisplayAction.setTitle({title: "Toggle Summary (viewing page default)"});
      break;

    default:
      //disable button as pref value does not seem to be there
      messenger.messageDisplayAction.disable();
  }
}

togglePref = async () => {
  // get a value from the pref system
  let rssPrefValue = await messenger.LegacyPrefs.getPref("rss.show.summary");

  // toggle pref if possible
  switch (rssPrefValue) {
    case 0:
      await messenger.LegacyPrefs.setPref("rss.show.summary", 1);
      updateButton(1);
      break;

    case 1:
      await messenger.LegacyPrefs.setPref("rss.show.summary", 0);
      updateButton(0);
      break;

    case 2:
      await messenger.LegacyPrefs.setPref("rss.show.summary", 1);
      updateButton(1);
      break;

    default:
      //disable button as pref value does not seem to be there
      updateButton();
  }
}

(async () => {
  // get a value from the pref system and initialize the button
  let rssPrefValue = await messenger.LegacyPrefs.getPref("rss.show.summary");
  updateButton(rssPrefValue);

  messenger.messageDisplayAction.onClicked.addListener(togglePref);
})()
