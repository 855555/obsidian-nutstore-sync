import consola from 'consola'
import { normalizePath } from 'obsidian'
import { dirname } from 'path'
import { mkdirsWedbDAV } from '~/utils/mkdirs-webdav'
import { BaseTask, BaseTaskOptions, toTaskError } from './task.interface'

export default class PushTask extends BaseTask {
	constructor(
		readonly options: BaseTaskOptions & {
			overwrite?: boolean
		},
	) {
		super(options)
	}

	async exec() {
		try {
			await mkdirsWedbDAV(this.webdav, dirname(this.remotePath))
			const content = await this.vault.adapter.readBinary(
				normalizePath(this.localPath),
			)
			const res = await this.webdav.putFileContents(this.remotePath, content, {
				overwrite: this.options.overwrite ?? false,
			})
			return { success: res }
		} catch (e) {
			consola.error(this, e)
			return { success: false, error: toTaskError(e) }
		}
	}
}
