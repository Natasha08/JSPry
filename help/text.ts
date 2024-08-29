// Define help information
const helpText = `
  pryjs - Interactive JavaScript REPL

  Usage:
    pryjs [options]

  Options:
    --help              Show help information
    .exit               Exit the REPL
    .saveexit           Save the current context and exit the REPL
    .clear              Clear the REPL context

  Commands:
    .exit               Exit the REPL
    .clear              Clear the REPL context and all variables

  Examples:
    pryjs               Start the REPL
    pryjs --help        Show this help message
`;

export default helpText;
