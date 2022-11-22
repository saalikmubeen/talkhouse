export function getVideoBoxSize(
    X: number,
    Y: number,
    n: number,
    aspect_ratio = 1
): { x: number; y: number } {
    // total number of tiles
    const tile_count: number = n;
    // height of rectangle
    const b: number = Y;
    // width of rectanlge
    const a: number = X;

    // divide the area but the number of tiles to get the max area a tile could cover
    // this optimal size for a tile will more often than not make the tiles overlap, but
    // a tile can never be bigger than this size
    let sizeX: number = Math.sqrt((b * a * aspect_ratio) / tile_count);
    // find the number of whole tiles that can fit into the height
    let numberOfPossibleWholeTilesH: number = Math.floor(
        (b * aspect_ratio) / sizeX
    );
    // find the number of whole tiles that can fit into the width
    let numberOfPossibleWholeTilesW: number = Math.floor(a / sizeX);
    // works out how many whole tiles this configuration can hold
    let total: number =
        numberOfPossibleWholeTilesH * numberOfPossibleWholeTilesW;

    // if the number of number of whole tiles that the max size tile ends up with is less than the require number of
    // tiles, make the maxSize smaller and recaluate
    while (total < tile_count) {
        sizeX--;
        numberOfPossibleWholeTilesH = Math.floor((b * aspect_ratio) / sizeX);
        numberOfPossibleWholeTilesW = Math.floor(a / sizeX);
        total = numberOfPossibleWholeTilesH * numberOfPossibleWholeTilesW;
    }

    return {
        x: sizeX,
        y: sizeX / aspect_ratio,
    };
}
