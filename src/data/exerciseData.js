/**
 * Master Exercise Data for Chapter Exercises 1 - 5
 * Total: 50 Primary Questions + 50 Remedial Variants (10 Soal per Chapter)
 */

import { EXERCISE_CHAPTER_1 } from './exercises/exerciseChapter1.js';
import { EXERCISE_CHAPTER_2 } from './exercises/exerciseChapter2.js';
import { EXERCISE_CHAPTER_3 } from './exercises/exerciseChapter3.js';
import { EXERCISE_CHAPTER_4 } from './exercises/exerciseChapter4.js';
import { EXERCISE_CHAPTER_5 } from './exercises/exerciseChapter5.js';

export const CHAPTER_EXERCISES = {
  1: {
    id: 1,
    title: "Latihan 1: Pengertian & Cara Menyatakan Relasi",
    subtitle: "10 Soal Konseptual & Interaktif Relasi",
    questions: EXERCISE_CHAPTER_1
  },
  2: {
    id: 2,
    title: "Latihan 2: Pengertian & Unsur Fungsi",
    subtitle: "10 Soal Domain, Kodomain, Range & Ciri Fungsi",
    questions: EXERCISE_CHAPTER_2
  },
  3: {
    id: 3,
    title: "Latihan 3: Notasi & Rumus Fungsi",
    subtitle: "10 Soal Aljabar f(x) = ax + b & Perhitungan Nilai",
    questions: EXERCISE_CHAPTER_3
  },
  4: {
    id: 4,
    title: "Latihan 4: Grafik Fungsi Linear",
    subtitle: "10 Soal Titik Potong, Gradien & Garis Kartesius",
    questions: EXERCISE_CHAPTER_4
  },
  5: {
    id: 5,
    title: "Latihan 5: Korespondensi Satu-Satu",
    subtitle: "10 Soal Korespondensi Satu-Satu & Faktorial n!",
    questions: EXERCISE_CHAPTER_5
  }
};
