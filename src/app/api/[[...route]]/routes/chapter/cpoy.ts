import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

interface Chapter {
  chapterTitle: string;
  chapterUrl: string;
  subChapters: subChapters[];
}

interface subChapters {
  subChapterLink: string;
  subChapterContent: string;
  devanagari?: string;
  verse?: string;
  synonyms?: string;
  translation?: string;
  purports?: string[];
}

const baseURL = "https://vedabase.io";

export const chapterApi = new Hono();

chapterApi.post("/", async (c) => {
  const response = await axios.get(`${baseURL}/en/library/bg/`);
  const $ = cheerio.load(response.data);

  const chapters: Chapter[] = [];

  $(".r-chapter a").each((index, element) => {
    const chapterTitle = $(element).text().trim();
    const chapterUrl = $(element).attr("href");

    if (chapterUrl) {
      chapters.push({ chapterTitle, chapterUrl, subChapters: [] });
    }
  });

  for (const chapter of chapters) {
    try {
      const chapterResponse = await axios.get(
        `${baseURL}${chapter.chapterUrl}`
      );
      const chapterPage = cheerio.load(chapterResponse.data);
      const verseElements = chapterPage(".r-verse");

      // @ts-ignore
      for (const verseElement of verseElements) {
        const subChapterLink = chapterPage(verseElement)
          .find("dt a")
          .attr("href")
          ?.trim();
        const subChapterContent = chapterPage(verseElement)
          .find("dd")
          .text()
          .trim();

        if (subChapterLink && subChapterContent) {
          const fullSubChapterLink = `${baseURL}${subChapterLink}`;
          const subChapterResponse = await axios.get(fullSubChapterLink);
          const subChapterPage = cheerio.load(subChapterResponse.data);

          const purports: string[] = [];

          const devanagari = subChapterPage(".wrapper-devanagari .r-devanagari")
            .text()
            .trim();
          const verse = subChapterPage(".wrapper-verse-text .r-verse-text")
            .text()
            .trim();
          const synonyms = subChapterPage(".wrapper-synonyms .r-synonyms")
            .text()
            .trim();
          const translation = subChapterPage(
            ".wrapper-translation .r-translation"
          )
            .text()
            .trim();

          subChapterPage(".wrapper-puport div").each((index, element) => {
            const paragraphText = subChapterPage(element).text().trim();
            purports.push(paragraphText);
          });

          console.log(purports);
          

          chapter.subChapters.push({
            subChapterLink: fullSubChapterLink,
            subChapterContent,
            devanagari,
            verse,
            synonyms,
            translation,
            purports,
          });
        }
      }
    } catch (error) {
      console.error(`Failed to fetch or parse ${chapter.chapterUrl}:`, error);
    }
  }

  // console.log(chapters);

  return c.json(chapters);
});