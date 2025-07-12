import dayjsLib from "dayjs";
import "dayjs/locale/pt-br"; // Import Portuguese locale
import relativeTime from "dayjs/plugin/relativeTime";

dayjsLib.locale("pt-br"); // Set the locale to Portuguese
dayjsLib.extend(relativeTime);

export const dayjs = dayjsLib;