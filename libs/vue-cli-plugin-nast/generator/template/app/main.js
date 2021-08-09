import Vue from 'vue'
import NastCore from 'nast'
import settings from './_config'
import libs from './_libs'
import ui from './_ui'

Vue.use(ui)
NastCore.createApp(settings, libs)
