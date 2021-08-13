import { createModel } from './createModel'

import { BuilderHUD } from "./builderHUD/BuilderHUD";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";


const scene = new Entity('scene')
engine.addEntity(scene)
scene.addComponentOrReplace(new Transform({
  position: new Vector3(0, 0, 0)
}))

const floor = new Entity('floor')
engine.addEntity(floor)
floor.setParent(scene)
const floorgltfShape = new GLTFShape("models/FloorBaseGrass_01/FloorBaseGrass_01.glb")
floorgltfShape.withCollisions = true
floorgltfShape.isPointerBlocker = true
floorgltfShape.visible = true
floor.addComponentOrReplace(floorgltfShape)
floor.addComponentOrReplace(new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
}))

//CreateVoxs
const _createModel = new createModel()
_createModel.Create(scene)



//BuilderHUD
getCurrentRealm().then(realm => {
  if (realm.displayName == 'localhost-stub') {
    Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
      log('USER POSITION: ', Camera.instance.position)
    })

    const hud = new BuilderHUD()
    const hudAttachEntities = [
      "Human_1",
      "Human_2",
      "Human_3",
      "Human_4",
      "Human_5",
    ]
    for (const e in engine.entities) {
      const entity = engine.entities[e];
      if (entity instanceof Entity && entity.name != null) {
        // log(entity.name)
        if (hudAttachEntities.indexOf(entity.name) > -1) {
          log('attach To Entity', entity.name)
          hud.attachToEntity(entity)
        }
      }
    }
  }
})