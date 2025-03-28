import fs from 'fs';
import path from 'path';
import replace from '../../helpers/replace';

const removeDocumentResourceGeneration = async () => {
  const filesToRemove = [
    path.join(process.cwd(), '.hygen', 'generate', 'document-resource'),
  ];

  replace({
    path: path.join(process.cwd(), 'package.json'),
    actions: [
      {
        find: /\s*\"generate:resource:document\":.*/g,
        replace: '',
      },
      {
        find: /\s*\"postgenerate:resource:document\":.*/g,
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

export default removeDocumentResourceGeneration;
