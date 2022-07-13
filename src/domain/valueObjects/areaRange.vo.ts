interface areaRange {
  from: number;
  to: number;
}
export class AreaRangeVo {
  public static all(): areaRange[] {
    return [
      {
        from: 0,
        to: 20,
      },
    ];
  }
}
