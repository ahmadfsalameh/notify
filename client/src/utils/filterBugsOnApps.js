export default (bugs, app) => {
  return app?.value
    ? bugs.filter((bug) => {
        return bug.app?._id ? bug.app._id === app.value : bug.app === app.value;
      })
    : bugs;
};
