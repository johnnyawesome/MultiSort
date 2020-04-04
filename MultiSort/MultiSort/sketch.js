/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Sort operations per second
let opsPerSec = 10;
//The number of bars
let numOfBars = 310;
//Width of one bar
let xBar = 1;
//Offset between bars
const xOff = 1;
const offset = xBar + xOff;
//Array hat holds all bars
let bars = [];
//Iteration counter for SelectionSort
let iteration = 0;
//Holds last Angorithm-Choice
let lastSelection = null;
//UI elements
let button;
let opsPerSecSlider;
let selection;

function setup() {

  createCanvas(650, 450, P2D);
  stroke(0, 255, 0);
  fill(0, 255, 0);
  generateBars();

  //Randomize Button
  button = createButton('Randomize');
  button.position(10, 10);
  button.mousePressed(resetArray);
  button.style("font-size", "24px", "color", "gray");
  button.style("background", "rgb(50, 50, 50)");
  button.style("color", "rgb(0, 255, 0)");

  //FPS-Slider
  opsPerSecSlider = createSlider(1, 100, 10);
  opsPerSecSlider.position(9, 50);
  opsPerSecSlider.style('width', '133px');

  //Selection of Sorting Algorithms
  selection = createSelect();
  selection.position(160, 10);
  selection.option('BubbleSort');
  selection.option('SelectionSort');
  selection.option('InsertionSort');
  selection.style("font-size", "22px", "color", "gray");
  selection.style("background", "rgb(50, 50, 50)");
  selection.style("color", "rgb(0, 255, 0)");

  //Remember last Sorting Alrorithm
  lastSelection = selection.value();
}

function draw() {
  frameRate(opsPerSecSlider.value());
  background(0);
  translate(10, height * 0.9);

  //If Sorting Algorighm selection changes, re-seed bars
  if (lastSelection !== selection.value()) {
    lastSelection = selection.value();
    resetArray();
  }

  //Sort bars
  if (selection.value() === "BubbleSort") {
    bubbleSort();
  } else if (selection.value() === "SelectionSort") {
    selectionSort(iteration);
    iteration++;
  }
  else if (selection.value() === "InsertionSort") {
    insertionSort(iteration);
    iteration++;
  }

  //Draw bars
  for (let i = 0; i < bars.length; i++) {
    translate(offset, 0);
    rect(0, 0, xBar, -bars[i]);
  }
}

function generateBars() {
  while (bars.length < numOfBars) {
    let rand = Math.floor(Math.random() * numOfBars) + 1;
    if (bars.indexOf(rand) === -1) bars.push(rand);
  }
}

function bubbleSort() {
  for (let i = 0; i < numOfBars; i++) {
    let temp = bars[i - 1];
    if (bars[i] < bars[i - 1]) {
      bars[i - 1] = bars[i];
      bars[i] = temp;
    }
  }
}

function selectionSort(iteration) {
  if (iteration < bars.length) {
    let min = bars.length;
    let minIndex;
    let temp = bars[iteration];
    for (let j = iteration; j < bars.length; j++) {
      if (bars[j] < min) {
        min = bars[j];
        minIndex = j;
      }
    }
    bars[iteration] = bars[minIndex];
    bars[minIndex] = temp;
  }
}

function insertionSort(iteration) {

  if (iteration < bars.length) {
    let valueToSort = bars[iteration]
    let j = iteration
    while (j > 0 && bars[j - 1] > valueToSort) {
      bars[j] = bars[j - 1]
      j -= 1;
    }
    bars[j] = valueToSort
  }
}

function resetArray() {
  for (let i = bars.length; i >= 0; i--) {
    bars.pop();
  }
  iteration = 0;
  generateBars();
}