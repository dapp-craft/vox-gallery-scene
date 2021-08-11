import { createModel } from './createModel'

import { BuilderHUD } from "./builderHUD/BuilderHUD";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";


const scene = new Entity('scene')
engine.addEntity(scene)
scene.addComponentOrReplace(new Transform({
  position: new Vector3(0, 0, 0)
}))

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(scene)
const gltfShape = new GLTFShape("models/FloorBaseGrass_01/FloorBaseGrass_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
entity.addComponentOrReplace(new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
}))

//collider
const CollMaterial = new Material()
let transparentRed = new Color4(0, 0, 0, 0)
CollMaterial.albedoColor = transparentRed

//1
const model1 = new Entity('model1')
model1.setParent(scene)
const gltfShapem1 = new GLTFShape("models/1.glb")
gltfShapem1.withCollisions = true
gltfShapem1.isPointerBlocker = true
gltfShapem1.visible = true
model1.addComponentOrReplace(gltfShapem1)
model1.addComponentOrReplace(new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
}))
const Collider1 = new Entity('Collider1')
Collider1.addComponentOrReplace(new BoxShape())
Collider1.setParent(model1)
Collider1.addComponentOrReplace(new Transform({
  scale: new Vector3(2.5, 6, 2)
}))
Collider1.addComponentOrReplace(CollMaterial)

//2
const model2 = new Entity('model2')
model2.setParent(scene)
const gltfShapem2 = new GLTFShape("models/2.glb")
gltfShapem2.withCollisions = true
gltfShapem2.isPointerBlocker = true
gltfShapem2.visible = true
model2.addComponentOrReplace(gltfShapem2)
model2.addComponentOrReplace(new Transform({
  position: new Vector3(12, 0, 4),
}))
const Collider2 = new Entity('Collider2')
Collider2.addComponentOrReplace(new BoxShape())
Collider2.setParent(model2)
Collider2.addComponentOrReplace(new Transform({
  scale: new Vector3(2.5, 6, 2)
}))
Collider2.addComponentOrReplace(CollMaterial)

//3
const model3 = new Entity('model3')
model3.setParent(scene)
const gltfShapem3 = new GLTFShape("models/3.glb")
gltfShapem3.withCollisions = true
gltfShapem3.isPointerBlocker = true
gltfShapem3.visible = true
model3.addComponentOrReplace(gltfShapem3)
model3.addComponentOrReplace(new Transform({
  position: new Vector3(4, 0, 12),
}))
const Collider3 = new Entity('Collider3')
Collider3.addComponentOrReplace(new BoxShape())
Collider3.setParent(model3)
Collider3.addComponentOrReplace(new Transform({
  scale: new Vector3(2.5, 6, 2)
}))
Collider3.addComponentOrReplace(CollMaterial)

//4
const model4 = new Entity('model4')
model4.setParent(scene)
const gltfShapem4 = new GLTFShape("models/4.glb")
gltfShapem4.withCollisions = true
gltfShapem4.isPointerBlocker = true
gltfShapem4.visible = true
model4.addComponentOrReplace(gltfShapem4)
model4.addComponentOrReplace(new Transform({
  position: new Vector3(12, 0, 12),
}))
const Collider4 = new Entity('Collider4')
Collider4.addComponentOrReplace(new BoxShape())
Collider4.setParent(model4)
Collider4.addComponentOrReplace(new Transform({
  scale: new Vector3(2.5, 6, 2)
}))
Collider4.addComponentOrReplace(CollMaterial)

//5
const model5 = new Entity('model5')
model5.setParent(scene)
const gltfShapem5 = new GLTFShape("models/5.glb")
gltfShapem5.withCollisions = true
gltfShapem5.isPointerBlocker = true
gltfShapem5.visible = true
model5.addComponentOrReplace(gltfShapem5)
model5.addComponentOrReplace(new Transform({
  position: new Vector3(4, 0, 4),
}))
const Collider5 = new Entity('Collider5')
Collider5.addComponentOrReplace(new BoxShape())
Collider5.setParent(model5)
Collider5.addComponentOrReplace(new Transform({
  scale: new Vector3(2.5, 6, 2)
}))
Collider5.addComponentOrReplace(CollMaterial)

// async function Create() {
//   for (let i; i < 6; i++) {
//     createModel(3,3,i,scene)
//   }
// }

//BuilderHUD
getCurrentRealm().then(realm => {
  if (realm.displayName == 'localhost-stub') {
    Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
      log('USER POSITION: ', Camera.instance.position)
    })

    const hud = new BuilderHUD()
    const hudAttachEntities = [
      "model1",
      "model2",
      "model3",
      "model4",
      "model5"
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