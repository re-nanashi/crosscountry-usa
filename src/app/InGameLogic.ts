export class InGameLogic {
  public coordinatesToCellNumber(x: any, y: any) {
    return (y / 6.25) * 16 + x / 6.25;
  }

  public cellNumberToX(cellNumber: any) {
    return (cellNumber % 16) * 6.25;
  }

  public cellNumberToY(cellNumber: any) {
    return Math.trunc(cellNumber / 16) * 6.25;
  }

  public marginLeft(block: any) {
    return Number(block.style.marginLeft.split("%")[0]);
  }

  public marginTop(block: any) {
    return Number(block.style.marginTop.split("%")[0]);
  }

  public blocks() {
    return document.querySelectorAll(".block");
  }

  public getBlocksAtCellNumber(cellNumber: Number): any[] {
    let blocksFound: any[] = [];

    this.blocks().forEach((block) => {
      if (
        this.marginLeft(block) == this.cellNumberToX(cellNumber) &&
        this.marginTop(block) == this.cellNumberToY(cellNumber)
      ) {
        blocksFound.push(block);
      }
    });

    return blocksFound;
  }
}
