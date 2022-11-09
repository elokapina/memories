const config = require('./config')

process.env.VUE_APP_IMAGE = config.pictures === undefined ? '' : config.pictures[0]
process.env.VUE_APP_LANGUAGE_CODE = config.languageCode
process.env.VUE_APP_SUBTITLE = config.texts.subtitle
process.env.VUE_APP_TITLE = config.texts.title
process.env.VUE_APP_TWITTER_ACCOUNT = config.texts.twitterAccount
process.env.VUE_APP_URL = config.url

module.exports = {
  lintOnSave: false,
}
