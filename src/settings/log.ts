import { Notice, Setting } from 'obsidian'
import TextAreaModal from '~/components/TextAreaModal'
import i18n from '~/i18n'
import BaseSettings from './settings.base'

export default class LogSettings extends BaseSettings {
	async display() {
		this.containerEl.createEl('h2', { text: i18n.t('settings.log.title') })
		new Setting(this.containerEl)
			.setName(i18n.t('settings.log.name'))
			.setDesc(i18n.t('settings.log.desc'))
			.addButton((button) => {
				button
					.setButtonText(i18n.t('settings.log.button'))
					.onClick(async () => {
						const textareaModal = new TextAreaModal(this.app, this.logs)
						textareaModal.open()
					})
			})
		new Setting(this.containerEl)
			.setName(i18n.t('settings.log.clearName'))
			.setDesc(i18n.t('settings.log.clearDesc'))
			.addButton((button) => {
				button.setButtonText(i18n.t('settings.log.clear')).onClick(() => {
					this.plugin.logs = []
					new Notice(i18n.t('settings.log.cleared'))
				})
			})
	}

	get logs() {
		return this.plugin.logs.map((d) => JSON.stringify(d)).join('\n')
	}
}
