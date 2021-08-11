export class createModel extends Entity {
    constructor(x, z, i, parent) {
        super("model");
        const model = new Entity("Human_" + i)
        model.setParent(parent)
        const gltfShape = new GLTFShape("models/" + i + ".glb")
        gltfShape.withCollisions = true
        gltfShape.isPointerBlocker = true
        gltfShape.visible = true
        model.addComponentOrReplace(gltfShape)

        model.addComponentOrReplace(new Transform({
            position: new Vector3(x, 1, z),
          }))
    }
}