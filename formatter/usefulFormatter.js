
function ruleFailureCompare(a, b) {
  if (a.fileName !== b.fileName) {
    return a.fileName < b.fileName ? -1 : 1;
  }
  return a.startPosition.getPosition() - b.startPosition.getPosition();
}

class Formatter {
  // ERROR: (semicolon) myFile.ts(1,14): Missing semicolon

  format(failures) {
    failures = this.sortFailures(failures);
    return `${this.mapToMessages(failures).join("\n")}\n`;
  }

  sortFailures(failures) {
    return failures.slice().sort(ruleFailureCompare);
  }

  mapToMessages(failures) {
    return failures.map((failure) => {
      const fileName = failure.getFileName();
      const failureString = failure.getFailure();
      const ruleName = failure.getRuleName();

      const lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
      const positionTuple = `(${lineAndCharacter.line + 1},${lineAndCharacter.character + 1})`;

      return `${fileName}${positionTuple}: ${failureString} (${ruleName})`;
    });
  }
}

exports.Formatter = Formatter;
