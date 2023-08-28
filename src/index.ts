import {program} from "commander";
import {makeLambdaSource} from "./commands/make-lambda-source";

program.name("caiman").description("A command line utility for AWS builders.");

program
  .command("mk-lambda")
  .description("Create the source code for a lambda function that uses ESM.")
  .argument("<lambda-name>", "The name of the lambda function.")
  .action(makeLambdaSource);

program.parse();
