const FLAT = 'flat';
const HOUSE = 'house';

export class ObjectTypeVo {
  private type: string;

  private constructor(type: string) {
    this.type = type;
  }

  public static flat(): ObjectTypeVo {
    return new this(FLAT);
  }

  public static house(): ObjectTypeVo {
    return new this(HOUSE);
  }

  public isFlat(): boolean {
    return this.type === FLAT;
  }

  public isHouse(): boolean {
    return this.type === HOUSE;
  }
}
