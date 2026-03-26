/**
 *  dateTimeUtils
 *  사용방법 : dayjs(변환할 값).format(DateTimeFormat.YYYYMMDD)
 */

export enum DateTimeFormat {
    // 20260306
    YYYYMMDD = 'YYYYMMDD',

    // 2026-03-06
    YYYY_MM_DD = 'YYYY-MM-DD',

    // 2026/03/06
    YYYY_MM_DD_SLASH = 'YYYY/MM/DD',

    // 2026.03.06
    YYYY_MM_DD_DOT = 'YYYY.MM.DD',

    // 2026년 3월 6일
    YYYY_MM_DD_KOR  = 'YYYY년 MM월 DD일',

    // 03월 06일
    MM_DD_KOR = "MM-DD",

    // 2026/03/06 12:30:59
    YYYY_MM_DD_HH_MM_SS_SLASH = "YYYY/MM/DD HH:mm:ss",

    // 


}