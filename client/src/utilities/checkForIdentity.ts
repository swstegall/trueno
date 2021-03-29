import fs from 'file-system';

export default () => {
  try {
    if (fs.existsSync('./identity.json')) {
      // console.log(window.location.href);
      window.location.href = 'selectIdentity';
    } else {
      // console.log(window.location.href);
      window.location.href = 'createIdentity';
    }
  } catch (err) {
    console.error(err);
  }
};
