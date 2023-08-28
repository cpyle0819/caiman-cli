export function log(...messages: string[]) {
  messages.forEach((message) => process.stdout.write(message));
  process.stdout.write("\n");
}
