const fs = require('fs')
const npm = require('npm');

const updateDependencies = () => {
    const file = fs.readFileSync('package.json')
    const content = JSON.parse(file)
    let devDependencies = [];
    let dependencies = [];
    for (var devDep in content.devDependencies) {
        devDependencies.push(devDep);
    }
    for (var dep in content.dependencies) {
        dependencies.push(dep)
    }
    npm.load(() => {
        npm.run('uninstall', ...devDependencies);
        npm.run("installDev", ...devDependencies);
        npm.run('uninstall', ...dependencies);
        npm.run("installDev", ...dependencies);
    });
}
if (require.main === module) {
    updateDependencies()
} else {
    module.exports = updateDependencies
}

