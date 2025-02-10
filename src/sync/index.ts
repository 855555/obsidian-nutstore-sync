import IFileSystem from '~/fs/fs.interface'
import { LocalVaultFileSystem } from '~/fs/local-vault'
import { NutstoreFileSystem } from '~/fs/nutstore'
import NutStorePlugin from '..'

export class NutStoreSync {
	remoteFs: IFileSystem
	localFS: IFileSystem

	constructor(
		private options: {
			plugin: NutStorePlugin
			token: string
			remoteDir: string
		},
	) {
		this.remoteFs = new NutstoreFileSystem(this.options)
		this.localFS = new LocalVaultFileSystem({
			vault: this.options.plugin.app.vault,
		})
	}

	async start() {
		const localContents = await this.localFS.walk()
		console.log(localContents)
	}
}
