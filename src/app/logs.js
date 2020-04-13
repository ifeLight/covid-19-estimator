import fs from 'fs';

export default function (filename) {
  return function log(req, res) {
    const file = fs.readFileSync(filename);
    res.status(200).send(file);
  };
}
