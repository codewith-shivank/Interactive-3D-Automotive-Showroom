# AURELIS X1 - 3D Model Asset Directory

This directory is designated for custom 3D vehicle assets (`.glb` / `.gltf`).

## How to use your custom 3D model:

1. Export your 3D vehicle model in binary glTF format (`.glb`).
2. Name the file:
   ```
   aurelis-x1.glb
   ```
3. Place it directly inside this directory:
   ```
   /public/models/aurelis-x1.glb
   ```

## Model Requirements & Optimization:
- **Scale**: Centered at origin (0, 0, 0) with 1 unit = 1 meter (~4.8m length, ~1.9m width, ~1.4m height).
- **Target Polygons**: 50,000 to 150,000 triangles for optimal web performance.
- **Material Names**:
  - `Body` or `Paint`: Body shell panels (color dynamically modulated by the Configurator).
  - `Glass`: Windows and panoramic roof.
  - `Wheels` or `Rims`: Wheel geometry.
  - `Lights`: Front DRL and rear tail light emission strips.

If no custom `.glb` is detected, the application automatically runs the built-in procedural high-fidelity 3D Aurelis X1 model with zero configuration needed.
