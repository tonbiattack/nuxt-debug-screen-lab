// 現在時刻を使うと「時間経過」と「タイムゾーン差異」が混ざってしまう。
// そのため、調査対象の瞬間を固定してSSRとClientの表示文字列だけを比較できるようにする。
export const REPORT_INSTANT = '2026-08-01T09:00:00.000Z'

/**
 * 表示用日時をタイムゾーン付きで整形する。
 *
 * Dateの内部値は同じでも、timeZoneが異なるとformat()が返す文字列は変わる。
 * この関数は外部状態を読まない。呼び出し側がtimeZoneを明示することで、
 * 「入力値の違い」ではなく「表示変換の違い」を観測できるようにしている。
 */
export function formatReportTime(timeZone) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  }).format(new Date(REPORT_INSTANT))
}
