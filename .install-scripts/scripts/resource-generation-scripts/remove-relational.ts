import fs from 'fs';
import path from 'path';
import replace from '../../helpers/replace';

const removeRelationalResourceGeneration = async () => {
  const filesToRemove = [
    path.join(process.cwd(), '.hygen', 'generate', 'relational-resource'),
  ];

  replace({
    path: path.join(process.cwd(), 'package.json'),
    actions: [
      {
        find: /\s*\"generate:resource:relational\":.*/g,
        replace: '',
      },
      {
        find: /\s*\"postgenerate:resource:relational\":.*/g,
        replace: '',
      },
    ],
  });

  filesToRemove.map((file) => {
    fs.rmSync(file, {
      recursive: true,
      force: true,
    });
  });
};

export default removeRelationalResourceGeneration;
