export default (bug, app) => {
  if (!app?.value) return true;
  return bug.app?._id ? bug.app._id === app.value : bug.app === app.value;
};
