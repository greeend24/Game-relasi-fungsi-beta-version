/**
 * Master Exercise Data for Chapter Exercises 1 - 5
 * Total: 150 Primary Questions + 150 Remedial Variants
 */

import { EXERCISE_CHAPTER_1 } from './exercises/exerciseChapter1';
import { EXERCISE_CHAPTER_2 } from './exercises/exerciseChapter2';
import { EXERCISE_CHAPTER_3 } from './exercises/exerciseChapter3';
import { EXERCISE_CHAPTER_4 } from './exercises/exerciseChapter4';
import { EXERCISE_CHAPTER_5 } from './exercises/exerciseChapter5';

export const CHAPTER_EXERCISES = {
  1: {
    id: 1,
    title: "Latihan 1: Pengertian & Cara Menyatakan Relasi",
    subtitle: "30 Soal Konseptual & Interaktif Relasi",
    questions: EXERCISE_CHAPTER_1
  },
  2: {
    id: 2,
    title: "Latihan 2: Pengertian & Unsur Fungsi",
    subtitle: "30 Soal Domain, Kodomain, Range & Ciri Fungsi",
    questions: EXERCISE_CHAPTER_2
  },
  3: {
    id: 3,
    title: "Latihan 3: Notasi & Rumus Fungsi",
    subtitle: "30 Soal Aljabar f(x) = ax + b & Perhitungan Nilai",
    questions: EXERCISE_CHAPTER_3
  },
  4: {
    id: 4,
    title: "Latihan 4: Grafik Fungsi Linear",
    subtitle: "30 Soal Titik Potong, Gradien & Garis Cartesius",
    questions: EXERCISE_CHAPTER_4
  },
  5: {
    id: 5,
    title: "Latihan 5: Korespondensi Satu-Satu",
    subtitle: "30 Soal Pemetaan Bijektif & Faktorial n!",
    questions: EXERCISE_CHAPTER_5
  }
};
