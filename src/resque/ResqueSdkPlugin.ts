import { AppPluginProtocol } from '../basic'
import { _FangchaState } from '../main'
import { ResqueProtocol } from './ResqueProtocol'
import { FCMaster, IResqueObserver, Resque, ResqueJob, ResqueWorker } from '@fangcha/resque'

export const ResqueSdkPlugin = (options: ResqueProtocol): AppPluginProtocol => {
  return {
    appDidLoad: (app) => {
      class ResqueObserver implements IResqueObserver {
        public onMasterLaunched() {}

        public onWorkerStart(_worker: ResqueWorker) {}

        public async onJobFound(_resqueJob: ResqueJob) {}

        public async onJobDone(_resqueJob: ResqueJob) {}

        public async onJobFailed(resqueJob: ResqueJob, e: Error) {
          console.error(resqueJob, e)
          const infos = [
            'Resque Job Fail',
            `Queue: ${resqueJob.queue}`,
            `Job: ${resqueJob.getClassName()}`,
            `Error: ${e.message}`,
          ]
          _FangchaState.botProxy.notify(infos.join('\n'))
        }
        public onJobPerform(_: ResqueJob) {}

        public onRedisConnectionError(e: Error) {
          const infos = ['Redis Connection Error', e.message]
          _FangchaState.botProxy.notify(infos.join('\n'))
        }
      }

      Resque.addObserver(options.observer || new ResqueObserver())

      for (const plugin of app.plugins) {
        if (plugin.resqueModuleMap) {
          options.moduleMapData = {
            ...options.moduleMapData,
            ...plugin.resqueModuleMap,
          }
        }
      }

      const master = new FCMaster(options)
      master.run()
    },
  }
}
