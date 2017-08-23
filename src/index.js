'use strict';

import stackTrace from 'stack-trace';
import path from 'path';

const CallerSourceLocation = function (depth = 0) {
  const root = path.dirname(require.main.filename);
  const stack = stackTrace.get();
  const caller = stack[depth + 1];

  return {
    file: path.relative(root, caller.getFileName()),
    line: caller.getLineNumber(),
    column: caller.getColumnNumber()
  }
};

export default CallerSourceLocation;
