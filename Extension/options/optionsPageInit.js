DataStorage.initialise(function (results) {
	OptionsPage.setValuesOnInputs(results);
	OptionsPage.saveOptionsOnChange();
	AtlassianInputDisplay.setup();
});
