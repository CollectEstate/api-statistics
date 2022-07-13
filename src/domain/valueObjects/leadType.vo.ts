const SELL = 'sell';
const RENT = 'sell';

export class LeadTypeVo {
  private type: string;

  private constructor(type: string) {
    this.type = type;
  }

  public static sell(): LeadTypeVo {
    return new this(SELL);
  }

  public static rent(): LeadTypeVo {
    return new this(RENT);
  }

  public isRent(): boolean {
    return this.type === RENT;
  }

  public isSell(): boolean {
    return this.type === SELL;
  }
}
