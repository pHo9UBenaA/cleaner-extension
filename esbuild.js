// srcディレクトリとdistディレクトリのサブディレクトリが一致しているか確認
const fs = require('fs');

const srcDirName = 'src';
const distDirName = 'dist';

const srcSubDir = fs
	.readdirSync(`./${srcDirName}`, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

const distSubDir = fs
	.readdirSync(`./${distDirName}`, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

if (srcSubDir.length !== distSubDir.length || !srcSubDir.every((dir) => distSubDir.includes(dir))) {
	console.error('Error: The subdirectories of src and dist directories do not match.');
	process.exit(1);
}

// esbuildオプションのentryPointsとoutdirを作成
const path = require('path');
const glob = require('glob');

const srcDir = path.join(__dirname, srcDirName);
const distDir = path.join(__dirname, distDirName);

const entryPoints = glob.sync(`${srcDir}/**/*.ts`);
const outdir = distDir;

// envプラグインの定義
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const envPlugin = {
	name: 'env',
	setup(build) {
		build.onResolve({ filter: /^env$/ }, (args) => ({
			path: args.path,
			namespace: 'env-ns',
		}));
		build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
			contents: JSON.stringify(env),
			loader: 'json',
		}));
	},
};

// copyプラグイン
const copyStaticFiles = require('esbuild-copy-static-files');
const copyStaticFilesPlugin = copyStaticFiles({
	src: './src/gmail-receive-mail/assets',
	dest: './dist/gmail-receive-mail',
	dereference: true,
	errorOnExist: false,
});

// ビルド
const options = {
	entryPoints,
	outdir,
	outbase: './src',
	platform: 'browser',
	external: [],
	bundle: true,
	tsconfig: './tsconfig.json',
	plugins: [envPlugin, copyStaticFilesPlugin],
};

const { build } = require('esbuild');
build(options).catch((err) => {
	process.stderr.write(err.stderr);
	process.exit(1);
});
