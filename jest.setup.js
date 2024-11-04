// jest.setup.js

// Example: Setting up a global variable
global.myGlobalVariable = 'some value';

// Example: Mocking a global function
jest.spyOn(console, 'log').mockImplementation(() => {});
