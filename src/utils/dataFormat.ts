import { promises as fsPromises } from "fs";
import Handlebars from "handlebars";
import path from "path";

export function isEmptyStr(str: string | undefined | null): boolean {
  if (["", undefined, null].includes(str)) {
    return true;
  }
  return false;
}

export async function hbsToHtml(
  fileName: string,
  replacementData: object
): Promise<string> {
  try {
    const rawHTML = await fsPromises.readFile(
      path.join(__dirname, "../../assets", fileName),
      { encoding: "utf-8" }
    );

    const template = Handlebars.compile(rawHTML);

    return template(replacementData);
  } catch (error: any) {
    throw new Error(
      `Error generating HTML from template: ${(error as Error).message}`
    );
  }
}
