import fs from 'file-system';

export default () => {
  try {
    if (fs.existsSync('./identity.json')) {
      console.log("identity.json exists");
      // window.location.href = 'selectIdentity';
    } else {
      console.log("identity.json does not exist");
      // window.location.href = 'createIdentity';
    }
  } catch (err) {
    console.error(err);
  }
};
