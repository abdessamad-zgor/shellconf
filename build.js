import { execSync, spawnSync } from "child_process";
import { join } from "path";
let root_dir = import.meta.dirname

let frontEndBuild = spawnSync("bash", [join(root_dir, "scripts/build.sh")])
if (frontEndBuild.error) console.log("Error:: ", frontEndBuild.error.toString())
else console.log(frontEndBuild.stdout.toString())

let appBuild = execSync("yarn build", { encoding: 'utf8' })
if (appBuild.error) console.log("Error:: ", appBuild.error)
else console.log(appBuild.stdout)
