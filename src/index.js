'use strict';

import StackTrace from 'stack-trace';
import Path from 'path';

const CallerSourceLocation = (depth = 0) => {
  const root = Path.dirname(require.main.filename);
  const stack = StackTrace.get();
  const caller = stack[depth + 1];

  return {
    file: Path.relative(root, caller.getFileName()),
    line: caller.getLineNumber(),
    column: caller.getColumnNumber()
  }
};

export default CallerSourceLocation;
