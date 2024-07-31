export enum Shape {
    /* -- 2D Shapes -- */
    Triangle = 'Triangle',
    Square = 'Square',
    Circle = 'Circle',

    /* -- 3D Shapes -- */
    /**
     * Sphere = Circle + Circle
     */
    Sphere = 'Sphere',
    /**
     * Cube = Square + Square
     */
    Cube = 'Cube',
    /**
     * Pyramid = Triangle + Triangle
     */
    Pyramid = 'Pyramid',
    /**
     * Cylinder = Circle + Square
     */
    Cylinder = 'Cylinder',
    /**
     * Cone = Circle + Triangle
     */
    Cone = 'Cone',
    /**
     * Prism = Triangle + Square
     */
    Prism = 'Prism',
}

export default Shape
