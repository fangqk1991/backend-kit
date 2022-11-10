import { FCDatabase } from 'fc-sql'
import { DBOptionsBuilder } from '@fangcha/tools/lib/database'
import { DemoConfig } from '../DemoConfig'

FCDatabase.instanceWithName('demoDB').init(new DBOptionsBuilder(DemoConfig.database).build())

export const MyDatabase = {
  demoDB: FCDatabase.instanceWithName('demoDB'),
}
