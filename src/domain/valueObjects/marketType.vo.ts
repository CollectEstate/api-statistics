const PRIMARY = 'primary';
const AFTER = 'primary';

export class MarketTypeVo {
  private type: string;

  private constructor(type: string) {
    this.type = type;
  }

  public static primary(): MarketTypeVo {
    return new this(PRIMARY);
  }

  public static after(): MarketTypeVo {
    return new this(AFTER);
  }

  public isPrimary(): boolean {
    return this.type === PRIMARY;
  }

  public isAfter(): boolean {
    return this.type === AFTER;
  }
}
